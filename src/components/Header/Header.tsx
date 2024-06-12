import React from 'react';
import style from './Header.module.css';
import { ReactComponent as AerochatLogo } from '../../assets/aerochatLogo.svg';
import { ReactComponent as RightIcon } from '../../assets/right-arrow-button.svg';
import { ReactComponent as CreateIcon } from '../../assets/create-button.svg';
import { useThreads } from '../../hooks';
import { useNavigate } from 'react-router-dom';

interface IHeader {
  isSidebarVisible: boolean;
  onOpenSidebar: () => void;
}
const Header = ({ isSidebarVisible, onOpenSidebar }: IHeader) => {
  const { initChatting } = useThreads();
  const navigation = useNavigate();

  const handleCreateClick = () => {
    initChatting();
    navigation('/');
  };

  return (
    <header
      className={`${style.chatHeader} ${isSidebarVisible ? style.sidebarVisible : style.sidebarHidden}`}
    >
      <button className={style.IconButton} onClick={onOpenSidebar}>
        <RightIcon />
      </button>
      <button className={style.IconButton} onClick={handleCreateClick}>
        <CreateIcon />
      </button>
      <AerochatLogo />
    </header>
  );
};

export { Header };
