import React from 'react';
import style from './Header.module.css';
import { ReactComponent as AerochatLogo } from '../../assets/aerochatLogo.svg';
import { ReactComponent as RightIcon } from '../../assets/right-arrow-button.svg';
import { ReactComponent as CreateIcon } from '../../assets/create-button.svg';
import { useThreads } from '../../hooks';

interface IHeader {
  isSidebarVisible: boolean;
  onOpenSidebar: () => void;
}
const Header = ({ isSidebarVisible, onOpenSidebar }: IHeader) => {
  const { initChatting } = useThreads();

  return (
    <header
      className={`${style.chatHeader} ${isSidebarVisible ? style.sidebarVisible : style.sidebarHidden}`}
    >
      <button className={style.IconButton} onClick={onOpenSidebar}>
        <RightIcon />
      </button>
      <button className={style.IconButton} onClick={initChatting}>
        <CreateIcon />
      </button>
      <AerochatLogo />
    </header>
  );
};

export { Header };
