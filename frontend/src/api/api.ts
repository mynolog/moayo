import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 5000,
  withCredentials: true,
});

let isRedirecting = false;

api.interceptors.request.use(
  async (config) => {
    if (!isRedirecting && !config.url?.includes('/sign-up') && !config.url?.includes('/sign-in')) {
      isRedirecting = true; // 리디렉션 중에는 다른 요청을 보내지 않도록 설정
      try {
        const checkResponse = await api.get('/auth/check');

        if (checkResponse.status !== 200) {
          window.location.replace('/sign-in'); // 리디렉션 수행
          localStorage.removeItem('auth');
          return Promise.reject('인증되지 않은 사용자입니다. 다시 로그인해주세요.');
        }
        return config;
      } catch (error) {
        window.location.replace('/sign-in');
        localStorage.removeItem('auth');
        return Promise.reject('인증되지 않은 사용자입니다. 다시 로그인해주세요.');
      } finally {
        isRedirecting = false; // 리디렉션 후 상태 리셋
      }
    }
    return config;
  },
  (error) => {
    isRedirecting = false;
    return Promise.reject(error);
  },
);

export default api;
