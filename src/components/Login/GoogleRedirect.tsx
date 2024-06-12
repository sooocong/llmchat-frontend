import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, removeAccessToken } from '../../utils';

function GoogleRedirect() {
  const url = 'https://api.aero-chat.com';
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get('access_token');
    const tokenBody = {
      accessToken: token,
    };
    console.log('tokenBody', tokenBody);
    axios
      .post(`${url}/api/v1/auth/login-by-google`, tokenBody)
      .then((data) => {
        console.log('data', data);
        if (data.status === 200) {
          removeAccessToken();
          setAccessToken(data.data.token, false);
          navigate('/');
        }
      })
      .catch((response) => {
        console.log('response', response);

        if (response.response.status === 400) {
          alert('로그인을 다시 시도해주세요.');
          navigate('/login');
        }
      });
  }, [navigate]);

  return <div></div>;
}

export default GoogleRedirect;
