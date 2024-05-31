import React, { useState } from 'react';
import styles from './ThreadItem.module.css';
import { ReactComponent as OptionIcon } from '../../../assets/option.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit.svg';
import { ReactComponent as UploadIcon } from '../../../assets/upload.svg';
import { useHideByClickOutside, useThreads } from '../../../hooks';

function ThreadItem({ history }: { history: IThread }) {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const { selectedThreadId, openThread, deleteThread, editThreadName } =
    useThreads();

  const modalRef = useHideByClickOutside(() => {
    setIsOptionOpen(false);
  }, '.' + styles.HistoryItemPerDay);

  const handleOptionClick = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setIsEditing(true);
    setInputValue(history.chatName);
  };

  const handleInputBlur = () => {
    editThreadName(history.id, inputValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      editThreadName(history.id, inputValue);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    deleteThread(history.id);
  };

  const handleThreadOpen = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    openThread(history.id);
  };

  return (
    <li
      className={
        isOptionOpen || selectedThreadId == history.id
          ? styles.HistoryItemPerDay + ' ' + styles.isActive
          : styles.HistoryItemPerDay
      }
      onClick={handleThreadOpen}
    >
      {isEditing ? (
        <input
          autoFocus
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          {history.chatName}
          <button onClick={handleOptionClick}>
            <OptionIcon width="24" height="15" />
          </button>
        </>
      )}

      {isOptionOpen && (
        <ul ref={modalRef} className={styles.historyOptionList}>
          <li className={styles.historyOptionItem}>
            <UploadIcon width="17" height="17" />
            공유
          </li>
          <li className={styles.historyOptionItem} onClick={handleEditClick}>
            <EditIcon width="17" height="17" />
            편집
          </li>
          <li className={styles.historyOptionItem} onClick={handleDeleteClick}>
            <DeleteIcon width="17" height="17" />
            삭제
          </li>
        </ul>
      )}
    </li>
  );
}

export { ThreadItem };
