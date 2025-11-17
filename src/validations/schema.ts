import * as Yup from 'yup';
import { Category } from '../constants';
export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),

  lastName: Yup.string()
    .trim()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),

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
