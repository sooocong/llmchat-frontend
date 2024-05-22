import React from 'react';
import styles from './chatting.module.css';
import IconGroupLeft from './iconGroup/iconGroupLeft'; // 경로는 실제 프로젝트 구조에 따라 달라질 수 있습니다.
import IconGroupRight from './iconGroup/iconGroupRight'; // 경로는 실제 프로젝트 구조에 따라 달라질 수 있습니다.

const Chatting: React.FC = () => {
  return (
    <>
      <div className={styles.questionBox}>
        <div className={styles.contentBox}>
          <div className={styles.leftBox}>
            <div className={styles.userrIcon}></div>
          </div>
          <div className={styles.rightBox}>안녕하세요. 저는 홍길동입니다.</div>
        </div>
      </div>

      <div className={styles.answerBox}>
        <div className={styles.contentBox}>
          <div className={styles.leftBox}>
            <div className={styles.answerIcon}></div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.topBox}>
              <div className={styles.bookmarkIcon}></div>
            </div>
            <div className={styles.centerBox}>
              안녕하세요, 지금부터 질문을 해주시면 답하도록 하겠습니다.{' '}
            </div>
            <div className={styles.bottomBox}>
              <IconGroupLeft />
              <IconGroupRight />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chatInputBox}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="질문해 보세요!"
        />
        <div className={styles.sendIcon}></div>
      </div>
    </>
  );
};

export default Chatting;
