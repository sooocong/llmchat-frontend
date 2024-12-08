// src/components/ButtonList.tsx
import React, { useState } from 'react';
import styles from './ButtonList.module.css';
import { ReactComponent as UserIcon } from '../../../assets/user.svg';
import { ReactComponent as SettingIcon } from '../../../assets/setting_icon.svg';
import { ReactComponent as UserInfoIcon } from '../../../assets/user_info.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/logout.svg';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useHideByClickOutside, useThreads } from '../../../hooks';
import { clearStorage, removeAccessToken } from '../../../utils';
import MyPage from '../../MyPage/MyPage'; // ✅ MyPage 컴포넌트 가져오기
import MypageModal from '../../MyPage/MypageModal';


interface IButtonList {
  onOpenSettings: () => void;
}

function ButtonList({ onOpenSettings }: IButtonList) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false); // ✅ MyPage 모달 열림 상태 추가
  const { initProject } = useThreads();
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
    initProject();
    clearStorage();
  };

  // ✅ 회원정보 클릭 시 MypageModal을 엽니다
  const openMyPageModal = () => {
    console.log('회원정보 클릭 - MypageModal 열림');
    setIsMyPageOpen(true);
  };

  // ✅ 모달 닫기 함수
  const closeMyPageModal = () => {
    console.log('MypageModal 닫힘');
    setIsMyPageOpen(false);
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
                onClick={openMyPageModal} // ✅ 회원정보 클릭 시 MypageModal 열기
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

      {/* ✅ MypageModal 추가 */}
      <MypageModal isOpen={isMyPageOpen} onClose={closeMyPageModal}>
  <MyPage /> {/* MyPage는 모달 상태를 관리하지 않음 */}
</MypageModal>

    </>
  );
}

export { ButtonList };
