import { create } from 'zustand';
import { Product, Purchase, Rent } from '../types';
import { transactionsService } from '../api/services/transaction.service';
import { getErrorMessage } from '../api/client';
import { productService } from '../api/services/product.service';
interface TransactionState {
  purchases: Purchase[];
  rentals: Rent[];
  myPurchases: Product[];
  myRentals: Product[];
  soldItems: Product[];
  lentItems: Product[];
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
  fetchAllTransactions: (userId: number) => Promise<void>;
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
        purchases: [purchase, ...state.purchases],
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
        rentals: [rental, ...state.rentals],
        isLoading: false,
      }));

      return rental;
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },
  fetchAllTransactions: async (userId: number) => {
    try {
      set({ isLoading: true, error: null });
      const purchases = await transactionsService.getPurchases();
      const rentals = await transactionsService.getRentals();
      console.log('Fetched purchases:', purchases);
      set({ purchases, rentals });
      const myPurchasedProducts: Product[] = [];
      const mySoldProducts: Product[] = [];
      for (const purchase of purchases) {
        if (purchase.buyer === userId) {
          const product = await productService.getProductById(
            purchase.product as number,
          );
          myPurchasedProducts.push(product);
        }
        if (purchase.seller === userId) {
          const product = await productService.getProductById(
            purchase.product as number,
          );
          mySoldProducts.push(product);
        }
      }
      const myRentedProducts: Product[] = [];
      const myLentProducts: Product[] = [];
      for (const rental of rentals) {
        if (rental.renter === userId) {
          const product = await productService.getProductById(
            rental.product as number,
          );
          myRentedProducts.push(product);
        }
        if (rental.seller === userId) {
          const product = await productService.getProductById(
            rental.product as number,
          );
          myLentProducts.push(product);
        }
      }

      set({
        myPurchases: myPurchasedProducts,
        soldItems: mySoldProducts,
        myRentals: myRentedProducts,
        lentItems: myLentProducts,
        isLoading: false,
      });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },
}));
