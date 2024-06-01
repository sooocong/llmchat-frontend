import React, { useState, useRef } from 'react';
import styles from './Chatting.module.css';
import IconGroupLeft from '../iconGroup/iconGroupLeft';
import IconGroupRight from '../iconGroup/iconGroupRight';

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
            {message}
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
