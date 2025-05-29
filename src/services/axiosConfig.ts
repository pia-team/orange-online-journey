import axios from 'axios';
import keycloak from '../keycloak';

// Axios instance'ı oluştur
const axiosInstance = axios.create();

// Request interceptor ile her isteğe token ekle
axiosInstance.interceptors.request.use(
  (config) => {
    // Keycloak token'ı varsa, Authorization header'ı ekle
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

// Response interceptor ile 401 hatalarını yönet ama sayfa yenileme yapma
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized hatasında keycloak.login() çağırmayı engelle
    // Bunun yerine sadece hata logla ve reddet
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.warn('Authentication error - ignoring refresh/redirect');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
