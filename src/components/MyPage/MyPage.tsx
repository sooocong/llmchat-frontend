// src/components/MyPage/MyPage.tsx
import React from 'react';
import ProfileHeader from './ProfileHeader';
import NavigationTabs from './NavigationTabs';
import MyPageView from './MyPageView';
import './myPage.css';

const MyPage: React.FC = () => {
  return (
    <div className="mypage-container">
      <ProfileHeader username="홍길동" email="sopia0315@naver.com" />
      <NavigationTabs />
      <MyPageView />
    </div>
  );
};

export default MyPage;
