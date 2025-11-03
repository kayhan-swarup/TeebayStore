import { API_ENDPOINTS } from '../../constants';
import { LoginRequest, RegisterRequest, User } from '../../types';
import apiClient from '../client';

export interface LoginResponse {
  user: User;
}
export interface RegisterResponse {
  user: User;
  token?: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
    );
    return { user: response.data.user };
  },
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<any>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );
    // Backend might return {message: "...", user: {...}} or just user
    // Extract just the user object
    return { user: response.data.user || response.data };
  },
};
