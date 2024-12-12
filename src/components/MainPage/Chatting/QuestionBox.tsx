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

      recognition.onerror = (event) => {
        const error = event as any;
        console.error('Speech recognition error:', error.error, error.message);
        
        // iOS Safari에서 자주 발생하는 'not-allowed' 에러 처리
        if (error.error === 'not-allowed') {
          console.log('Attempting to request microphone permission...');
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
              console.log('Microphone permission granted');
              // 권한을 받은 후 재시도
              if (recognitionRef.current) {
                recognitionRef.current.start();
              }
            })
            .catch((err) => {
              console.error('Failed to get microphone permission:', err);
              setIsListening(false);
            });
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return; // 한글 조합 중이면 아무 동작도 하지 않음
    }

    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter: 줄바꿈
        return;
      } else {
        // Enter: 메시지 전송
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const pasteText = event.clipboardData?.getData('text') || '';
      setInputText((prevText) => prevText + pasteText);

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
      const maxHeight = 150;
      const newHeight = Math.min(scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      chatInputBoxRef.current.style.height = `${newHeight + 22}px`;
    }
  }, [inputText]);

  return (
    <>
      <form
        className={styles.chatInputBox}
        onSubmit={handleSendMessage}
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
            style={{ minHeight: '38px', maxHeight: '150px' }}
          />
        </div>
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
