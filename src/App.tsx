import React from 'react';
import NavigationTabs from './components/MyPage/NavigationTabs';
import MyProfilePRovider from './provider/myProfileProvider';
import MyProfileProvider from './provider/myProfileProvider';
import MyPageView from './components/MyPage/MyPageView';
import MyPageProfile from './components/MyPage/MyPageProfile';
import PopupProvider from './provider/popupProvider';


function App() {
  return (
    <div className="App flex justify-content-center">
      <MyProfileProvider>
        <PopupProvider>
          <div className={'w-full w-m-1440'}>
            <MyPageProfile />
            <NavigationTabs />
            <MyPageView />
          </div>
        </PopupProvider>
      </MyProfileProvider>
    </div>
  );
}

export default App;
