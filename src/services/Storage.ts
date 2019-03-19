export const getAccessToken = () => {
  return localStorage.getItem('token');
};

export const setAccessToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const clearAccessToken = () => {
  localStorage.removeItem('token');
};
