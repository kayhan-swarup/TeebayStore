import { API_BASE_URL, API_CONFIG, STORAGE_KEYS } from '../constants';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Response Interceptor
 * Handles responses and errors globally
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in dev mode
    if (__DEV__) {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${
          response.config.url
        } - Status: ${response.status}`,
      );
    }

    return response;
  },
  async (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (__DEV__) {
        console.error(
          `[API Error Response] Status: ${status}`,
          JSON.stringify(data, null, 2),
        );
      }

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          //Todo clear auth from storage
          // Note: Navigation will be handled by the auth store
          break;

        case 403:
          // Forbidden
          console.error('[API] Forbidden access');
          break;

        case 404:
          // Not found
          console.error('[API] Resource not found');
          break;

        case 500:
        case 502:
        case 503:
          // Server errors
          console.error('[API] Server error');
          break;

        default:
          console.error(`[API] Error status: ${status}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API] No response received:', error.message);
    } else {
      // Something else happened
      console.error('[API] Request setup error:', error.message);
    }

    return Promise.reject(error);
  },
);

export const storage = {
  async setUser(user: any): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  async getUser(): Promise<any | null> {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  },
  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  },
  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([STORAGE_KEYS.USER]);
  },
};
export default apiClient;
