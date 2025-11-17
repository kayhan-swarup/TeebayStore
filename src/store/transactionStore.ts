import { create } from 'zustand';
import { Product, Purchase, Rent, RentalProduct } from '../types';
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
  selectedPurchase: Purchase | null;
  borrowed: RentalProduct[];
  lent: RentalProduct[];

  createPurchase: (buyerId: number, productId: number) => Promise<Purchase>;
  createRental: (
    renterId: number,
    productId: number,
    rentOption: 'hour' | 'day',
    startDate: string,
    endDate: string,
  ) => Promise<Rent>;
  fetchAllTransactions: (userId: number) => Promise<void>;
  getPurchaseByProductId: (productId: number) => Promise<void>;
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
  selectedPurchase: null,
  borrowed: [],
  lent: [],

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
      const seenPurchaseIds = new Set<number>();
      const seenSoldIds = new Set<number>();
      for (const purchase of purchases) {
        console.log('purchase:', purchase);
        if (purchase.buyer === userId) {
          const productId = purchase.product as number;
          if (!seenPurchaseIds.has(productId)) {
            const product = await productService.getProductById(productId);
            myPurchasedProducts.push(product);
            seenPurchaseIds.add(productId);
          }
        }
        if (purchase.seller === userId) {
          const productId = purchase.product as number;
          if (!seenSoldIds.has(productId)) {
            const product = await productService.getProductById(productId);
            mySoldProducts.push(product);
            seenSoldIds.add(productId);
          }
        }
      }
      const seenRentedIds = new Set<number>();
      const seenLentIds = new Set<number>();

      const myRentedProducts: Product[] = [];
      const borrowed: RentalProduct[] = [];
      const lent: RentalProduct[] = [];
      const myLentProducts: Product[] = [];
      for (const rental of rentals) {
        if (rental.renter === userId) {
          const productId = rental.product as number;
          const product = await productService.getProductById(productId);
          myRentedProducts.push(product);
          borrowed.push({ product, rent: rental });
          // if (!seenRentedIds.has(productId)) {
          //   const product = await productService.getProductById(productId);
          //   myRentedProducts.push(product);
          //   seenRentedIds.add(productId);
          // }
        }
        if (rental.seller === userId) {
          const productId = rental.product as number;
          const product = await productService.getProductById(productId);
          myLentProducts.push(product);
          lent.push({ product, rent: rental });
          // if (!seenLentIds.has(productId)) {
          //   const product = await productService.getProductById(productId);
          //   myLentProducts.push(product);
          //   seenLentIds.add(productId);
          // }
        }
      }

      set({
        myPurchases: myPurchasedProducts,
        soldItems: mySoldProducts,
        myRentals: myRentedProducts,
        lentItems: myLentProducts,
        isLoading: false,
        borrowed,
        lent,
      });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },
  getPurchaseByProductId: async (productId: number) => {
    try {
      set({ isLoading: true, error: null });
      const purchases = await transactionsService.getPurchases();
      const purchase = purchases.find(p => p.product === productId) || null;
      set({ isLoading: false, selectedPurchase: purchase });
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
        selectedPurchase: null,
      });
    }
  },
}));
