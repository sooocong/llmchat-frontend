import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { IMyInfo, UserAPI } from '../../../apis';
import profileImg from '../../../assets/profile.png';
import { PopupContext } from '../../../provider/popupProvider';
import "./UserForm.css";

const url = 'https://api.aero-chat.com';

const useInputs = () => {
  const { showCommonPop, showConfirmPop } = useContext(PopupContext);
  const { user } = useLoaderData() as { user: IUser };
  const [inputs, setInputs] = useState<IMyInfo>({
    ...user,
    password: '',
    passwordCheck: '',
    isSocialLogin: false
  });
  const [checkDuplicateId, setCheckDuplicateId] = useState(false);
  const [autoEmail, setAutoEmail] = useState<string | undefined>(undefined);
  const [idError, setIdError] = useState<boolean>(false);

  useEffect(() => {
    console.log(user);
    const isSocialLogin = user.loginType !== 'USERNAME';

  
    const [newEmail, newAutoEmail] = user?.email?.split('@') || ['', ''];
    const isCustomEmail = !["google.com","gmail.com","naver.com"].includes(newAutoEmail);
    
      setAutoEmail(isCustomEmail ? "custom" : newAutoEmail);
    
    console.log('newAutoEmail', newAutoEmail);

    // TODO - 소셜 로그인일 경우 checkDuplicateId 값 기본 true로 설정하기
    setInputs((prevState) => ({
      ...prevState,
      ...user,
      email: isCustomEmail ? user.email : newEmail,
      isSocialLogin
    }));

  }, [user]);

  const validationPassword = () => {
    const { password, passwordCheck } = inputs;
    if (!passwordCheck || !password) return false;
    if (!password.trim() || !passwordCheck.trim()) return false;


    return password === passwordCheck;
  }

  // 전체 값 검사
  const validation = (): { status: boolean, message?: string } => {
    const responseFail = (message: string) => ({
      status: false,
      message
    });

    // 빈 값 체크
    const { email, password, passwordCheck, name, profileImage, username, mobileNumber } = inputs;
    // TODO 소셜 로그인 유저면 비밀번호, 아이디, 이메일은 체크 안하도록 수저앟기
    if (!name) return responseFail("이름의 값이 비어져 있습니다.");

    if (!inputs.isSocialLogin) {
      // 아이디 검사
      if (!username || username.length < 6 || username.length > 20) return responseFail("아이디는 6~20자 이내여야 합니다.");

      if (idError) return responseFail("중복검사를 진행 해주세요.");

      // 패스워드 작성시에만 체크
      if (!!password && !/^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(password)) return responseFail("패스워드는 8~20자 이내에 문자,숫자, 특수문자가 포함 되어야 합니다.");
      if (!!password && !validationPassword()) return responseFail("패스워드가 일치하지 않습니다.");
      
      if (!!email && autoEmail === "choose") return responseFail("이메일 형식을 선택 해주세요. ( naver.com, google.com, ... )");
      if (!!email && autoEmail === "custom" && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) return responseFail("이메일 형식이 아닙니다.");
    }

    if (!!mobileNumber && (
      mobileNumber.length !== 11 ||
      !/[0-9]+/.test(mobileNumber)
    )) return responseFail("핸드폰번호는 11자리 숫자여야 합니다.");

    return { status: true };
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const submit = async () => {
    const validationResult = validation();
    if (!validationResult.status) {
      return showCommonPop(validationResult?.message || '서버 처리 도중 에러가 발생 했습니다.', null);
    }

    try {
      const result = await UserAPI.editUserProfile({
        ...inputs,
        email: autoEmail === "custom" || autoEmail === "choose" ? inputs.email : `${inputs.email}@${autoEmail}`
      });
      console.log(result);
      showCommonPop('정상적으로 수정되었습니다.', null);
    } catch (error) {
      console.error(error);
    }
  };

  const chkDup = () => {
    // 기존 자신이 사용하는 이름 제외
    if (inputs.username === user.username) return showCommonPop('사용 가능한 아이디입니다.', null);

    const userBody = {
      username: inputs.username,
    };
    axios.post(`${url}/api/v1/auth/check-username`, userBody).then((data) => {
      if (data.data.isAvailable === true) {
        showCommonPop('사용 가능한 아이디입니다.', null);
        setIdError(false);
      } else {
        showCommonPop('이미 사용중인 아이디입니다.', null);
        setIdError(true);
      }
    });
  };

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setInputs((prevState) => ({
            ...prevState,
            profileImage: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    inputs,
    autoEmail, setAutoEmail,
    changeInput,
    submit,
    chkDup,
    changeImage
  }
}


export default function UserFormDetailPage() {
  const { inputs: { email, password, passwordCheck, name, profileImage, username, mobileNumber, isSocialLogin }, changeInput, autoEmail, setAutoEmail, changeImage, chkDup, submit } = useInputs();


  return (
    <div className={'w-full h-full flex align-items-center items-center'}>
      <div className={'w-full flex align-items-center userForm justify-center'}>
        <div className={'w-[30%] h-full flex justify-content-center align-items-start userFormItem userFormProfile'}>
          <div className={'w-[130px] flex flex-direction-column align-items-center'}>
            <img className='rounded-full w-[130px] h-[130px] object-cover' src={profileImage || profileImg} alt="" />
            {/* <label className={'outlined-btn'} htmlFor="profileImage">사진 수정</label> */}
          </div>
          <input type="file" id={'profileImage'} name={'profileFile'} accept="image/*" onChange={(e) => changeImage(e)} style={{ display: 'none' }} />
        </div>
        <div className={'w-[70%] flex justify-content-center align-items-center userFormItem'}>
          <div className={'flex justify-content-center align-items-start'}>
            <div className={'w-full flex justify-content-center align-items-center mr10'}>
              <div style={{ width: '429px' }}>
                {!isSocialLogin && (
                  <div className={'flex justify-content-between box'}>
                    <div className={'title-box'}>
                      <p>아이디</p>
                    </div>
                    <input type="text" name={'username'} value={username} onChange={(e) => changeInput(e)} placeholder={'아이디 입력(6~20자)'} />
                  </div>
                )}
                {!isSocialLogin && (
                  <>
                    <div className={'flex justify-content-between box'}>
                      <div className={'title-box'}>
                        <p>비밀번호</p>
                      </div>
                      <input type="text" name={'password'} value={password} onChange={(e) => changeInput(e)} placeholder={'비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'} />
                    </div>
                    <div className={'flex justify-content-between box'}>
                      <div className={'title-box'}>
                        <p>비밀번호확인</p>
                      </div>
                      <input type="text" name={'passwordCheck'} value={passwordCheck} onChange={(e) => changeInput(e)} placeholder={'비밀번호 재입력'} />
                    </div>
                  </>
                )}
                <div className={'flex justify-content-between box'}>
                  <div className={'title-box'}>
                    <p>이름</p>
                  </div>
                  <input type="text" name={'name'} value={name} onChange={(e) => changeInput(e)} placeholder={'이름을 입력해주세요'} />
                </div>
                <div className={'flex justify-content-between box'}>
                  <div className={'title-box'}>
                    <p>휴대폰 번호</p>
                  </div>
                  <input type="text" name={'mobileNumber'} value={mobileNumber} onChange={(e) => changeInput(e)} placeholder={'휴대폰 번호를 입력(‘-’제외 11자리 입력)'} />
                </div>
                {!isSocialLogin && (
                  <div className={'flex justify-content-between box'}>
                    <div className={'title-box'}>
                      <p>이메일</p>
                    </div>
                    <div className={'flex align-items-center'}>
                      <input type="email" name={'email'} value={email} onChange={(e) => changeInput(e)} placeholder={'이메일 주소'} />
                      <span className={'gol'}>@</span>
                      <select className={'auto-email'} value={autoEmail} onChange={(e) => setAutoEmail(e.target.value)}>
                        <option value="choose">선택</option>
                        <option value="google.com">google.com</option>
                        <option value="gmail.com">google.com</option>
                        <option value="naver.com">naver.com</option>
                        <option value="custom">직접입력</option>
                      </select>
                    </div>
                  </div>
                )}
                <div className={'flex justify-content-center box'}>
                  <button className={'saveBtn bg-emerald2'} onClick={() => submit()}>저장</button>
                </div>
              </div>
            </div>
            {!isSocialLogin && <button className={'w-[80px] h-[32px] border border-emerald2 text-emerald2 text-[14px] bg-transparent rounded-[5px]'} onClick={() => chkDup()}>중복확인</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
