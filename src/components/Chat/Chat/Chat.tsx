import React, { useRef, RefObject, useEffect } from 'react';
import style from './Chat.module.css';
import { useIntersectionObserver, useThreads } from '../../../hooks';
import QuestionBox from '../../MainPage/Chatting/QuestionBox';
import ChattingQuestion from '../../MainPage/Chatting/ChattingQuestion';
import ChattingAnswer from '../../MainPage/Chatting/ChattingAnswer';
import { RecommendedQuestions } from '../RecommendedQuestions';
import { ReactComponent as AerochatLogo } from '../../../assets/aerochatLogo.svg';
import { ReactComponent as RightIcon } from '../../../assets/right-arrow-button.svg';
import { ReactComponent as CreateIcon } from '../../../assets/create-button.svg';

interface IChatComponent {
  isSidebarVisible: boolean;
  onOpenSidebar: () => void;
}
const Chat = ({ isSidebarVisible, onOpenSidebar }: IChatComponent) => {
  const chatRef: RefObject<HTMLDivElement> = useRef(null);
  const currentFirstChatIdRef = useRef(-1);
  const {
    messages,
    selectedThreadId,
    sendMessage,
    getInfiniteMessages,
    isMsgLoading,
    isMsgError,
    isFirstMsgLoading,
    initChatting,
  } = useThreads();

  const handleIntersection = () => {
    if (!isMsgLoading && selectedThreadId !== -1) {
      if (isFirstMsgLoading >= 1) {
        // 첫 로드 이후, 위로 스크롤 했을 때 발생한 로드면 messages에서 가장 마지막에 있는 요소의 id를 찾음
        currentFirstChatIdRef.current = messages[messages.length - 1].id;
      }
      getInfiniteMessages();
    }
  };

  const ref = useIntersectionObserver({ callback: handleIntersection });

  useEffect(() => {
    // 메시지가 추가됐을 때,
    // 첫 로드면 맨 밑으로 스크롤
    // 채팅을 입력하면 맨 밑으로 스크롤
    // 두 번째 로드부터 첫 번째 엘리먼트로 스크롤
    if (chatRef.current) {
      if (currentFirstChatIdRef.current !== -1) {
        // 첫 로드 이후, 무한 스크롤에 의한 로드면
        // 업데이트된 messages에서 currentFirstChatIdRef.current를 메시지의 id로 갖는 상태의 인덱스를 찾는다.
        // 그리고 chatRef에서 그 인덱스 번째 자식을 찾아서 그곳으로 스크롤 이동
        const idx =
          messages.length -
          messages.findIndex((msg) => msg.id === currentFirstChatIdRef.current);

        chatRef.current.children[idx]?.scrollIntoView({ behavior: 'auto' });
        currentFirstChatIdRef.current = -1;
      } else {
        // 첫 로드 또는 메시지 입력에 의한 로드면
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  }, [selectedThreadId, messages, isFirstMsgLoading]);

  return (
    <div
      className={`${style.chatContainer} ${isSidebarVisible ? style.sidebarVisible : style.sidebarHidden}`}
    >
      <header className={style.chatHeader}>
        <button className={style.IconButton} onClick={onOpenSidebar}>
          <RightIcon />
        </button>
        <button className={style.IconButton} onClick={initChatting}>
          <CreateIcon />
        </button>
        <AerochatLogo />
      </header>

      <div className={style.chatMessages} ref={chatRef}>
        {isMsgError ? '에러 발생' : <div ref={ref}></div>}
        {selectedThreadId === -1 ? (
          <RecommendedQuestions isSidebarVisible={isSidebarVisible} />
        ) : (
          [...messages]
            .reverse()
            .map((msg, index) =>
              msg.role === 'USER' ? (
                <ChattingQuestion key={index} message={msg.content} />
              ) : (
                <ChattingAnswer
                  key={index}
                  message={msg.content}
                  messageId={msg.id}
                />
              )
            )
        )}
      </div>
      <div className={style.chatInputContainer}>
        <QuestionBox onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export { Chat };
