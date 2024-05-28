import React, { useState } from 'react';
import './ChatComponent.css';
import { useThreads } from '../../hooks';

const ChatComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, selectedThreadId, sendMessage } = useThreads();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleMessageSend = () => {
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {selectedThreadId === -1
          ? '대화를 시작하세요!'
          : [...messages].reverse().map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={handleMessageSend} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
