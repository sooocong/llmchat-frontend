import React from 'react';
import profileImg from '../../../assets/profile.png';
import "./UserForm.css";

export default function UserFormDetailPage() {
  return (
    <div className={'w-full h-full flex align-items-center'}>
      <div className={'w-full flex align-items-center userForm'}>
        <div className={'h-full flex justify-content-center align-items-start userFormSideItem userFormItem userFormProfile'}>
          <div className={'flex flex-direction-column align-items-center img-cover'}>
            <img src={profileImg} alt="" />
            <label className={'outlined-btn'} htmlFor="profileFile">사진 수정</label>
          </div>
          <input type="file" id={'profileFile'} name={'profileFile'} style={{ display: 'none' }} />
        </div>
        <div className={'flex justify-content-center align-items-center form-container userFormItem'}>
          <div className={'flex justify-content-center align-items-start'}>
            <div className={'w-full flex justify-content-center align-items-center mr10'}>
              <div style={{ width: '429px' }}>
                <div className={'flex justify-content-between box'}>
                  <div className={'title-box'}>
                    <p>아이디</p>
                  </div>
                  <input type="text" name={'loginId'} placeholder={'아이디 입력(6~20자)'} />
                </div>
                <div className={'flex justify-content-between box'}>
                  <div className={'title-box'}>
                    <p>비밀번호</p>
                  </div>
                  <input type="text" name={'loginPassword'} placeholder={'비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'} />
                </div>
                <div className={'flex justify-content-between box'}>
                  <div className={'title-box'}>
                    <p>비밀번호확인</p>
                  </div>
                  <input type="text" name={'loginPasswordCheck'} placeholder={'비밀번호 재입력'} />
                </div>
                <div className={'flex justify-content-between box'}>
                  <div className={'title-box'}>
                    <p>이름</p>
                  </div>
                  <input type="text" name={'name'} placeholder={'이름을 입력해주세요'} />
                </div>
                <div className={'flex justify-content-between box'}>
                  <div className={'title-box'}>
                    <p>휴대폰 번호</p>
                  </div>
                  <input type="text" name={'phone'} placeholder={'휴대폰 번호를 입력(‘-’제외 11자리 입력)'} />
                </div>
                <div className={'flex justify-content-between box'}>
                  <div className={'title-box'}>
                    <p>이메일</p>
                  </div>
                  <div className={'flex align-items-center'}>
                    <input type="email" placeholder={'이메일 주소'} />
                    <span className={'gol'}>@</span>
                    <select className={'auto-email'} name="" id="">
                      <option value="choose">선택</option>
                      <option value="google.com">google.com</option>
                      <option value="naver.com">naver.com</option>
                      <option value="google">직접입력</option>
                    </select>
                  </div>
                </div>
                <div className={'flex justify-content-center box'}>
                  <button className={'saveBtn'}>저장</button>
                </div>
              </div>
            </div>
            <button className={'outlined-btn color-primary'}>중복확인</button>
          </div>
        </div>
        <div className={'flex justify-content-center align-items-center userFormSideItem userFormItem'}>
        </div>
      </div>
    </div>
  );
}
