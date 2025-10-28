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
