import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import keycloak from '../keycloak';
import { env } from '../config/env';


const httpClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});


httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {

    if (keycloak.token) {

      const tokenExpiryTime = keycloak.tokenParsed?.exp as number * 1000;
      const currentTime = new Date().getTime();
      const timeLeft = tokenExpiryTime - currentTime;
      

      if (timeLeft < 30000) {
        try {
          await keycloak.updateToken(30);
        } catch (error: unknown) {
          console.error('Failed to refresh token', error);

          keycloak.login();
        }
      }
      

      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);


httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {

    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Unauthorized request, redirecting to login');
      keycloak.login();
    }
    return Promise.reject(error);
  }
);


export const get = <T>(url: string, config?: AxiosRequestConfig) => {

  const configWithDefaults = { ...config };
  
  return httpClient.get<T>(url, configWithDefaults);
};


export const post = <T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig) => {

  const configWithDefaults = { ...config };
  
  return httpClient.post<T>(url, data, configWithDefaults);
};


export const put = <T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig) => {

  const configWithDefaults = { ...config };
  
  return httpClient.put<T>(url, data, configWithDefaults);
};


export const del = <T>(url: string, config?: AxiosRequestConfig) => {

  const configWithDefaults = { ...config };
  
  return httpClient.delete<T>(url, configWithDefaults);
};

export default httpClient;
