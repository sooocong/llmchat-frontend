import React, { useState, useRef, useEffect } from 'react';
import styles from './Chatting.module.css';

type SpeechRecognition = {
  new (): {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    start: () => void;
    stop: () => void;
    onresult: (event: any) => void;
    onspeechend: () => void;
    onerror: (event: any) => void;
  };
};

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

interface QuestionBoxProps {
  onSendMessage: (message: string) => void;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<InstanceType<SpeechRecognition> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatInputBoxRef = useRef<HTMLFormElement | null>(null);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ko-KR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prevText) => prevText + transcript);
        setIsListening(false);
      };

      recognition.onspeechend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const handleSendClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.replace(/\n/g, '<br />')); // 줄바꿈을 <br />로 변환
      setInputText('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const pasteText = event.clipboardData?.getData('text') || '';
      setInputText((prevText) => prevText + pasteText);
    };

    if (textareaRef.current) {
      textareaRef.current.addEventListener('paste', handlePaste);
    }

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener('paste', handlePaste);
      }
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current && chatInputBoxRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 150; // 최대 높이 150px (약 7줄)
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      chatInputBoxRef.current.style.height = `${Math.min(scrollHeight, maxHeight) + 22}px`; // padding 추가
    }
  }, [inputText]);

  return (
    <>
      <form
        className={styles.chatInputBox}
        onSubmit={handleSendClick}
        ref={chatInputBoxRef}
      >
        <textarea
          ref={textareaRef}
          className={styles.inputField}
          placeholder="질문해 보세요!"
          value={inputText}
          onChange={handleChange}
          rows={1}
          style={{ maxHeight: '150px' }} // 최대 높이를 설정
        />
        <div className={styles.voiceIcon} onClick={handleVoiceInput}></div>
        <button type="submit" className={styles.sendIcon}></button>
      </form>

      {isListening && (
        <div className={styles.listeningOverlay}>
          <div className={styles.listeningMessage}>
            <div className={styles.spinner}></div>
            음성을 듣고 있습니다. 말씀해주세요.
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionBox;
