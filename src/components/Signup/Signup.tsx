import React, { useCallback, useState } from 'react'
import styles from './Signup.module.css';
import fasoo_icon from '../assets/fasoo_icon.png';
import axios from 'axios';

function Signup({ openLogin, openSignup, closeSignup }: { openLogin: () => void, openSignup: boolean, closeSignup: () => void }) {
    const url = "https://api.aero-chat.com";
    const [id, setId] = useState<string | null>("");
    const [pw, setPw] = useState<string | null>("");
    const [validPw, setValidPw] = useState<string | null>("");
    const [idErrorMsg, setIdErrorMsg] = useState<string | null>("");    
    const [idError, setIdError] = useState<boolean>(false);
    const [pwError, setPwError] = useState<boolean>(false);
    const [validPwError, setValidPwError] = useState<boolean>(false);
    const [name, setName] = useState<string | null>("");
    const [phone, setPhone] = useState<string | null>("");
    const [emailId, setEmailId] = useState<string | null>("");
    const [domain, setDomain] = useState<string | null>("");

    const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
        if (e.target.value.length < 6 || e.target.value.length > 20) {
            setIdErrorMsg("아이디는 6자 이상 20자 이하여야 합니다.")
            setIdError(true);
        }
        else {
            setIdError(false);
        }
    }, [])

    const onChangePw = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value);
        const hasLetter = /[a-zA-Z]/.test(e.target.value);
        const hasNumber = /\d/.test(e.target.value);
        const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(e.target.value);
        const isValidLength = e.target.value.length >= 8 && e.target.value.length <= 20;
        if (hasLetter && hasNumber && hasSpecial && isValidLength) {
            setPwError(false);
        }
        else {
            setPwError(true);
        }        
    }, [])

    const onChangeValidPw = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValidPw(e.target.value);
        if (pw === e.target.value) {
            setValidPwError(false);
        }
        else {
            setValidPwError(true);
        }      
    }, [pw])

    const setEmail = (e: { target: { value: string; }; }) => {
        const emailTxt: HTMLInputElement = document.querySelector('#email_txt') as HTMLInputElement;
        if (e.target.value !== "write") {
            emailTxt.value = e.target.value;
            emailTxt.disabled = true;
            setDomain(e.target.value);
        }
        else {
            emailTxt.value = "";
            emailTxt.disabled = false;
        }
    }

    const chkDup = () => {
        const userBody = {
            username: id,
        }
        axios.post(`${url}/api/v1/auth/check-username`, userBody)
            .then(data => {
                if (data.data.isAvailable === true) {
                    alert("사용 가능한 아이디입니다.");
                }
                else {
                    setIdErrorMsg("이미 사용중인 아이디입니다.");
                    setIdError(true);
                }
        })
    }

    const register = (e: { preventDefault: () => void; }) => {

        e.preventDefault();
        if (id === "" || pw === "" || validPw === "" || name === "") {
            alert("필수 정보를 모두 입력해주세요.");
        }
        else if (pw !== validPw) {
            alert("비밀번호가 동일하지 않습니다.");
        }
        else {
            const userBody = {
                username: id,
                password: pw,
                email: (emailId && domain) ? emailId + domain : "",
                mobileNumber: phone,
                name: name
            }
            axios.post(`${url}/api/v1/auth/register-by-username`, userBody)
                .then(data => {
                    if (data.status === 200) {
                        alert("회원가입이 완료되었습니다.");
                        closeSignup();
                        openLogin();
                    }
                }).catch(response => {
                    if (response.response.status === 400) {
                        alert("회원가입을 다시 시도해주세요.");
                    }
                })
        }
    }

    return (
        <div className={openSignup ? styles.modal : styles.closeModal}>
            <div className={styles.signup_modal}>
                <div className={styles.signup_top}>
                    <img className={styles.fasoo_icon} src={fasoo_icon} alt='fasoo' />
                    <div className={styles.signup_title}>
                        <h1 className={styles.signup_title_txt}>회원가입</h1>
                    </div>
                    <button className={styles.btn_close} onClick={closeSignup}>X</button>
                </div>
                <div className={styles.signup_detail}>
                    <div className={styles.signup_id}>
                        <h1 className={styles.signup_info1}>아이디</h1>
                        <input className={styles.signup_input} required type='text' placeholder='아이디 입력(6~20자)' onChange={onChangeId} />
                        <button className={styles.btn_dup} onClick={chkDup}>중복 확인</button>
                    </div>
                    <div className={styles.msg_section}>
                        <p className={idError ? styles.error_msg : styles.error_msg_none}>{idErrorMsg}</p>
                    </div>
                    <div className={styles.signup_pw}>
                        <h1 className={styles.signup_info1}>비밀번호</h1>
                        <input className={styles.signup_pw_input} type='password' placeholder='비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)' onChange={onChangePw} />
                    </div>
                    <div className={styles.msg_section}>
                        <p className={pwError ? styles.error_msg : styles.error_msg_none}>비밀번호는 문자, 숫자, 특수문자 포함 8~20자로 입력해주세요.</p>
                    </div>
                    <div className={styles.signup_chkpw}>
                        <h1 className={styles.signup_info1}>비밀번호확인</h1>
                        <input className={styles.signup_pw_input} type='password' placeholder='비밀번호 재입력' onChange={onChangeValidPw} />
                    </div>
                    <div className={styles.msg_section}>
                        <p className={validPwError ? styles.error_msg : styles.error_msg_none}>비밀번호가 일치하지 않습니다.</p>
                    </div>
                    <div className={styles.signup_name}>
                        <h1 className={styles.signup_info1}>이름</h1>
                        <input className={styles.signup_input} type='text' placeholder='이름을 입력해주세요' onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={styles.signup_phone}>
                        <h1 className={styles.signup_info2}>휴대폰 번호</h1>
                        <input className={styles.signup_input} type='text' placeholder="휴대폰 번호를 입력('-'제외 11자리 입력)" onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className={styles.signup_email}>
                        <h1 className={styles.signup_info2}>이메일</h1>
                        <input className={styles.signup_email_input} type='text' placeholder='이메일 주소' onChange={e => setEmailId(e.target.value)} />
                        <p className={styles.signup_email_symbol}>@</p>
                        <input className={styles.signup_email_box} id='email_txt' type='text' onChange={e => setDomain(e.target.value)} />
                        <select className={styles.signup_email_select} id='email_list' onChange={setEmail}>
                            <option hidden>선택</option>
                            <option value='google.com'>google.com</option>
                            <option value='naver.com'>naver.com</option>
                            <option value='write'>직접 입력</option>
                        </select>
                    </div>
                    <div className={styles.btn_section}>
                        <button className={styles.btn_signup} onClick={register}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup