import React, { createContext, useRef, useState } from 'react';
import { ThreadAPI } from '../apis/thread';

interface ThreadContextType {
  threads: IThread[];
  messages: IMessage[];
  isLoading: boolean;
  isError: boolean;
  selectedThreadId: number;
  getInfiniteThreads: () => void;
  resetThread: (sortType: SortType) => void;
  deleteThread: (id: number) => void;
  editThreadName: (id: number, chatName: string) => void;
  openThread: (id: number) => void;
  sendMessage: (sendMessage: string) => void;
}

const defaultVlaue: ThreadContextType = {
  threads: [],
  messages: [],
  isLoading: false,
  isError: false,
  selectedThreadId: -1,
  getInfiniteThreads: () => {
    throw new Error();
  },
  resetThread: () => {
    throw new Error();
  },
  deleteThread: () => {
    throw new Error();
  },
  editThreadName: () => {
    throw new Error();
  },
  openThread: () => {
    throw new Error();
  },
  sendMessage: () => {
    throw new Error();
  },
};

interface ThreadContextProviderProps {
  children: React.ReactNode;
}

export const ThreadContext = createContext<ThreadContextType>(defaultVlaue);

// Thread 관련 context
export function ThreadContextProvider({
  children,
}: ThreadContextProviderProps) {
  const [threads, setThreads] = useState<IThread[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState(-1);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [sort, setSort] = useState<SortType>('asc');

  const pageRef = useRef(0);
  const isEndRef = useRef(false);

  // 쓰레드 무한 스크롤
  const getInfiniteThreads = async () => {
    if (isEndRef.current) return;

    setIsLoading(true);
    try {
      const response = await ThreadAPI.getThreadList(pageRef.current, sort);
      console.log(response);
      if (response.length === 0) {
        isEndRef.current = true;
        return;
      }

      pageRef.current = pageRef.current + 1;
      setThreads((prev) => [...prev, ...response]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 쓰레드 새로고침
  const resetThread = async (sortType: SortType = 'asc') => {
    pageRef.current = 0;
    isEndRef.current = false;
    setThreads([]);
    setIsLoading(false);
    setIsError(false);
    setSort(sortType);
    getInfiniteThreads();
  };

  // 쓰레드 삭제
  const deleteThread = async (id: number) => {
    try {
      await ThreadAPI.deleteThreadBySoft(id);
      const newThreads = threads.filter((th) => th.id !== id);
      setThreads(newThreads);
    } catch (error) {
      console.log(error);
    }
  };

  // 쓰레드 수동 이름 수정
  const editThreadName = async (id: number, chatName: string) => {
    try {
      await ThreadAPI.editNameByManual(id, chatName);
      const newThreads = threads.map((th) =>
        th.id === id ? { ...th, chatName } : th
      );
      setThreads(newThreads);
    } catch (error) {
      console.log(error);
    }
  };

  // 쓰레드 선택 및 메시지 설정
  const openThread = async (id: number) => {
    try {
      setSelectedThreadId(id); // 쓰레드 id 변경
      const response = await ThreadAPI.getMessages(id, 0); // 메시지 불러오기
      setMessages(response); // 메시지 설정
    } catch (error) {
      console.log(error);
    }
  };

  // 메시지 전송
  // sse 문제 해결시 변경
  const sendMessage = async (message: string) => {
    try {
      if (selectedThreadId === -1) {
        // 스레드 선택 전
        // 1. 쓰레드 생성
        const response = await ThreadAPI.createThread();
        // 2. 현재 스레드 변경
        setSelectedThreadId(response.id);
        // 3. 메시지 보내기
        await ThreadAPI.sendMessage(response.id, message);
        // 4. 자동 이름 변경
        await ThreadAPI.editNameByAuto(response.id);
        // 5. 메시지 불러오기
        const data = await ThreadAPI.getMessages(response.id, 0);
        setMessages(data);
      } else {
        // 스레드 선택 후
        // 1. 메시지 보내기
        await ThreadAPI.sendMessage(selectedThreadId, message);
        // 2. 메시지 불러오기
        const data = await ThreadAPI.getMessages(selectedThreadId, 0);
        setMessages(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // 스레드 업데이트
      resetThread('asc');
    }
  };

  return (
    <ThreadContext.Provider
      value={{
        threads,
        isLoading,
        isError,
        selectedThreadId,
        messages,
        getInfiniteThreads,
        resetThread,
        deleteThread,
        editThreadName,
        openThread,
        sendMessage,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
}
