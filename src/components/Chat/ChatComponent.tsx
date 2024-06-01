import React, { useState } from 'react';
import './ChatComponent.css';
import { useThreads, useUpdateEffect } from '../../hooks';
import QuestionBox from '.././MainPage/Chatting/QuestionBox';
import ChattingQuestion from '.././MainPage/Chatting/ChattingQuestion';
import ChattingAnswer from '.././MainPage/Chatting/ChattingAnswer';

const ChatComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const { messages, selectedThreadId, sendMessage, editMessage, rateMessage } = useThreads();

  useUpdateEffect(() => {
    setEditingIndex(-1);
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleMessageSend = (message: string) => {
    sendMessage(message);
    setInputValue('');
    setEditingIndex(-1);
  };

  const handleMessageEdit = (threadId: number, messageId: number, message: string) => {
    editMessage(threadId, messageId, message);
    setInputValue('');
    setEditingIndex(-1);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditInputValue([...messages].reverse()[index].content);
  };

  const handleCancelEdit = () => {
    setInputValue('');
    setEditingIndex(-1);
  };

  const handleRatingClick = (messageId: number, rating: 'GOOD' | 'BAD') => {
    rateMessage(selectedThreadId, messageId, rating);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {selectedThreadId === -1
          ? '대화를 시작하세요!'
          : [...messages].reverse().map((msg, index) =>
              msg.role === 'USER' ? (
                <ChattingQuestion key={index} message={msg.content} />
              ) : (
                <ChattingAnswer key={index} message={msg.content} />
              )
            )}
      </div>
      <div className="chat-input-container">
        <QuestionBox onSendMessage={handleMessageSend} />
      </div>
    </div>
  );
};

export default ChatComponent;