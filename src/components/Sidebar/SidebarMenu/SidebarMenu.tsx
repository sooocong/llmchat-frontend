import React from 'react';
import styles from './SidebarMenu.module.css';
import { ReactComponent as LogoIcon } from '../../../assets/logo.svg';
import { SearchBar } from '../SearchBar';
import { ThreadList } from '../ThreadList';
import { ButtonList } from '../ButtonList';
import { SortOptions } from '../SortOptions';

function SidebarMenu() {
  return (
    <div className={styles.container}>
      <div className={styles.aerochatLogoIcon}></div>
      <SearchBar />
      <SortOptions />
      <ThreadList />
      <ButtonList />
    </div>
  );
}

export { SidebarMenu };
