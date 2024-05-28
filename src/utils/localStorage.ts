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
