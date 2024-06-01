import React from 'react';
import styles from './Chatting.module.css';

interface ChattingQuestionProps {
  message: string;
}

const ChattingQuestion: React.FC<ChattingQuestionProps> = ({ message }) => {
  return (
    <div className={styles.questionBox}>
      <div className={styles.contentBox}>
        <div className={styles.leftBox}>
          <div className={styles.userIcon}></div>
        </div>
        <div className={styles.questionTextBox}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChattingQuestion;
