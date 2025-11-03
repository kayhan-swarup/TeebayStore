import { API_ENDPOINTS } from '../../constants';
import { Purchase, Rent } from '../../types';
import apiClient from '../client';

export interface CreatePurchaseData {
  buyer: number;
  product: number;
}

export interface CreateRentData {
  renter: number;
  product: number;
  rent_option: 'hour' | 'day';
  rent_period_start_date: string; // ISO format
  rent_period_end_date: string; // ISO format
}

export const transactionsService = {
  async createPurchase(data: CreatePurchaseData): Promise<Purchase> {
    const response = await apiClient.post<Purchase>(
      API_ENDPOINTS.TRANSACTIONS.PURCHASES.CREATE,
      data,
    );
    return response.data;
  },
  async createRental(data: CreateRentData): Promise<Rent> {
    const response = await apiClient.post<Rent>(
      API_ENDPOINTS.TRANSACTIONS.RENTALS.CREATE,
      data,
    );
    return response.data;
  },
  async getPurchases(): Promise<Purchase[]> {
    const response = await apiClient.get<Purchase[]>(
      API_ENDPOINTS.TRANSACTIONS.PURCHASES.LIST,
    );
    return response.data;
  },
  async getRentals(): Promise<Rent[]> {
    const response = await apiClient.get<Rent[]>(
      API_ENDPOINTS.TRANSACTIONS.RENTALS.LIST,
    );
    return response.data;
  },
};
