import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, removeAccessToken } from '../../utils';

function NaverRedirect() {
    const url = "https://api.aero-chat.com";
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const codeBody = {
            code: code
        }
        axios.post(`${url}/api/v1/auth/login-by-naver`, codeBody)
            .then(data => {
                if (data.status === 200) {
                    removeAccessToken();
                    setAccessToken(data.data.token, false);
                    navigate('/');
                }
            }).catch(response => {
                if (response.response.status === 400) {
                    alert("로그인을 다시 시도해주세요.");
                    navigate('/login');
                }
            });
    }, [navigate])
    
    return (
        <div></div>
    )
}

export default NaverRedirect