import React from 'react';
import "./myPage.css";
import profileImg from '../../assets/profile.png';
export default function MyPageProfile() {
  return (
    <div className={"w-full flex justify-content-center align-items-center mt30 mb30"}>
      <div className={"flex align-items-center"}>
        <div className={"profile"}>
          <img src={profileImg} alt="" />
        </div>
        <div className={'text-box flex flex-direction-column justify-content-between'}>
          <p className={'name fs20'}>홍길동</p>
          <p className={'email fs20'}>sopia0315@naver.com</p>
        </div>
      </div>
    </div>
  );
}
