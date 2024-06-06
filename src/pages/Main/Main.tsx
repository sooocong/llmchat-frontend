import React, { useEffect, useState } from 'react';
import { SidebarMenu } from '../../components/Sidebar';
import ChatComponent from '../../components/Chat/ChatComponent';
import { useThreads } from '../../hooks';
import style from './Main.module.css';
import {
  getIsSidebarOpen,
  setIsSidebarOpen,
  getCurrentThreadId,
} from '../../utils';

const Main = () => {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const initIsSidebarVisible = mediaQuery.matches
    ? !mediaQuery.matches
    : getIsSidebarOpen() === null
      ? true
      : getIsSidebarOpen();
  const [isSidebarVisible, setIsSidebarVisible] =
    useState(initIsSidebarVisible);
  const [isOverlayed, setIsOverlayed] = useState(mediaQuery.matches);
  const { selectedThreadId, initChatting, openThread } = useThreads();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsSidebarOpen(!isSidebarVisible);
    if (mediaQuery.matches) {
      setIsOverlayed(true);
    }
  };

  useEffect(() => {
    const currentThreadId = getCurrentThreadId();
    currentThreadId === -1 || currentThreadId === null
      ? initChatting()
      : openThread(currentThreadId);

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
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <div className={style.container}>
      <SidebarMenu
        isSidebarVisible={isSidebarVisible}
        onClose={toggleSidebar}
      />
      <ChatComponent
        key={selectedThreadId}
        isSidebarVisible={isSidebarVisible}
        onOpenSidebar={toggleSidebar}
      />
      {isSidebarVisible && isOverlayed && (
        <div className={style.overlay} onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export { Main };
