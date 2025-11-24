//axiosConfig.ts
//apiService.ts
//api.ts
// This file contains the API service functions for user registration and other API calls.

import axios, { AxiosError } from 'axios';
import { refreshTokens } from './auth';

const api = axios.create({
  baseURL: 'https://smart-blog-be-wine.vercel.app/api/v1', // Base URL for the backend API--'http://localhost:3000/api/v1'
  headers: {
    'Content-Type': 'application/json',
  },
});

const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register'];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  const isPublicEndpoint = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url));

  if (token && !isPublicEndpoint) {// Only add token for non-public endpoints
    config.headers.Authorization = `Bearer ${token}`;

    //config.url // api/v1/auth/me
  }
  return config;
});


api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err: AxiosError) => {
    const originalRequest: any = err.config; // Original request config

    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((url) => originalRequest.url?.includes(url));

    if(err.response?.status ===401 && !isPublicEndpoint && !originalRequest._retry){
      originalRequest._retry = true;// Mark the request to avoid infinite loop
      try{
        const refreshToken = localStorage.getItem('refreshToken');
        if(!refreshToken){
          throw new Error('No refresh token available');
        }
        const res = await refreshTokens(refreshToken!);
        localStorage.setItem('accessToken', res.accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
        return axios(originalRequest);
      }

      catch (err){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Redirect to login on failure

        console.error('Token refresh failed:', err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
)



//api.interceptors.response.use()

export default api;

