export const TOKEN = 'token';

export const getAccessToken = (): string | null => {
  let accessToken = localStorage.getItem(TOKEN);

  if (!accessToken) {
    accessToken = sessionStorage.getItem(TOKEN);
  }
  return accessToken;
};

export const setAccessToken = (accessToken: string, isLocal: boolean) => {
  if (isLocal) localStorage.setItem(TOKEN, accessToken);
  else sessionStorage.setItem(TOKEN, accessToken);
};

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN);
  sessionStorage.removeItem(TOKEN);
};

export const getIsSidebarOpen = (): boolean => {
  const isSidebarOpen = sessionStorage.getItem('isSidebarOpen');
  return JSON.parse(isSidebarOpen as string);
};

export const setIsSidebarOpen = (isSidebarOpen: boolean) => {
  sessionStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
};

export const removeIsSidebarOpen = () => {
  sessionStorage.removeItem('isSidebarOpen');
};

export const getCurrentThreadId = (): number => {
  const currentThreadId = sessionStorage.getItem('currentThreadId');
  return JSON.parse(currentThreadId as string);
};

export const setCurrentThreadId = (currentThreadId: number) => {
  sessionStorage.setItem('currentThreadId', JSON.stringify(currentThreadId));
};

export const removeCurrentThreadId = () => {
  sessionStorage.removeItem('currentThreadId');
};

export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};
