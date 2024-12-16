//BookmarkDetaillnfo.tsx
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import bookmarked from "../../../assets/icons/bookmarked.png";
import copy from "../../../assets/icons/copy.png";
import like from "../../../assets/icons/like.png";
import messageCover from "../../../assets/icons/message-cover.png";
import noLike from "../../../assets/icons/no-like.png";
import retry from "../../../assets/icons/retry.png";
import share from "../../../assets/icons/share.png";
import sound from "../../../assets/icons/sound.png";
import threeMenu from "../../../assets/icons/three-menu.png";
import logo from "../../../assets/logo.png";
import profile from "../../../assets/profile.png";
import { PopupContext } from '../../../provider/popupProvider';
import "./BookmarkDetailInfo.css";

interface IChatItem {
  uuid: string;
  type: 'user' | 'bot';
  message: string;
}

export default function BookmarkDetailInfo() {
  const { state } = useLocation();
  const { showCommonPop } = useContext(PopupContext);
  const [chatList, setChatList] = useState<Array<IChatItem>>([
    {
      uuid: '11',
      type: 'user',
      message: 'Figma에 대해서 설명해줘.',
    },
    {
      uuid: '22',
      type: 'bot',
      message: 'Figma는 클라우드 기반의 협업 디자인 도구로, UI/UX 디자이너들이 웹 및 앱 인터페이스를 디자인하고 프로토타입을 제작하는 데 사용됩니다. Figma는 다양한 팀원들이 실시간으로 협업하여 디자인 작업을 진행할 수 있도록 지원하며, 다양한 기기에서 접근이 가능하여 언제 어디서든 작업을 할 수 있습니다. 벡터 그래픽 툴과 함께 디자인 시스템, 프로토타입 제작 및 디자인 스펙 생성 등의 기능을 제공하여 디자인 프로세스를 효율적으로 관리할 수 있도록 도와줍니다. Figma는 팀의 협업과 효율성을 높이는 강력한 도구로 디자인 커뮤니티에서 널리 사용되고 있습니다.'
    }
  ]);


  const moveChatPage = async (uuid: string) => {
    // 히스토리가 있는지 없는지 로직 추가하기
    const isHistory = false;

    if (!isHistory) return showCommonPop("현재 해당 채팅은 존재하지 않아 이동할 수 없습니다.", null);
  }

  useEffect(() => {
    (async () => {
      if (!state || !state?.uuid) return;

      // 아래 코드는 임시 코드고, 특정 북마크의 아이디 값으로 정보를 디비에서 받아오는 코드 작성하기.
      await new Promise((resolve, reject) => setTimeout(() => resolve(true), 500));

      console.log('get data!');
    })();
  }, []);

  if (!state || !state?.uuid) return (
    <p>비정상적인 방법으로 접근하였습니다. 마이페이지 -{'>'} 북마크 페이지에서 다시 접근을 시도해 주세요.</p>
  );

  return (
    <div className={'w-full h-full flex flex-direction-column align-items-center'}>
      <DetailMenu />
      <Title moveChatPage={moveChatPage} />
      <ChatContainer chatList={chatList} />
    </div>
  );
}

function DetailMenu() {
  const navigate = useNavigate();

  const back = () => navigate(-1); // -1 = 이전에 접속했던 페이지로 이동.

  return (
    <div className={'flex header'}>
      <div className={'flex align-items-center'}>
        <button onClick={() => back()} className={'no-style-btn menu-btn'}><img src={threeMenu} alt="" /></button>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div>
      <div></div>
    </div>
  );
}

function Title(props: any) {
  const { moveChatPage } = props;
  return (
    <div className={'title'}>
      <p onClick={() => moveChatPage()}>FIGMA 사용 방법 및 UX UI 디자인</p>
    </div>
  );
}

function ChatContainer(props: any) {
  const { chatList } = props;

  return (
    <div className={'chat-container'}>
      {chatList.map((item: IChatItem) => (
        <div key={item.uuid} className={'h-full flex align-items-center chat '+item.type}>
          <div className="profile">
            <div className="img-cover">
              <img src={item.type === 'bot' ? messageCover : profile} alt="" />
            </div>
          </div>
          <div className="center">
            <div className="message">{item.message}</div>
            {item.type === 'bot' && (
              <div className="icons flex">
                <img className={'icon'} src={sound} alt="" />
                <img className={'icon'} src={copy} alt="" />
                <img className={'icon'} src={retry} alt="" />
                <img className={'icon'} src={share} alt="" />
              </div>
            )}
          </div>
          <div className="h-full others">
            {item.type === 'bot' && (
              <div className={'h-full flex flex-direction-column justify-content-between align-items-end'}>
                <div className={'bookmark-img-cover'}>
                  <img src={bookmarked} alt="" />
                </div>
                <div className={'flex align-items-center like-cover'}>
                  <img className={'icon'} src={like} alt="" />
                  <img className={'icon'} src={noLike} alt="" />
                </div>
              </div>
          )}
          </div>
        </div>
      ))}
    </div>
  );
}
