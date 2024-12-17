import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as AerochatLogo } from '../../assets/aerochatLogo.svg';
import google_icon from '../../assets/devicon_google.png';
import kakao_icon from '../../assets/devicon_kakao.png';
import naver_icon from '../../assets/devicon_naver.png';
import loginLogo from '../../assets/logo/login_logo.png';
import { removeAccessToken, setAccessToken } from '../../utils';
import styles from './Login.module.css';

export const NewLoginPage = () => {
  const url = 'https://api.aero-chat.com';
  const googleUrl = `https://accounts.google.com/o/oauth2/auth?client_id=374896040124-3usn6g5to8tugcd0qdsi925klr0f2ac9.apps.googleusercontent.com&redirect_uri=${process.env.REACT_APP_AEROCHAT_URL}/login/google/callback&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile`;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=48a8238aa85a4e36a0ac39dd28172645&redirect_uri=${process.env.REACT_APP_AEROCHAT_URL}/login/kakao/callback&response_type=code&scope=account_email%20profile_nickname%20profile_image`;
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=qGH7qAsGi7uuHOcVOJq0&redirect_uri=${process.env.REACT_APP_AEROCHAT_URL}/login/naver/callback&state=0`;
  const [loginFail, setLoginFail] = useState<boolean>(false);
  const [id, setId] = useState<string | null>('');
  const [pw, setPw] = useState<string | null>('');
  const [remember, setRemember] = useState<boolean>(false);
  const navigate = useNavigate();
  const login = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (id === '' || pw === '') {
      alert('이메일과 비밀번호가 입력되었는지 확인해주세요');
    } else {
      const userBody = {
        username: id,
        password: pw,
      };
      axios
        .post(`${url}/api/v1/auth/login-by-username`, userBody)
        .then((data) => {
          if (data.status === 200) {
            removeAccessToken();
            setAccessToken(data.data.token, remember);
            navigate('/');
          }
        })
        .catch((response) => {
          if (response.response.status === 400) {
            setLoginFail(true);
            alert('아이디나 비밀번호를 다시 확인해주세요.');
          }
        });
    }
  };

  return (
    <div className="w-full h-[calc(100%-74px)] relative flex">
      <div className="w-[50%] relative border-2 border-black flex items-center justify-center overflow-hidden">
        <div className="absolute right-0 z-[-1] w-[1440px] h-[1440px] bg-gradient-to-b from-[10%] from-emerald to-emeraldBlue rounded-full"></div>
        <div className="content flex flex-col items-center justify-center">
          <img src={loginLogo} alt="login logo" />
          <h3 className="text-white mt-5">AEROCAHT에 오신 걸 환영합니다. </h3>
        </div>
      </div>
      {/* form */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className={styles.login_container}>
          <div className={styles.login_title}>
            <AerochatLogo className={styles.mobile_logo} />
            <h1>로그인</h1>
          </div>
          <div className={styles.login_detail}>
            <div className={styles.login_input}>
              <input
                className={`${loginFail ? styles.id_input_fail : styles.id_input} pl-[5px]`}
                type="text"
                placeholder="아이디"
                onChange={(e) => setId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    login(e);
                  }
                }}
              />
              <input
                className={`${loginFail ? styles.pw_input_fail : styles.pw_input} pl-[5px]`}
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    login(e);
                  }
                }}
              />
              <p
                className={
                  loginFail ? styles.login_fail_txt : styles.login_fail_txt_none
                }
              >
                가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
              </p>
            </div>
            <label className={styles.autologin}>
              <input
                type="checkbox"
                id={styles.chk}
                onClick={() => setRemember(!remember)}
              />
              <i className={styles.circle}></i>
              <span className={styles.chkname}>로그인 유지</span>
            </label>
            <button className={styles.btn_login} onClick={login}>
              로그인
            </button>
            <p
              className={styles.btn_signup}
              onClick={() => {
                navigate('/signup');
              }}
            >
              회원가입
            </p>
          </div>
          <div className={styles.login_social}>
            <a className={styles.icon_circle} href={googleUrl}>
              <img
                className={styles.icon_social}
                src={google_icon}
                alt="google"
              />
            </a>
            <a className={styles.icon_circle} href={kakaoUrl}>
              <img
                className={styles.icon_social}
                src={kakao_icon}
                alt="kakao"
              />
            </a>
            <a className={styles.icon_circle} href={naverUrl}>
              <img
                className={styles.icon_social}
                src={naver_icon}
                alt="naver"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
