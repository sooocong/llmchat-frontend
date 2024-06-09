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

// Share 관련 API
export class ShareAPI {
  private static PATH_ISSUES = `/share`;

  // 쓰레드 공유
  static async shareThread(
    threadId: number,
    messageId: number
  ): Promise<IShare> {
    const { data } = await axiosInstance.post(
      `${this.PATH_ISSUES}/thread/${threadId}/message/${messageId}/share`
    );
    return data;
  }

  // 쓰레드 정보 조회
  static async getSharedThread(sharedKey: string): Promise<ISharedThread> {
    const { data } = await axiosInstance.get(
      `${this.PATH_ISSUES}/shared-thread/${sharedKey}`
    );

    return data;
  }

  // 쓰레드 메시지 목록 조회
  static async getSharedThreadMessages(
    sharedKey: string
  ): Promise<ISharedThread> {
    const { data } = await axiosInstance.get(
      `${this.PATH_ISSUES}/shared-thread/${sharedKey}/message`
    );

    return data.content;
  }
}
