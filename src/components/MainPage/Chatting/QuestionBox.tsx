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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault();

        // 현재 입력 중인 한글 조합을 완성시키기 위해 setTimeout 사용
        setTimeout(() => {
          const cursorPosition = textareaRef.current?.selectionStart || 0;
          const currentText = textareaRef.current?.value || '';

          setInputText(
            currentText.slice(0, cursorPosition) +
              '\n' +
              currentText.slice(cursorPosition)
          );

          // 커서 위치 조정
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = cursorPosition + 1;
              textareaRef.current.selectionEnd = cursorPosition + 1;
            }
          }, 0);
        }, 0);
      } else {
        e.preventDefault();
        if (inputText.trim()) {
          onSendMessage(inputText.replace(/\n/g, '<br />'));
          setInputText('');
        }
      }
    }
  };

  const handleSendClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.replace(/\n/g, '<br />'));
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

      // 상태를 업데이트 후 handleChange 호출
      if (textareaRef.current) {
        handleChange({
          target: textareaRef.current,
        } as React.ChangeEvent<HTMLTextAreaElement>);
      }
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
      const maxHeight = 150; // 최대 높이 150px
      const newHeight = Math.min(scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      chatInputBoxRef.current.style.height = `${newHeight + 22}px`; // padding 추가
    }
  }, [inputText]);

  return (
    <>
      <form
        className={styles.chatInputBox}
        onSubmit={handleSendClick}
        ref={chatInputBoxRef}
      >
        <div className={styles.inputWrapper}>
          <textarea
            ref={textareaRef}
            className={styles.inputField}
            placeholder="질문해 보세요!"
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
        </div>
        <label className={styles.fileIcon}>
          <input
            type="file"
            // onChange={handleFileSelect}
            className={styles.fileInput}
            accept=".txt,.pdf,.doc,.docx,.csv"
            style={{ display: 'none' }}
          />
        </label>
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
