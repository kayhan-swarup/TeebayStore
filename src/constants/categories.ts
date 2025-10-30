// Product categories (from the pdf requirements)
export const PRODUCT_CATEGORIES = [
  { label: 'Electronics', value: 'ELECTRONICS' },
  { label: 'Furniture', value: 'FURNITURE' },
  { label: 'Home Appliances', value: 'HOME_APPLIANCES' },
  { label: 'Sporting Goods', value: 'SPORTING_GOODS' },
  { label: 'Outdoor', value: 'OUTDOOR' },
  { label: 'Toys', value: 'TOYS' },
];

// Rent options
export const RENT_OPTIONS = [
  { label: 'Per Hour', value: 'PER_HOUR' },
  { label: 'Per Day', value: 'PER_DAY' },
];

// Category enum for type safety
export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  FURNITURE = 'FURNITURE',
  HOME_APPLIANCES = 'HOME_APPLIANCES',
  SPORTING_GOODS = 'SPORTING_GOODS',
  OUTDOOR = 'OUTDOOR',
  TOYS = 'TOYS',
}

// Rent option enum
export enum RentOption {
  PER_HOUR = 'PER_HOUR',
  PER_DAY = 'PER_DAY',
}
export type Category =
  | 'electronics'
  | 'furniture'
  | 'home_appliances'
  | 'sporting_goods'
  | 'outdoor'
  | 'toys';

export const CATEGORIES: Array<{ value: Category; label: string }> = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'home_appliances', label: 'Home Appliances' },
  { value: 'sporting_goods', label: 'Sporting Goods' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'toys', label: 'Toys' },
];
