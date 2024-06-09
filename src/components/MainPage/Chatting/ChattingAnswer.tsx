import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useThreads } from '../../../../src/hooks';
import styles from './Chatting.module.css';
import IconGroupLeft from '../iconGroup/iconGroupLeft';
import IconGroupRight from '../iconGroup/iconGroupRight';
import { ShareModal } from '../../Chat';
import { ThreadAPI } from '../../../apis/thread';

interface ChattingAnswerProps {
  message: string;
  messageId: number; // messageId를 prop으로 받아옵니다.
}

const ChattingAnswer: React.FC<ChattingAnswerProps> = ({
  message,
  messageId,
}) => {
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<number | null>(null); // 북마크 ID 상태 추가
  const centerBoxRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedThreadId } = useThreads(); // selectedThreadId를 가져옵니다

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const handleBookmarkClick = async () => {
    if (!isBookmarkClicked) {
      try {
        const bookmark = await ThreadAPI.createBookmark(messageId);
        console.log('Bookmark created:', bookmark);
        setBookmarkId(bookmark.id); // 북마크 ID 저장
        setIsBookmarkClicked(true);
      } catch (error) {
        console.error('Error creating bookmark:', error);
      }
    } else {
      try {
        if (bookmarkId !== null) {
          await ThreadAPI.deleteBookmark(bookmarkId);
          console.log('Bookmark deleted');
          setBookmarkId(null);
          setIsBookmarkClicked(false);
        }
      } catch (error) {
        console.error('Error deleting bookmark:', error);
      }
    }
  };

  const handleRatingClick = (messageId: number, rating: 'GOOD' | 'BAD') => {
    if (selectedThreadId !== undefined) {
      ThreadAPI.rateMessage(selectedThreadId, messageId, rating); // threadId와 messageId를 함께 전달합니다
    }
  };

  return (
    <>
      <div className={styles.answerBox}>
        <div className={styles.contentBox}>
          <div className={styles.leftBox}>
            <div className={styles.answerIcon}></div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.topBox}>
              <div
                className={`${styles.bookmarkIcon} ${isBookmarkClicked ? styles.clickBookmarkIcon : ''}`}
                onClick={handleBookmarkClick}
              ></div>
            </div>
            <div className={styles.centerBox} ref={centerBoxRef}>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  ol: ({ children }) => (
                    <ol className={styles.list}>{children}</ol>
                  ),
                  ul: ({ children }) => (
                    <ul className={styles.list}>{children}</ul>
                  ),
                }}
              >
                {message}
              </ReactMarkdown>
            </div>
            <div className={styles.bottomBox}>
              <IconGroupLeft
                messageId={messageId}
                centerBoxRef={centerBoxRef}
                handleShareClick={openModal}
              />
              <IconGroupRight
                messageId={messageId}
                handleRatingClick={handleRatingClick}
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ShareModal
          onCloseModal={closeModal}
          threadId={selectedThreadId}
          messageId={messageId}
        />
      )}
    </>
  );
};

export default ChattingAnswer;
