import React from 'react';
import styles from './SidebarMenu.module.css';
import { SearchBar } from '../SearchBar';
import { ThreadList } from '../ThreadList';
import { ButtonList } from '../ButtonList';
import { SortOptions } from '../SortOptions';
import { useThreads } from '../../../hooks';
import { ReactComponent as LeftIcon } from '../../../assets/left-arrow-button.svg';
import { ReactComponent as CreateIcon } from '../../../assets/create-button.svg';
import { useNavigate } from 'react-router-dom';
interface ISidebarMenu {
  isSidebarVisible: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

function SidebarMenu({
  isSidebarVisible,
  onClose,
  onOpenSettings,
}: ISidebarMenu) {
  const { initChatting, resetThread } = useThreads();
  const navigation = useNavigate();

  const handleCreateClick = () => {
    initChatting();
    navigation('/');
  };

  return (
    <div
      className={`${styles.container} ${isSidebarVisible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.buttonList}>
        <button className={styles.IconButton} onClick={onClose}>
          <LeftIcon />
        </button>
        <button className={styles.IconButton} onClick={handleCreateClick}>
          <CreateIcon />
        </button>
      </div>
      <SearchBar />
      <SortOptions cb={resetThread} />
      <ThreadList />
      <ButtonList onOpenSettings={onOpenSettings} />
    </div>
  );
}

export { SidebarMenu };
