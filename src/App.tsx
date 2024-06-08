import React from 'react';
import { Outlet } from 'react-router-dom';
import MyProfileProvider from './provider/myProfileProvider';
import PopupProvider from './provider/popupProvider';
import { ThreadContextProvider } from './context';

function App() {
  return (
    <ThreadContextProvider>
      <MyProfileProvider>
        <PopupProvider>
          <Outlet />
        </PopupProvider>
      </MyProfileProvider>
    </ThreadContextProvider>
  );
}

export default App;
