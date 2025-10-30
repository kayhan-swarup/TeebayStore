import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient, { storage } from '../api/client';
import { LoginRequest, RegisterRequest, User } from '../types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { API_ENDPOINTS } from '../constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: LoginRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.post<{ user: User }>(
            API_ENDPOINTS.AUTH.LOGIN,
            data,
          );
          set({ user: response.data.user, isAuthenticated: true });
        } catch (error) {
          set({ error: 'Login failed. Please try again.', isLoading: false });
        }
      },

      register: async (data: RegisterRequest) => {},

      logout: async () => {},

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
