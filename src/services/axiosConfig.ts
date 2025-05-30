import axios from 'axios';
import keycloak from '../keycloak';


const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(
  (config) => {

    if (keycloak.token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.warn('Authentication error - ignoring refresh/redirect');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
