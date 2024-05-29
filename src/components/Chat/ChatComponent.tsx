import React, { useState } from 'react';
import './ChatComponent.css';
import { useThreads, useUpdateEffect } from '../../hooks';

const ChatComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const { messages, selectedThreadId, sendMessage, editMessage } = useThreads();

  useUpdateEffect(() => {
    setEditingIndex(-1);
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleMessageSend = () => {
    sendMessage(inputValue);
    setInputValue('');
    setEditingIndex(-1);
  };

  const handleMessageEdit = (
    threadId: number,
    messageId: number,
    message: string
  ) => {
    // 수정 필요
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

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {selectedThreadId === -1
          ? '대화를 시작하세요!'
          : [...messages].reverse().map((msg, index) =>
              msg.content === '' ? null : (
                <div key={index} className={`chat-message ${msg.role}`}>
                  {editingIndex === index ? (
                    <div className="input-container">
                      <input
                        type="text"
                        value={editInputValue}
                        onChange={handleEditInputChange}
                        className="chat-input"
                        placeholder="Type a message..."
                      />
                      <button onClick={handleCancelEdit}>Cancel</button>
                      <button
                        onClick={() => {
                          console.log(msg);
                          handleMessageEdit(
                            selectedThreadId,
                            msg.id,
                            editInputValue
                          );
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <>
                      {msg.content}
                      {msg.role === 'USER' && (
                        <button onClick={() => handleEditClick(index)}>
                          Edit
                        </button>
                      )}
                    </>
                  )}
                </div>
              )
            )}
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
