import React from 'react';
import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
    username: string;
    email: string;
    profileImageUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, email, profileImageUrl }) => {
    return (
        <div className={styles.profileHeader}>
            <img
                src={profileImageUrl || '/assets/profile.png'}
                alt="Profile"
                className={styles.profileImage}
            />
            <div className={styles.userInfo}>
                <h1 className={styles.username}>{username}</h1>
                <p className={styles.email}>{email}</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
