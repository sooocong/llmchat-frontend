import React from 'react';
import styles from './ButtonList.module.css';
import { ReactComponent as UserIcon } from '../../../assets/user.svg';
import { ReactComponent as SettingIcon } from '../../../assets/setting.svg';
import { useLoaderData } from 'react-router-dom';
interface IButtonList {
  onOpenSettings: () => void;
}
function ButtonList({ onOpenSettings }: IButtonList) {
  const { user } = useLoaderData() as { user: IUser };
  const { name, profileImage } = user;
  return (
    <ul className={styles.buttonList}>
      <li className={styles.sbutton} onClick={onOpenSettings}>
        <SettingIcon width="50" height="50" />
        <div>설정</div>
      </li>
      <li className={styles.sbutton}>
        {profileImage ? (
          <div
            className={styles.userImage}
            style={{ backgroundImage: `url(${profileImage})` }}
          ></div>
        ) : (
          <UserIcon width="50" height="50" />
        )}

        <div>{name}</div>
      </li>
    </ul>
  );
}

export { ButtonList };
