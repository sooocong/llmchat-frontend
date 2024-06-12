import React, { useState } from 'react';
import styles from './Login.module.css';
import desc_icon1 from '../../assets/desc_icon1.png';
import desc_icon2 from '../../assets/desc_icon2.png';
import google_icon from '../../assets/devicon_google.png';
import kakao_icon from '../../assets/devicon_kakao.png';
import naver_icon from '../../assets/devicon_naver.png';
import desc_img1 from '../../assets/desc_img1.png';
import desc_img2 from '../../assets/desc_img2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, removeAccessToken } from '../../utils';
import { ReactComponent as AerochatLogo } from '../../assets/aerochatLogo.svg';
function Login() {
  const url = 'https://api.aero-chat.com';
  const googleUrl =
    `https://accounts.google.com/o/oauth2/auth?client_id=374896040124-3usn6g5to8tugcd0qdsi925klr0f2ac9.apps.googleusercontent.com&redirect_uri=${process.env.REACT_APP_AEROCHAT_URL}/login/google/callback&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile`;
  const kakaoUrl =
    `https://kauth.kakao.com/oauth/authorize?client_id=48a8238aa85a4e36a0ac39dd28172645&redirect_uri=${process.env.REACT_APP_AEROCHAT_URL}/login/kakao/callback&response_type=code&scope=account_email%20profile_nickname%20profile_image`;
  const naverUrl =
    `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=qGH7qAsGi7uuHOcVOJq0&redirect_uri=${process.env.REACT_APP_AEROCHAT_URL}/login/naver/callback&state=0`;
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
    <div className={styles.modal}>
      <div className={styles.login_modal}>
        <div className={styles.desc_container}>
          <div className={styles.desc_title}>
            <h1>FASOO</h1>
          </div>
          <div className={styles.desc_detail}>
            <div className={styles.desc_first}>
              <img src={desc_icon1} alt="chat" />
              <h1>
                다양한 기능과 사용자 중심의 편의성을 <strong>AI Chat</strong>
                <br />
                사용자 개인에게 최적화된 대화 경험을 해보세요!
              </h1>
            </div>
            <div className={styles.desc_second}>
              <img src={desc_icon2} alt="chat" />
              <h1>
                사용자 맞춤 솔루션 제공과 사용 편의성 극대화를
                <br />
                목표로 한 <strong>맥가이버형 AI Chat</strong>
              </h1>
            </div>
          </div>
          <div className={styles.desc_img_container}>
            <div className={styles.desc_img1_container}>
              <img className={styles.desc_img1} src={desc_img1} alt="desc1" />
            </div>
            <div className={styles.desc_img2_container}>
              <img className={styles.desc_img2} src={desc_img2} alt="desc2" />
            </div>
          </div>
        </div>
        <div className={styles.login_container}>
          <div className={styles.login_title}>
            <AerochatLogo className={styles.mobile_logo}/>
            <h1>로그인</h1>
          </div>
          <div className={styles.login_detail}>
            <div className={styles.login_input}>
              <input
                className={loginFail ? styles.id_input_fail : styles.id_input}
                type="text"
                placeholder="아이디"
                onChange={(e) => setId(e.target.value)}
                onKeyDown={
                  (e) => {
                    if (e.key === 'Enter') {
                      login(e);
                    }
                  }
                }
              />
              <input
                className={loginFail ? styles.pw_input_fail : styles.pw_input}
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={
                  (e) => {
                    if (e.key === 'Enter') {
                      login(e);
                    }
                  }
                }
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
}

export default Login;
