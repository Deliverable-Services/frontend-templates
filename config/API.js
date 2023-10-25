/* eslint-disable no-undef */
import axios from 'axios';

import { LOCALSTORAGE_AUTH_KEY } from './constants';

const API = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (apiConfig) => {
      const auth = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_AUTH_KEY)
      )?.token;
      const accessToken = auth?.accessToken;

      if (accessToken) {
        apiConfig.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return apiConfig;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
        window.location.assign('/');
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export default API();
