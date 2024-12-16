import React from 'react';
import { useLoaderData } from 'react-router-dom';
import profileImg from '../../assets/profile.png';
import styles from './ProfileHeader.module.css';


const ProfileHeader: React.FC = () => {
  const { user } = useLoaderData() as { user: IUser };
  const { name, profileImage, email } = user;

  return (
    <div className={styles.profileHeader}>
      <img
        src={profileImage || profileImg}
        alt="Profile"
        className={styles.profileImage}
      />
      <div className={styles.userInfo}>
        <h1 className={styles.username}>{name}</h1>
        <p className={styles.email}>{email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
