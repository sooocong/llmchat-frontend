import React, { useState } from 'react';
import styles from './ButtonList.module.css';
import { ReactComponent as UserIcon } from '../../../assets/user.svg';
import { ReactComponent as SettingIcon } from '../../../assets/setting_icon.svg';
import { ReactComponent as UserInfoIcon } from '../../../assets/user_info.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/logout.svg';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useHideByClickOutside } from '../../../hooks';
import { removeAccessToken } from '../../../utils';

interface IButtonList {
  onOpenSettings: () => void;
}
function ButtonList({ onOpenSettings }: IButtonList) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const navigation = useNavigate();
  const { user } = useLoaderData() as { user: IUser };
  const { name, profileImage } = user;
  const modalRef = useHideByClickOutside(() => {
    setIsOptionOpen(false);
  }, '.' + styles.sbutton);

  const toggleOption = () => {
    setIsOptionOpen((prev) => !prev);
  };
  const logout = () => {
    removeAccessToken();
    navigation('/login');
  };
  return (
    <>
      <ul className={styles.buttonList}>
        <li className={styles.sbutton} onClick={toggleOption}>
          {profileImage ? (
            <div
              className={styles.userImage}
              style={{ backgroundImage: `url(${profileImage})` }}
            ></div>
          ) : (
            <UserIcon width="50" height="50" />
          )}

          <div>{name}</div>
          {isOptionOpen && (
            <ul className={styles.historyOptionList} ref={modalRef}>
              <li className={styles.historyOptionItem} onClick={onOpenSettings}>
                <SettingIcon width="17" height="17" />
                설정
              </li>
              <li
                className={styles.historyOptionItem}
                onClick={() => {
                  navigation('/mypage');
                }}
              >
                <UserInfoIcon width="17" height="17" />
                회원정보
              </li>
              <li className={styles.historyOptionItem} onClick={logout}>
                <LogoutIcon width="17" height="17" />
                로그아웃
              </li>
            </ul>
          )}
        </li>
      </ul>
    </>
  );
}

export { ButtonList };
