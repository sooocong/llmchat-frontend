// src/components/MyPage/MyPage.tsx
import React from 'react';
import MyPageView from './MyPageView';
import NavigationTabs from './NavigationTabs';
import ProfileHeader from './ProfileHeader';
import './myPage.css';

const MyPage: React.FC = () => {
  return (
    <div className="mypage-container">
      <ProfileHeader />
      <NavigationTabs />
      <MyPageView />
    </div>
  );
};

export default MyPage;
