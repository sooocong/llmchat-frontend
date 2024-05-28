import React from 'react';
import { SidebarMenu } from '../components/Sidebar';
import ChatComponent from '../components/Chat/ChatComponent';

function Main() {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarMenu />
      <ChatComponent />
    </div>
  );
}

export { Main };
