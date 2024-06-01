import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import styles from './Chatting.module.css';
import IconGroupLeft from '../iconGroup/iconGroupLeft';
import IconGroupRight from '../iconGroup/iconGroupRight';
import { ThreadAPI } from '../../../apis/thread';

interface ChattingAnswerProps {
  message: string;
  messageId: number;
}

const ChattingAnswer: React.FC<ChattingAnswerProps> = ({ message, messageId }) => {
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  const centerBoxRef = useRef<HTMLDivElement>(null);

  const handleBookmarkClick = async () => {
    setIsBookmarkClicked(!isBookmarkClicked);
    if (!isBookmarkClicked) {
      try {
        const bookmark = await ThreadAPI.createBookmark(messageId);
        console.log('Bookmark created:', bookmark);
      } catch (error) {
        console.error('Error creating bookmark:', error);
      }
    }
  };

  return (
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
                ol: ({ children }) => <ol className={styles.list}>{children}</ol>,
                ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
          <div className={styles.bottomBox}>
            <IconGroupLeft centerBoxRef={centerBoxRef} />
            <IconGroupRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingAnswer;
