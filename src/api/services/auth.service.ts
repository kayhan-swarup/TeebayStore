import { API_ENDPOINTS } from '../../constants';
import { LoginRequest, User } from '../../types';
import apiClient from '../client';

export interface LoginResponse {
  user: User;
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
    );
    return { user: response.data.user };
  },
};
