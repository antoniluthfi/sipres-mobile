import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import Config from '../config/env.json';

const useAxios = () => {
  const {logout} = useAuth();

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
        logout();
      }
      return Promise.reject(error.response.data);
    },
  );

  return api;
};

export default useAxios;
