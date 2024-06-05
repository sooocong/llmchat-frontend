import React from 'react';
import { SidebarMenu } from '../components/Sidebar';
import ChatComponent from '../components/Chat/ChatComponent';
import { useThreads } from '../hooks';

function Main() {
  const {selectedThreadId} = useThreads()
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarMenu />
      <ChatComponent key={selectedThreadId}/>
    </div>
  );
}

export { Main };