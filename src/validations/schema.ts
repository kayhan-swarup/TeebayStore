import * as Yup from 'yup';
import { Category } from '../constants';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Email is invalid'),

  password: Yup.string()
    .required('Password is required'),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),

  lastName: Yup.string()
    .trim()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters'),

  address: Yup.string()
    .trim()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),

  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Email is invalid'),

  phoneNumber: Yup.string()
    .trim()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Phone number is invalid'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export const addProductSchema = Yup.object().shape({
  // Step 1: Title
  title: Yup.string()
    .trim()
    .required('Product title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),

  // Step 2: Categories
  categories: Yup.array()
    .of(
      Yup.string()
        .oneOf([
          'electronics',
          'furniture',
          'home_appliances',
          'sporting_goods',
          'outdoor',
          'toys',
        ] as const)
        .required(),
    )
    .min(1, 'Please select at least one category')
    .required('Categories are required')
    .default([]),

  // Step 3: Description
  description: Yup.string()
    .trim()
    .required('Product description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 200 characters'),

  // Step 4: Image
  product_image: Yup.mixed()
    .required('Product image is required')
    .test('is-valid', 'Product image is required', value => {
      return value !== null && value !== undefined;
    }),

  // Step 5: Price (strings from TextInput)
  purchase_price: Yup.string()
    .required('Purchase price is required')
    .matches(/^\d+\.?\d*$/, 'Must be a valid number')
    .test('min-value', 'Purchase price must be at least 0', value => {
      if (!value) return false;
      return parseFloat(value) >= 0;
    }),

  rent_price: Yup.string()
    .required('Rent price is required')
    .matches(/^\d+\.?\d*$/, 'Must be a valid number')
    .test('min-value', 'Rent price must be at least 0', value => {
      if (!value) return false;
      return parseFloat(value) >= 0;
    })
    .test(
      'at-least-one-price',
      'Please set either a purchase price or rent price',
      function (value) {
        const { purchase_price } = this.parent;
        const purchaseNum = purchase_price ? parseFloat(purchase_price) : 0;
        const rentNum = value ? parseFloat(value) : 0;
        return purchaseNum > 0 || rentNum > 0;
      },
    ),

  rent_option: Yup.string()
    .oneOf(['hour', 'day'], 'Invalid rent option')
    .required('Rent option is required'),
});

// Export inferred type from schema
export type AddProductFormData = Yup.InferType<typeof addProductSchema>;
