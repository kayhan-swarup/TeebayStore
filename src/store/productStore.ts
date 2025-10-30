import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { API_ENDPOINTS } from '../constants';
import { CreateProductRequest, Product } from '../types';
import { productService } from '../api/services/product.service';
import { getErrorMessage } from '../api/client';

interface ProductState {
  products: Product[];
  myProducts: Product[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProducts: () => Promise<void>;
  fetchMyProducts: (userId: number) => Promise<void>;
  createProduct: (data: CreateProductRequest) => Promise<Product>;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  myProducts: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const products = await productService.getAllProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products.', isLoading: false });
    }
  },
  fetchMyProducts: async (seller: number) => {
    set({ isLoading: true, error: null });
    const myProducts = (await productService.getAllProducts()).filter(
      item => item.seller === seller,
    );
    set({ myProducts, isLoading: false });
  },
  createProduct: async (data: CreateProductRequest) => {
    try {
      set({ isLoading: true, error: null });
      const newProduct = await productService.createProduct(data);

      // Add to myProducts list
      set(state => ({
        myProducts: [newProduct, ...state.myProducts],
        isLoading: false,
      }));

      return newProduct;
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
