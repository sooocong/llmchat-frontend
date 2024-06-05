import React from 'react';
import styles from './SidebarMenu.module.css';
import { SearchBar } from '../SearchBar';
import { ThreadList } from '../ThreadList';
import { ButtonList } from '../ButtonList';
import { SortOptions } from '../SortOptions';
import { useThreads } from '../../../hooks';
import { ReactComponent as LeftIcon } from '../../../assets/left-arrow-button.svg';
import { ReactComponent as CreateIcon } from '../../../assets/create-button.svg';
interface ISidebarMenu {
  isSidebarVisible: boolean;
  onClose: () => void;
}

function SidebarMenu({ isSidebarVisible, onClose }: ISidebarMenu) {
  const { initChatting } = useThreads();
  return (
    <div
      className={`${styles.container} ${isSidebarVisible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.buttonList}>
        <button className={styles.IconButton} onClick={onClose}>
          <LeftIcon />
        </button>
        <button className={styles.IconButton} onClick={initChatting}>
          <CreateIcon />
        </button>
      </div>
      <SearchBar />
      <SortOptions />
      <ThreadList />
      <ButtonList />
    </div>
  );
}

export { SidebarMenu };
