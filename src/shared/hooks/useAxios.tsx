/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import Config from '../config/env.json';
import DeviceInfo from 'react-native-device-info';
import useAuthStore from '../data-store/useAuthStore';
import {useEffect, useState} from 'react';

const useAxios = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      const uniqueId = await DeviceInfo.getUniqueId();

      setDeviceId(uniqueId);
    };

    fetchDeviceId();

    return () => {
      setDeviceId('');
    };
  }, []);

  const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'x-device-id': deviceId,
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
