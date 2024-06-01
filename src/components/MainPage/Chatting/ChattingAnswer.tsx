import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import styles from './Chatting.module.css';
import IconGroupLeft from '../iconGroup/iconGroupLeft';
import IconGroupRight from '../iconGroup/iconGroupRight';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface ChattingAnswerProps {
  message: string;
}

const ChattingAnswer: React.FC<ChattingAnswerProps> = ({ message }) => {
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  const centerBoxRef = useRef<HTMLDivElement>(null);

  const handleBookmarkClick = () => {
    setIsBookmarkClicked(!isBookmarkClicked);
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
