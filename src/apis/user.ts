import axios from 'axios';
import { getAccessToken } from '../utils';

// withCredentials 전역 설정
axios.defaults.withCredentials = true;

const BASE_URL = 'https://api.aero-chat.com/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  const ACCESS_TOKEN = getAccessToken();
  if (ACCESS_TOKEN) request.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
  if (!ACCESS_TOKEN) request.headers['Authorization'] = '';
  return request;
});

// User 관련 API
export class UserAPI {
  private static PATH_ISSUES = `/user`;

  // 사용자 프로필 조회
  static async getUserProfile(): Promise<IUser> {
    const { data } = await axiosInstance.get(`${this.PATH_ISSUES}/profile`);

    return data;
  }

  // 사용자 프로필 수정
  static async editUserProfile(
    password: string,
    name: string,
    mobileNumber: string,
    email: string
  ) {
    await axiosInstance.post(`${this.PATH_ISSUES}/profile`, {
      password,
      name,
      mobileNumber,
      email,
    });
  }
}
