import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleRedirect() {
    const url = "https://api.aero-chat.com";
    const navigate = useNavigate();

    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const token = hashParams.get('access_token');
        const tokenBody = {
            accessToken: token
        }
        axios.post(`${url}/api/v1/auth/login-by-google`, tokenBody)
            .then(data => {
                if (data.status === 200) {
                    sessionStorage.clear();
                    sessionStorage.setItem('token', data.data.token);
                    navigate('/');
                }
            }).catch(response => {
                if (response.response.status === 400) {
                    alert("로그인을 다시 시도해주세요.");
                    navigate('/');
                }
            });
    }, [navigate])

    return (
        <div></div>
    )
}

export default GoogleRedirect