import React from 'react';
import styles from '../Chatting/Chatting.module.css';

interface IconGroupLeftProps {
  centerBoxRef: React.RefObject<HTMLDivElement>;
}

const IconGroupLeft: React.FC<IconGroupLeftProps> = ({ centerBoxRef }) => {
  const handleCopyClick = () => {
    if (centerBoxRef.current) {
      const textToCopy = centerBoxRef.current.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert('답변이 복사되었습니다.');
        })
        .catch((err) => {
          console.error('복사 실패: ', err);
        });
    }
  };

  const handleSpeakerClick = () => {
    if (centerBoxRef.current) {
      const textToSpeak = centerBoxRef.current.innerText;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={styles.iconGroupLeft}>
      <div className={styles.speakerIcon} onClick={handleSpeakerClick}></div>
      <div className={styles.copyIcon} onClick={handleCopyClick}></div>
      <div className={styles.reanswerIcon}></div>
      <div className={styles.shareIcon}></div>
    </div>
  );
};

export default IconGroupLeft;
