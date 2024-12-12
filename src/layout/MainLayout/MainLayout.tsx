import React, { useEffect, useState, ReactNode } from 'react';
import { Chat, SidebarMenu, Header } from '../../components';
import style from './MainLayout.module.css';
import { getIsSidebarOpen, setIsSidebarOpen } from '../../utils';
import Settings from '../../components/Settings/Settings';

interface IMainLayout {
  children: ReactNode;
}
const MainLayout = ({ children }: IMainLayout) => {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const initIsSidebarVisible = mediaQuery.matches
    ? !mediaQuery.matches
    : getIsSidebarOpen() === null
      ? true
      : getIsSidebarOpen();
  const [isSidebarVisible, setIsSidebarVisible] =
    useState(initIsSidebarVisible);
  const [isOverlayed, setIsOverlayed] = useState(mediaQuery.matches);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettingsModal = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsSidebarOpen(!isSidebarVisible);
    if (mediaQuery.matches) {
      setIsOverlayed(true);
    }
  };

  useEffect(() => {
    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(getIsSidebarOpen());
        setIsOverlayed(false);
      }
    };

    if (getIsSidebarOpen() === null) {
      setIsSidebarOpen(true);
    }
    console.log("!!!!!!!!!!!!!!!!!! 6");
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <>
      <div className={style.container}>
        <SidebarMenu
          isSidebarVisible={isSidebarVisible}
          onClose={toggleSidebar}
          onOpenSettings={toggleSettingsModal}
        />
        <Header
          isSidebarVisible={isSidebarVisible}
          onOpenSidebar={toggleSidebar}
        />
        <div
          className={`${style.childrenContainer} ${isSidebarVisible ? style.sidebarVisible : style.sidebarHidden}`}
        >
          {children}
        </div>
        {isSidebarVisible && isOverlayed && (
          <div className={style.overlay} onClick={toggleSidebar}></div>
        )}
      </div>
      <Settings
        openSettings={isSettingsOpen}
        closeSettings={toggleSettingsModal}
      />
    </>
  );
};

export { MainLayout };
