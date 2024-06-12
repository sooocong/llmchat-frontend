// src/components/MyPage/NavigationTabs.tsx
import React, { useContext, useState } from 'react';
import './NavigationTabs.css';
import { MyProfileContext } from '../../provider/myProfileProvider';

const NavigationTabs = () => {
  const { activeTab, handleTabClick } = useContext(MyProfileContext);


    return (
      <div className="tab-container w-full mb20 flex justify-content-center">
        <button
          className={`tab ${activeTab === 'trash' ? 'active' : ''}`}
          onClick={() => handleTabClick('trash')}
        >
          휴지통
        </button>
        <button
          className={`tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
          onClick={() => handleTabClick('bookmarks')}
        >
          북마크
        </button>
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabClick('profile')}
        >
          정보 수정
        </button>
      </div>
    );
};

export default NavigationTabs;
