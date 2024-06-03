import React from 'react';
import styles from './SidebarMenu.module.css';
import { ReactComponent as LogoIcon } from '../../../assets/logo.svg';
import { SearchBar } from '../SearchBar';
import { ThreadList } from '../ThreadList';
import { ButtonList } from '../ButtonList';
import { SortOptions } from '../SortOptions';
import { useThreads } from '../../../hooks';

function SidebarMenu() {
  const { initChatting } = useThreads();
  return (
    <div className={styles.container}>
      <div className={styles.aerochatLogoIcon}></div>
      {/* <LogoIcon width="57px" /> */}
      <button className={styles.newChatButton} onClick={initChatting}>
        <div className={styles.plusIcon}></div>새 채팅
      </button>
      <SearchBar />
      <SortOptions />
      <ThreadList />
      <ButtonList />
    </div>
  );
}

export { SidebarMenu };
