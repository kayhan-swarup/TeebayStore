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
  firebase_console_manager_token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
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
  categories: ProductCategory[];
  purchase_price: string;
  rent_price: string;
  rent_option: RentOption;
  image?: string;
  seller: number;
  seller_details?: User;
  date_posted: string;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  categories: ProductCategory[];
  purchase_price: number;
  rent_price: number;
  rent_option: RentOption;
  image?: any;
  seller: number;
}

// Transaction types
export interface Purchase {
  id: number;
  buyer: number;
  buyer_details?: User;
  product: number;
  product_details?: Product;
  date_purchased: string;
  seller?: number;
}

export interface Rent {
  id: number;
  renter: number;
  renter_details?: User;
  product: number;
  product_details?: Product;
  rent_from: string;
  rent_to: string;
  total_price: number;
  seller?: number;
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
