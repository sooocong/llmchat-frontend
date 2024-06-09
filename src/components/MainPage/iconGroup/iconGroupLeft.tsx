import React, { useState, useEffect } from 'react';
import styles from '../Chatting/Chatting.module.css';
import { useThreads } from '../../../hooks';

interface IconGroupLeftProps {
  centerBoxRef: React.RefObject<HTMLDivElement>;
  messageId: number;
  handleShareClick: () => void;
}

const IconGroupLeft: React.FC<IconGroupLeftProps> = ({
  centerBoxRef,
  messageId,
  handleShareClick,
}) => {
  const { selectedThreadId, messages, refreshAnswer } = useThreads();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleSpeechEnd = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.addEventListener('end', handleSpeechEnd);

    return () => {
      speechSynthesis.removeEventListener('end', handleSpeechEnd);
    };
  }, []);

  const findQuestionIndex = () =>
    messages.findIndex((msg) => msg.id === messageId) + 1;

  const handleRefreshClick = () => {
    const { content, id } = messages[findQuestionIndex()];
    refreshAnswer(selectedThreadId, id, content);
  };

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
    const voice = window.localStorage.getItem('voice') || 'FEMALE';
    const language = window.localStorage.getItem('language') || 'ko';

    if (centerBoxRef.current) {
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToSpeak = centerBoxRef.current.innerText;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        // 음성 설정 적용
        const voices = speechSynthesis.getVoices();
        const selectedVoice =
          voices.find(
            (v) =>
              (voice === 'MALE'
                ? v.name.includes('Male')
                : v.name.includes('Female')) && v.lang.includes(language)
          ) || null; // 기본값 설정

        utterance.voice = selectedVoice;

        utterance.onend = () => setIsSpeaking(false); // 음성이 끝나면 상태 변경
        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <div className={styles.iconGroupLeft}>
      <div
        className={`${styles.icon} ${isSpeaking ? styles.speakStopIcon : styles.speakerIcon}`}
        onClick={handleSpeakerClick}
      ></div>
      <div className={styles.icon} onClick={handleCopyClick}>
        <div className={styles.copyIcon}></div>
      </div>
      {messages[0].id === messageId && (
        <div className={styles.icon} onClick={handleRefreshClick}>
          <div className={styles.reanswerIcon}></div>
        </div>
      )}
      <div className={styles.icon} onClick={handleShareClick}>
        <div className={styles.shareIcon}></div>
      </div>
    </div>
  );
};

export default IconGroupLeft;
