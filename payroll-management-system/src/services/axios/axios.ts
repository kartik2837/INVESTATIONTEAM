import cookiesStorage from '@/utils/cookiesStorage'
import axios, { AxiosError } from 'axios'

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Adjust this to your backend URL
    timeout: 5000, // Set request timeout (in milliseconds)
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to attach authorization headers
api.interceptors.request.use(
    (config) => {
        // Example: add an authorization token if it's stored in local storage or a cookie
        const token =
            localStorage.getItem('authToken') ||
            sessionStorage.getItem('token') ||
            cookiesStorage.getItem('token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

// Response interceptor to handle responses and errors
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      const authStore = useAuthStore.getState();
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          // Attempt to refresh the token
          const refreshToken = authStore.refreshToken;
          const refreshResponse = await axios.post(`${endpointConfig.apiBaseUrl}/auth/refresh`, {
            token: refreshToken,
          });
  
          // Update tokens in the store
          authStore.setToken(refreshResponse.data.accessToken);
          authStore.setRefreshToken(refreshResponse.data.refreshToken);
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // If refreshing the token fails, log out the user
          authStore.logout();
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api
