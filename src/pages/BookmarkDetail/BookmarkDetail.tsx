import React from 'react';
import NavigationTabs from '../../components/MyPage/NavigationTabs';
import MyPageView from '../../components/MyPage/MyPageView';
import MyPageProfile from '../../components/MyPage/MyPageProfile';

const MyPage = () => {
  return (
    <div className="App flex justify-content-center">
      <div className={'w-full w-m-1440'}>
        <MyPageProfile />
        <NavigationTabs />
        <MyPageView />
      </div>
    </div>
  );
};

export { MyPage };
