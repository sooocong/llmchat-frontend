export const TOKEN = 'accessToken';

export const getAccessToken = (): string | null => {
  const accessToken = localStorage.getItem(TOKEN);
  return accessToken;
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(TOKEN, accessToken);
};

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN);
};

export const getIsSidebarOpen = (): boolean => {
  const isSidebarOpen = localStorage.getItem('isSidebarOpen');
  return JSON.parse(isSidebarOpen as string);
};

export const setIsSidebarOpen = (isSidebarOpen: boolean) => {
  localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
};

export const removeIsSidebarOpen = () => {
  localStorage.removeItem('isSidebarOpen');
};
