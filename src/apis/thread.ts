import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
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

  static async restoreThread(threadId: any): Promise<IThread[]> {
    const { data } = await axiosInstance.post(`${this.PATH_ISSUES}/${threadId}/restore`);

    return data.content;
  }


  // 쓰레드 검색
  static async getSearchedThreadList(query: string): Promise<ISearch[]> {
    const { data } = await axiosInstance.get(`${this.PATH_ISSUES}/search`, {
      params: {
        query: query,
      },
    });

    return data;
  }

  // 쓰레드 생성
  static async createThread(): Promise<IThread> {
    const { data } = await axiosInstance.post(this.PATH_ISSUES);

    return data;
  }

  // 메시지 전송
  static async sendMessage(
    threadId: number,
    message: string
  ): Promise<EventSourcePolyfill> {
    const ACCESS_TOKEN = getAccessToken();

    const eventSource = new EventSourcePolyfill(
      `${BASE_URL}${this.PATH_ISSUES}/${threadId}/send-message?question=${message}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    return eventSource;
  }

  // 메시지 목록 조회
  static async getMessages(
    threadId: number,
    page: number,
    size = this.QUERY_PER_PAGE,
    sort: SortType = 'desc'
  ): Promise<IMessage[]> {
    const { data } = await axiosInstance.get(
      `${this.PATH_ISSUES}/${threadId}/message`,
      {
        params: {
          size,
          page,
          sort,
        },
      }
    );

    return data.content;
  }

  // 쓰레드 자동 이름 변경
  static async editNameByAuto(threadId: number) {
    const ACCESS_TOKEN = getAccessToken();

    const eventSource = new EventSourcePolyfill(
      `${BASE_URL}${this.PATH_ISSUES}/${threadId}/auto-rename`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    return eventSource;
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

  // 메시지 수정
  static async editMessage(
    threadId: number,
    messageId: number,
    message: string
  ): Promise<EventSourcePolyfill> {
    const ACCESS_TOKEN = getAccessToken();

    const eventSource = new EventSourcePolyfill(
      `${BASE_URL}${this.PATH_ISSUES}/${threadId}/message/${messageId}/edit?question=${message}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    return eventSource;
  }

  // 메시지 평가
  static async rateMessage(
    threadId: number,
    messageId: number,
    rating: 'GOOD' | 'BAD'
  ) {
    const response = await axiosInstance.post(
      `${this.PATH_ISSUES}/${threadId}/message/${messageId}/rate`,
      {
        rating,
      }
    );
  }

  // 북마크 생성
  static async createBookmark(messageId: number): Promise<IBookmark> {
    const { data } = await axiosInstance.post('/bookmark', {
      messageId,
    });

    return data;
  }

  //  채팅 휴지동 조회
  static async paginationThreadDeleted(page: number, size: number, searchValue: string): Promise<IThreadResponse> {
    const { data } = await axiosInstance.get(`/chat/thread/deleted?page=${page}&size=${size}&query=${searchValue}`);

    return data;
  }

  // 북마크 조회
  static async paginationBookmark(page: number, size: number): Promise<IBookmarkResponse> {
    const { data } = await axiosInstance.get(`/bookmark?page=${page}&size=${size}`);

    return data;
  }

  // 북마크 삭제
  static async deleteBookmark(messageId: number): Promise<void> {
    await axiosInstance.delete(`/bookmark/${messageId}`);
  }

  // 문서 등록
  static async createDocument(
    content: string,
    securityLevel: 'LOW' | 'MID' | 'HIGH'
  ): Promise<IDocument> {
    const { data } = await axiosInstance.post('/document', {
      content,
      securityLevel,
    });

    return data;
  }
}

interface IBookmark {
  id: number;
  title: string;
  emoji: string;
  userMessage: string;
  assistantMessage: string;
  select?:any;
  active?:any;
  modify?: any;
}

// 문서 인터페이스 정의
interface IDocument {
  id: number;
  content: string;
  securityLevel: 'LOW' | 'MID' | 'HIGH';
  createdAt: string;
  updatedAt: string;
}

interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface IBookmarkResponse {
  content: IBookmark[];
  pageable: IPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface IThreadResponse {
  content: IThread[];
  pageable: IPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type { IBookmark, IBookmarkResponse, IDocument, IThreadResponse };
