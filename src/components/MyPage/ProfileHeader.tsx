// src/components/MyPage/ProfileHeader.tsx
import React from 'react';
import './ProfileHeader.module.css';

interface ProfileHeaderProps {
    username: string;
    email: string;
    profileImageUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, email, profileImageUrl }) => {
    return (
        <div className="profile-header">
            {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="profile-image" />}
            <div className="user-info">
                <h1 className="username">{username}</h1>
                <p className="email">{email}</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
