import * as Yup from 'yup';
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
    .of(Yup.string())
    .min(1, 'Please select at least one category')
    .required('Categories are required'),

  // Step 3: Description
  description: Yup.string()
    .trim()
    .required('Product description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),

  // Step 4: Image
  product_image: Yup.mixed().required('Product image is required').nullable(),

  // Step 5: Price
  purchase_price: Yup.number()
    .typeError('Must be a valid number')
    .min(0, 'Purchase price must be at least 0')
    .required('Purchase price is required'),

  rent_price: Yup.number()
    .typeError('Must be a valid number')
    .min(0, 'Rent price must be at least 0')
    .required('Rent price is required')
    .test(
      'at-least-one-price',
      'Please set either a purchase price or rent price',
      function (value) {
        const { purchase_price } = this.parent;
        return purchase_price > 0 || value > 0;
      },
    ),

  rent_option: Yup.string()
    .oneOf(['hour', 'day'], 'Invalid rent option')
    .required('Rent option is required'),
});
