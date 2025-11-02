import { create } from 'zustand';
import { Purchase, Rent } from '../types';
import { transactionsService } from '../api/services/transaction.service';
import { getErrorMessage } from '../api/client';
interface TransactionState {
  purchases: Purchase[];
  rentals: Rent[];
  myPurchases: Purchase[];
  myRentals: Rent[];
  soldItems: Purchase[];
  lentItems: Rent[];
  isLoading: boolean;
  error: string | null;

  createPurchase: (buyerId: number, productId: number) => Promise<Purchase>;
  createRental: (
    renterId: number,
    productId: number,
    rentOption: 'hour' | 'day',
    startDate: string,
    endDate: string,
  ) => Promise<Rent>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  purchases: [],
  rentals: [],
  myPurchases: [],
  myRentals: [],
  soldItems: [],
  lentItems: [],
  isLoading: false,
  error: null,

  createPurchase: async (buyerId: number, productId: number) => {
    try {
      set({ isLoading: true, error: null });
      const purchase = await transactionsService.createPurchase({
        buyer: buyerId,
        product: productId,
      });

      // Add to myPurchases
      set(state => ({
        myPurchases: [purchase, ...state.myPurchases],
        isLoading: false,
      }));

      return purchase;
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },
  createRental: async (
    renterId: number,
    productId: number,
    rentOption: 'hour' | 'day',
    startDate: string,
    endDate: string,
  ) => {
    try {
      set({ isLoading: true, error: null });
      const rental = await transactionsService.createRental({
        renter: renterId,
        product: productId,
        rent_option: rentOption,
        rent_period_start_date: startDate,
        rent_period_end_date: endDate,
      });

      // Add to myRentals
      set(state => ({
        myRentals: [rental, ...state.myRentals],
        isLoading: false,
      }));

      return rental;
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },
}));
