import axios from 'axios';
import { getAccessToken } from '../utils';

// withCredentials 전역 설정
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: 'https://api.aero-chat.com/api/v1',
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

// Thread 관련 API
export class ThreadAPI {
  private static PATH_ISSUES = `/chat/thread`;
  private static QUERY_PER_PAGE = '20';

  // 쓰레드 목록 조회
  static async getThreadList(page: number, sort: SortType): Promise<IThread[]> {
    const { data } = await axiosInstance.get(this.PATH_ISSUES, {
      params: {
        size: this.QUERY_PER_PAGE,
        page: page,
        sort: `updatedAt,${sort}`,
      },
    });

    return data.content;
  }

  // 쓰레드 생성
  static async createThread(): Promise<IThread> {
    const { data } = await axiosInstance.post(this.PATH_ISSUES);

    return data;
  }

  // 메시지 전송
  // sse 문제 해결시 변경
  static async sendMessage(
    threadId: number,
    content: string
  ): Promise<IThread> {
    // sse 해결되기 전 임시
    const { data } = await axiosInstance.post(
      `${this.PATH_ISSUES}/${threadId}/send-message`,
      {
        content,
      }
    );

    return data.content;
  }

  // 메시지 목록 조회
  static async getMessages(
    threadId: number,
    page: number,
    sort: SortType = 'desc'
  ): Promise<IMessage[]> {
    const { data } = await axiosInstance.get(
      `${this.PATH_ISSUES}/${threadId}/message`,
      {
        params: {
          size: this.QUERY_PER_PAGE,
          page,
          sort,
        },
      }
    );

    return data.content;
  }

  // 쓰레드 소프트 삭제
  // sse 문제 해결시 변경
  static async editNameByAuto(threadId: number) {
    // sse 해결되기 전 임시
    await axiosInstance.put(`${this.PATH_ISSUES}/${threadId}/auto-rename`);
  }

  // 쓰레드 수동 이름 변경
  static async editNameByManual(threadId: number, chatName: string) {
    await axiosInstance.put(`${this.PATH_ISSUES}/${threadId}/manual-rename`, {
      chatName,
    });
  }

  // 쓰레드 소프트 삭제
  static async deleteThreadBySoft(threadId: number) {
    await axiosInstance.delete(`${this.PATH_ISSUES}/${threadId}/soft-delete`);
  }
}
