import React from 'react';
<<<<<<< HEAD
import NavigationTabs from './components/MyPage/NavigationTabs';
import MyProfilePRovider from './provider/myProfileProvider';
import MyProfileProvider from './provider/myProfileProvider';
import MyPageView from './components/MyPage/MyPageView';
import MyPageProfile from './components/MyPage/MyPageProfile';
import PopupProvider from './provider/popupProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookmarkDetailInfo from './components/MyPage/Bookmark/BookmarkDetailInfo';


function App() {
  return (
    <div className="App flex justify-content-center">
      <MyProfileProvider>
        <PopupProvider>
          <BrowserRouter>
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/bookmark-info'} element={<BookmarkDetailInfo />} />
            </Routes>
          </BrowserRouter>
        </PopupProvider>
      </MyProfileProvider>
    </div>
=======
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
>>>>>>> ea18b396e5ae9996731714964db9bb61ac3416bf
  );
}

function Home() {
  return (
    <div className={'w-full w-m-1440'}>
      <MyPageProfile />
      <NavigationTabs />
      <MyPageView />
    </div>
  )
}

export default App;
