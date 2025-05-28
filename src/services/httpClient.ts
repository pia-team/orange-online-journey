import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import keycloak from '../keycloak';

// Base API URL
const BASE_URL = 'https://quote-api.dnextdev-orange.com/api';

// Create axios instance with default config
const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to add auth token
httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Check if token exists and is valid
    if (keycloak.token) {
      // Check if token is about to expire (less than 30 seconds)
      const tokenExpiryTime = keycloak.tokenParsed?.exp as number * 1000;
      const currentTime = new Date().getTime();
      const timeLeft = tokenExpiryTime - currentTime;
      
      // If token will expire in less than 30 seconds, refresh it
      if (timeLeft < 30000) {
        try {
          const refreshed = await keycloak.updateToken(30);
          if (refreshed) {
            console.log('Token refreshed');
          }
        } catch (error: unknown) {
          console.error('Failed to refresh token', error);
          // Redirect to login if token refresh fails
          keycloak.login();
        }
      }
      
      // Add token to request headers
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    // Handle 401 Unauthorized errors
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Unauthorized request, redirecting to login');
      keycloak.login();
    }
    return Promise.reject(error);
  }
);

// Helper function to create get request with proper types
export const get = <T>(url: string, config?: AxiosRequestConfig) => {
  return httpClient.get<T>(url, config);
};

// Helper function to create post request with proper types
export const post = <T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig) => {
  return httpClient.post<T>(url, data, config);
};

// Helper function to create put request with proper types
export const put = <T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig) => {
  return httpClient.put<T>(url, data, config);
};

// Helper function to create delete request with proper types
export const del = <T>(url: string, config?: AxiosRequestConfig) => {
  return httpClient.delete<T>(url, config);
};

export default httpClient;
