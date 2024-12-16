interface IUser {
  loginType: 'USERNAME' | 'GOOGLE' | 'KAKAO' | 'NAVER';
  username: string;
  name: string;
  mobileNumber: string;
  email: string;
  profileImage: string;
}
