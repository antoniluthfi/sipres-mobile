import axios from 'axios';
import Config from '../config/env.json';
import useAuthStore from '../data-store/useAuthStore';

const useAxios = () => {
  const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  // Interceptor untuk request
  api.interceptors.request.use(
    config => {
      return config;
    },
    error => Promise.reject(error),
  );

  // Interceptor untuk response
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        // Token kadaluwarsa
        try {
          await api.get('/auth/refresh-token');
        } catch (error) {
          useAuthStore.getState().setRefreshTokenValid(false);
        }
      }
      return Promise.reject(
        error?.response?.data || {
          error: 'Internal server error',
        },
      );
    },
  );

  return api;
};

export default useAxios;
