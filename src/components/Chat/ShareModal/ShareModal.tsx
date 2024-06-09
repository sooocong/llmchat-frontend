import React, { useState } from 'react';
import styles from './ShareModal.module.css';
import { ReactComponent as CloseIcon } from '../../../assets/close.svg';
import { ShareAPI } from '../../../apis';

interface IShareModal {
  onCloseModal: () => void;
  threadId: number;
  messageId: number;
}
const ShareModal = ({ onCloseModal, threadId, messageId }: IShareModal) => {
  const [inputValue, setInputValue] = useState(
    'http://localhost:3000/share/...'
  );
  const [buttonText, setButtonText] = useState('링크 만들기');
  const [title, setTitle] = useState('채팅의 공개 링크 공유');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonText('복사중');
    try {
      const { sharedKey } = await ShareAPI.shareThread(threadId, messageId);
      const newURL = `http://localhost:3000/share/${sharedKey}`;
      setInputValue(newURL);
      setButtonText('링크 복사하기');
      setTitle('공개 링크 생성');

      setIsSubmitting(false);
      navigator.clipboard.writeText(newURL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onCloseModal}></div>
      <div className={styles.modal}>
        <div>
          <h2>{title}</h2>
          <CloseIcon onClick={onCloseModal} />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputValue} readOnly />
          <button type="submit" disabled={isSubmitting}>
            {buttonText}
          </button>
        </form>
      </div>
    </>
  );
};

export { ShareModal };
