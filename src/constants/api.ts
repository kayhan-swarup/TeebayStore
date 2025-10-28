const DEV_BASE_URL = 'http://10.0.2.2:8000'; // Android emulator localhost
const DEV_BASE_URL_IOS = 'http://localhost:8000'; // iOS simulator localhost

export const API_BASE_URL = __DEV__
  ? Platform.OS === 'android'
    ? DEV_BASE_URL
    : DEV_BASE_URL_IOS
  : 'https://api.teebay.com';

import { Platform } from 'react-native';

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/users/login/',
    REGISTER: '/api/users/register/',
    USERS: '/api/users/',
  },

  // Product endpoints
  PRODUCTS: {
    LIST: '/api/products/',
    DETAIL: (id: number) => `/api/products/${id}/`,
    CREATE: '/api/products/',
    UPDATE: (id: number) => `/api/products/${id}/`,
    DELETE: (id: number) => `/api/products/${id}/`,
    CATEGORIES: '/api/products/categories/',
  },

  // Transaction endpoints
  TRANSACTIONS: {
    PURCHASES: {
      LIST: '/api/transactions/purchases/',
      CREATE: '/api/transactions/purchases/',
      DETAIL: (id: number) => `/api/transactions/purchases/${id}/`,
      UPDATE: (id: number) => `/api/transactions/purchases/${id}/`,
      DELETE: (id: number) => `/api/transactions/purchases/${id}/`,
    },
    RENTALS: {
      LIST: '/api/transactions/rentals/',
      CREATE: '/api/transactions/rentals/',
      DETAIL: (id: number) => `/api/transactions/rentals/${id}/`,
      UPDATE: (id: number) => `/api/transactions/rentals/${id}/`,
      DELETE: (id: number) => `/api/transactions/rentals/${id}/`,
    },
  },
};

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

/**
 * Request Headers
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/**
 * Multipart form headers (for image uploads)
 */
export const MULTIPART_HEADERS = {
  'Content-Type': 'multipart/form-data',
  Accept: 'application/json',
};

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
