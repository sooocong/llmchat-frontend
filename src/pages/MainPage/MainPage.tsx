import React, { useEffect, useState } from 'react';
import { Chat } from '../../components';
import { useThreads } from '../../hooks';
import { getCurrentThreadId } from '../../utils';
import { MainLayout } from '../../layout';
import Settings from '../../components/Settings/Settings';

const MainPage = () => {
  const { initChatting, openThread } = useThreads();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettingsModal = () => {
    setIsSettingsOpen((prev) => !prev);
  };
  useEffect(() => {
    const currentThreadId = getCurrentThreadId();
    currentThreadId === -1 || currentThreadId === null
      ? initChatting()
      : openThread(currentThreadId);
  }, []);

  return (
    <>
      <MainLayout onOpenSettings={toggleSettingsModal}>
        <Chat />
      </MainLayout>
      <Settings
        openSettings={isSettingsOpen}
        closeSettings={toggleSettingsModal}
      />
    </>
  );
};

export { MainPage };
