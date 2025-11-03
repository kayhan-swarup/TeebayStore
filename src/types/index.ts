import { Category } from '../constants';

// User types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  firebase_console_manager_token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  fcm_token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  firebase_console_manager_token?: string;
}

// Product types
export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  FURNITURE = 'FURNITURE',
  HOME_APPLIANCES = 'HOME_APPLIANCES',
  SPORTING_GOODS = 'SPORTING_GOODS',
  OUTDOOR = 'OUTDOOR',
  TOYS = 'TOYS',
}

export enum RentOption {
  PER_HOUR = 'PER_HOUR',
  PER_DAY = 'PER_DAY',
}

export interface Product {
  id: number;
  title: string;
  description: string;
  categories: Category[];
  purchase_price: string;
  rent_price: string;
  rent_option: 'hour' | 'day';
  product_image?: string;
  seller: number;
  seller_details?: User;
  date_posted: string;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  categories: Category[];
  purchase_price: number;
  rent_price: number;
  rent_option: 'hour' | 'day';
  product_image?: any;
  seller: number;
}

// Transaction types
export interface Purchase {
  id: number;
  buyer: number;
  seller: number;
  product: number | Product; // Can be populated or just ID
  purchase_date: string;
}

export interface Rent {
  id: number;
  renter: number;
  seller: number;
  product: number | Product; // Can be populated or just ID
  rent_period_start_date: string;
  rent_period_end_date: string;
  total_price: string | null;
  rent_date: string;
}

export interface CreatePurchaseRequest {
  buyer: number;
  product: number;
}

export interface CreateRentRequest {
  renter: number;
  product: number;
  rent_from: string;
  rent_to: string;
}

// Navigation types
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Browse: undefined;
  MyProducts: undefined;
  Transactions: undefined;
  Profile: undefined;
};

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: number };
  AddProduct: undefined;
  EditProduct: { productId: number };
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  ProductDetails: { productId: number };
  AddProduct: undefined;
  ProductDetail: { productId: number };
  EditProduct: { productId: number };
};

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
