import React, { createContext, useEffect, useRef, useState } from 'react';
import { ThreadAPI } from '../apis/thread';
import { useUpdateEffect } from '../hooks';
import { setCurrentThreadId } from '../utils';
interface ThreadContextType {
  threads: IThread[];
  messages: IMessage[];
  isLoading: boolean;
  isError: boolean;
  isMsgLoading: boolean;
  isMsgError: boolean;
  isFirstMsgLoading: number;
  selectedThreadId: number;
  sort: SortType;
  searchedThreads: ISearch[];
  searchedMessageIdIndex: number | null;
  getInfiniteThreads: () => void;
  resetThread: (sortType: SortType) => void;
  deleteThread: (id: number) => void;
  editThreadName: (id: number, chatName: string) => void;
  openThread: (id: number) => void;
  sendMessage: (sendMessage: string) => void;
  editMessage: (threadId: number, messageId: number, message: string) => void;
  refreshAnswer: (threadId: number, messageId: number, message: string) => void;
  rateMessage: (
    threadId: number,
    messageId: number,
    rating: 'GOOD' | 'BAD'
  ) => void;
  initChatting: () => void;
  getSearchedThreads: (query: string) => void;
  getInfiniteMessages: () => void;
  searchMessage: (messageId: number | null) => void;
  initProject: () => void;
}

const defaultVlaue: ThreadContextType = {
  threads: [],
  messages: [],
  isLoading: false,
  isError: false,
  isMsgLoading: false,
  isMsgError: false,
  isFirstMsgLoading: 0,
  selectedThreadId: -1,
  sort: 'desc',
  searchedThreads: [],
  searchedMessageIdIndex: null,
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
  editMessage: () => {
    throw new Error();
  },
  refreshAnswer: () => {
    throw new Error();
  },
  rateMessage: () => {
    throw new Error();
  },
  initChatting: () => {
    throw new Error();
  },
  getSearchedThreads: () => {
    throw new Error();
  },
  getInfiniteMessages: () => {
    throw new Error();
  },
  searchMessage: () => {
    throw new Error();
  },
  initProject: () => {
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
  const [isMsgLoading, setIsMsgLoading] = useState(false);
  const [isMsgError, setIsMsgError] = useState(false);
  const [isFirstMsgLoading, setIsFirstMsgLoading] = useState(0); // 첫 로드를 했는지 판단하는 상태 (첫 로드 마치면 1 이상)
  const [selectedThreadId, setSelectedThreadId] = useState(-1);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [sort, setSort] = useState<SortType>('desc');
  const [searchedThreads, setSearchedThreads] = useState<ISearch[]>([]);
  const [searchedMessageIdIndex, setSearchedMessageIdIndex] = useState<
    number | null
  >(null);

  const pageRef = useRef(0);
  const isEndRef = useRef(false);
  const pageMsgRef = useRef(0);
  const isEndMsgRef = useRef(false);
  const currentRollRef = useRef('USER');
  const isFirstAnswer = useRef(true);
  const editIdxRef = useRef(-1);
  const isNewChatRef = useRef(true);

  const initProject = () => {
    setThreads([]);
    setIsLoading(false);
    setIsError(false);
    setIsMsgLoading(false);
    setIsMsgError(false);
    setIsFirstMsgLoading(0);
    setSelectedThreadId(-1);
    setMessages([]);
    setSort('desc');
    setSearchedThreads([]);
    setSearchedMessageIdIndex(null);
    pageRef.current = 0;
    isEndRef.current = false;
    pageMsgRef.current = 0;
    isEndMsgRef.current = false;
    currentRollRef.current = 'USER';
    isFirstAnswer.current = true;
    editIdxRef.current = -1;
    isNewChatRef.current = true;
  };

  // 쓰레드 무한 스크롤
  const getInfiniteThreads = async () => {
    if (isEndRef.current) return;

    setIsLoading(true);
    try {
      const response = await ThreadAPI.getThreadList(pageRef.current, sort);
      if (response.length === 0) {
        isEndRef.current = true;
        return;
      }

      pageRef.current = pageRef.current + 1;
      setThreads((prev) => {
        const mergedThreads = [...prev, ...response];
        const uniqueThreads = Array.from(
          new Map(mergedThreads.map((thread) => [thread.id, thread])).values()
        );
        return uniqueThreads;
      });
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 쓰레드 새로고침
  const resetThread = (sortType: SortType = 'desc') => {
    pageRef.current = 0;
    isEndRef.current = false;
    setThreads([]);
    setIsLoading(false);
    setIsError(false);
    setSort(sortType);
  };

  const initChatting = () => {
    setSelectedThreadId(-1);
    setMessages([]);
    isNewChatRef.current = true;
    pageMsgRef.current = 0;
    isEndMsgRef.current = false;
    setIsFirstMsgLoading(0);
    setIsMsgError(false);
    setIsMsgLoading(false);
    isNewChatRef.current = true;
  };

  useUpdateEffect(() => {
    getInfiniteThreads();
  }, [sort]);

  useEffect(() => {
    setCurrentThreadId(selectedThreadId);
  }, [selectedThreadId]);
  // 쓰레드 삭제
  const deleteThread = async (id: number) => {
    try {
      await ThreadAPI.deleteThreadBySoft(id);
      const newThreads = threads.filter((th) => th.id !== id);
      setThreads(newThreads);
      if (id === selectedThreadId) {
        // 삭제한 스레드가 현재 채팅방이라면
        initChatting();
      }
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  // 쓰레드 선택 및 메시지 설정
  const openThread = async (id: number) => {
    try {
      setSelectedThreadId(id); // 쓰레드 id 변경
      setMessages([]);
      setSearchedThreads([]);
      pageMsgRef.current = 0;
      isEndMsgRef.current = false;
      setIsFirstMsgLoading(0);
      setIsMsgError(false);
      setIsMsgLoading(false);
      isNewChatRef.current = false;
    } catch (error) {
      console.error(error);
    }
  };

  const searchMessage = (messageIdIndex: number | null) => {
    setSearchedMessageIdIndex(messageIdIndex);
  };

  const calculateSizeAndPage = (index: number, defaultSize = 20) => {
    const size = Math.ceil((index + 1) / defaultSize) * defaultSize;

    const page = Math.ceil(index / defaultSize);

    return { size, page };
  };

  // 메시지 무한 스크롤
  const getInfiniteMessages = async () => {
    if (isEndMsgRef.current) return;

    setIsMsgLoading(true);
    try {
      let nextPage;
      let size;

      if (searchedMessageIdIndex !== null) {
        const calculatedValues = calculateSizeAndPage(searchedMessageIdIndex);
        nextPage = calculatedValues.page;
        size = calculatedValues.size + '';
      }

      const response = await ThreadAPI.getMessages(
        selectedThreadId,
        pageMsgRef.current,
        size ? size : undefined
      );

      if (response.length === 0 || isNewChatRef.current) {
        isEndMsgRef.current = true;
        return;
      }

      setIsFirstMsgLoading((prev) => prev + 1);
      pageMsgRef.current =
        nextPage !== undefined ? nextPage : pageMsgRef.current + 1;

      setMessages((prev) => {
        const mergedMessages = [...prev, ...response];
        const uniqueMessages = Array.from(
          new Map(mergedMessages.map((msg) => [msg.id, msg])).values()
        );
        return uniqueMessages;
      });
    } catch (error) {
      setIsMsgError(true);
      console.error(error);
    } finally {
      setIsMsgLoading(false);
    }
  };

  // 메시지 전송
  const sendMessage = async (message: string) => {
    try {
      console.log('전송할 메시지:', message);

      if (selectedThreadId === -1) {
        console.log('스레드가 선택되지 않음, 새 스레드 생성 중...');
        // 1. 쓰레드 생성
        const response = await ThreadAPI.createThread();
        console.log('새 스레드 생성 완료:', response.id);

        // 2. 현재 스레드 변경
        setSelectedThreadId(response.id);
        console.log('현재 스레드 ID 설정:', response.id);

        // 3. 메시지 보내기
        listenToMessegeSSE(response.id, message, response);
        console.log('메시지 전송 완료:', message);

        if (sort === 'asc') {
          resetThread('desc');
          isFirstAnswer.current = false;
          console.log('스레드 정렬 변경: desc');
        }
      } else {
        console.log('기존 스레드에 메시지 전송:', selectedThreadId);
        isNewChatRef.current = false;
        // 메시지 보내기
        listenToMessegeSSE(selectedThreadId, message);
        console.log('메시지 전송 완료:', message);
      }
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error);
    }
  };

  // 메시지 sse로 받기
  const listenToMessegeSSE = async (
    threadId: number,
    message: string,
    ...thread: IThread[]
  ) => {
    const eventSource = await ThreadAPI.sendMessage(threadId, message);
    eventSource.onmessage = (event) => {
      const data = event.data.trim();
      const { content, messageId, role } = JSON.parse(data);
      const msgData = {
        id: messageId,
        content: content,
        role: role,
        isBookmarked: false,
        createdAt: '',
        updatedAt: '',
      };
      // 1. 내 질문은 바로 반영
      if (role === 'USER') {
        setMessages((prev) => [msgData, ...prev]);
        currentRollRef.current = 'USER';
      } else {
        // 2. 답변인데 첫 번째 답변이면
        if (currentRollRef.current !== role) {
          setMessages((prev) => [msgData, ...prev]);
          currentRollRef.current = 'ASSISTANT';
        } else {
          // 3. 그 다음 답변부터 업데이트
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === 0 ? { ...msg, content: msg.content + content } : msg
            )
          );
        }
      }
    };

    eventSource.onerror = () => {
      if (isNewChatRef.current) {
        // 4. 자동 이름 변경
        listenToThreadSSE(thread[0]);
        isNewChatRef.current = false;
      }
      eventSource.close();
    };
  };

  // 스레드 sse로 받기
  const listenToThreadSSE = async (thread: IThread) => {
    const eventSource = await ThreadAPI.editNameByAuto(thread.id);
    eventSource.onmessage = (event) => {
      const data = event.data.trim();
      const parsedData = JSON.parse(data);

      if (isFirstAnswer.current) {
        setThreads((prev) => [
          { ...thread, chatName: parsedData.content },
          ...prev,
        ]);
        isFirstAnswer.current = false;
      } else {
        setThreads((prev) =>
          prev.map((t) =>
            t.id === thread.id
              ? t.chatName === 'New chat'
                ? { ...t, chatName: parsedData.content }
                : { ...t, chatName: t.chatName + parsedData.content }
              : t
          )
        );
      }
    };

    eventSource.onerror = () => {
      isFirstAnswer.current = true;
      eventSource.close();
    };
  };

  // 메시지 수정 (sse)
  const editMessage = async (
    threadId: number,
    messageId: number,
    message: string
  ) => {
    try {
      const eventSource = await ThreadAPI.editMessage(
        threadId,
        messageId,
        message
      );
      eventSource.onmessage = (event) => {
        const data = event.data.trim();
        const { content, messageId, role } = JSON.parse(data);

        // 1. 내 질문은 바로 반영
        if (role === 'USER') {
          setMessages((prev) =>
            prev
              .map((msg, i) => {
                if (msg.id === messageId) {
                  editIdxRef.current = i;
                  return { ...msg, content: message };
                } else return msg;
              })
              .map((msg, i) =>
                i === editIdxRef.current - 1 ? { ...msg, content: '' } : msg
              )
          );
        } else {
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === editIdxRef.current - 1
                ? { ...msg, id: messageId, content: msg.content + content }
                : msg
            )
          );
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
      };
    } catch (error) {
      console.error(error);
    }
  };

  // 메시지 평가
  const rateMessage = async (
    threadId: number,
    messageId: number,
    rating: 'GOOD' | 'BAD'
  ) => {
    try {
      await ThreadAPI.rateMessage(threadId, messageId, rating);
    } catch (error) {
      console.error(error);
    }
  };

  // 메시지 수정 (sse)
  const refreshAnswer = async (
    threadId: number,
    messageId: number, // 질문의 인덱스
    message: string
  ) => {
    try {
      const eventSource = await ThreadAPI.editMessage(
        threadId,
        messageId,
        message
      );
      eventSource.onmessage = (event) => {
        const data = event.data.trim();
        const { content, messageId, role } = JSON.parse(data);

        // 1. 내 질문은 바로 반영
        if (role === 'USER') {
          setMessages((prev) => {
            editIdxRef.current = prev.findIndex((msg) => msg.id === messageId);
            return prev.map(
              (msg, i) =>
                i === editIdxRef.current - 1 ? { ...msg, content: '' } : msg // 응답은 ''로 변경
            );
          });
        }
        if (role === 'ASSISTANT') {
          setMessages((prev) =>
            prev.map((msg, i) =>
              i === editIdxRef.current - 1
                ? { ...msg, id: messageId, content: msg.content + content }
                : msg
            )
          );
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
      };
    } catch (error) {
      console.error(error);
    }
  };

  const getSearchedThreads = async (query: string) => {
    try {
      const response = await ThreadAPI.getSearchedThreadList(query);
      const searchedData = response.map((msg: ISearch) =>
        msg.messageId === null
          ? { ...msg, matchHighlight: '검색 결과가 쓰레드 제목과 일치합니다.' }
          : msg
      );
      setSearchedThreads(searchedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThreadContext.Provider
      value={{
        threads,
        isLoading,
        isError,
        isMsgLoading,
        isMsgError,
        isFirstMsgLoading,
        selectedThreadId,
        messages,
        sort,
        searchedThreads,
        searchedMessageIdIndex,
        getInfiniteThreads,
        resetThread,
        deleteThread,
        editThreadName,
        openThread,
        sendMessage,
        editMessage,
        refreshAnswer,
        rateMessage,
        initChatting,
        getSearchedThreads,
        getInfiniteMessages,
        searchMessage,
        initProject,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
}
