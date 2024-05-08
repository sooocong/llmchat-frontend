// src/components/MyPage/NavigationTabs.tsx
import React, { useState } from 'react';
import './NavigationTabs.module.css';

const NavigationTabs = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div className="tab-container">
            <button
                className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => handleTabClick('profile')}
            >
                정보 수정
            </button>
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
        </div>
    );
};

export default NavigationTabs;
