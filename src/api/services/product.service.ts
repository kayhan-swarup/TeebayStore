import { API_ENDPOINTS } from '../../constants';
import { Product } from '../../types';
import apiClient from '../client';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(
      API_ENDPOINTS.PRODUCTS.LIST,
    );
    return response.data;
  },
};
