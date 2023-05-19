import axios, { InternalAxiosRequestConfig } from 'axios';
import { environment } from '../app/environment';

const AxiosRequestInterceptor = (
  request: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('access-token');

  if (request.headers.Authorization !== undefined || token === undefined) {
    return request;
  }

  request.headers.Authorization = `Bearer ${token}`;

  return request;
};

export const httpClient = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
});

httpClient.interceptors.request.use(AxiosRequestInterceptor);
