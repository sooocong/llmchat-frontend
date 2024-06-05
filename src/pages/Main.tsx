import React, { useState } from 'react';
import { SidebarMenu } from '../components/Sidebar';
import ChatComponent from '../components/Chat/ChatComponent';
import { useThreads } from '../hooks';

function Main() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { selectedThreadId } = useThreads();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div style={{  width: '100%', height: '100vh' }}>
      <SidebarMenu
        isSidebarVisible={isSidebarVisible}
        onClose={toggleSidebar}
      />
      <ChatComponent
        key={selectedThreadId}
        isSidebarVisible={isSidebarVisible}
        onOpenSidebar={toggleSidebar}
      />
    </div>
  );
}

export { Main };
