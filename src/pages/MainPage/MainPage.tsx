import React, { useEffect } from 'react';
import { Chat } from '../../components';
import { useThreads } from '../../hooks';
import { getCurrentThreadId } from '../../utils';
import { MainLayout } from '../../layout';

const MainPage = () => {
  const { initChatting, openThread } = useThreads();

  useEffect(() => {
    const currentThreadId = getCurrentThreadId();
    currentThreadId === -1 || currentThreadId === null
      ? initChatting()
      : openThread(currentThreadId);
  }, []);

  return (
    <>
      <MainLayout>
        <Chat />
      </MainLayout>
    </>
  );
};

export { MainPage };
