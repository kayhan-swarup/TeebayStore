import { Product, ProductCategory, RentOption, User } from '../types';

const SAMPLE_SELLER: User = {
  id: 99,
  email: 'seller@example.com',
  first_name: 'Alice',
  last_name: 'Seller',
  address: '123 Market St, Teebay City',
  phone_number: '+1234567890',
};

export const DUMMY_PRODUCT: Product = {
  id: 1,
  title: 'Cordless Drill - 18V',
  description:
    'A lightweight 18V cordless drill with two batteries and a charger. Perfect for DIY and light professional use.',
  categories: [ProductCategory.ELECTRONICS, ProductCategory.HOME_APPLIANCES],
  purchase_price: 129.99,
  rent_price: 9.99,
  rent_option: RentOption.PER_DAY,
  image: 'https://placehold.co/600x400?text=Cordless+Drill',
  seller: SAMPLE_SELLER.id,
  seller_details: SAMPLE_SELLER,
  created_date: '2025-10-29T12:00:00Z',
  views: 123,
};

export const DUMMY_PRODUCTS: Product[] = [DUMMY_PRODUCT];

export default DUMMY_PRODUCTS;
