// Regex patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,15}$/,
  // Allow letters, numbers, spaces, and common punctuation
  PRODUCT_TITLE: /^[a-zA-Z0-9\s\-_.,!]+$/,
};

// Validation rules
export const VALIDATION_RULES = {
  // Password
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,

  // Product title
  MIN_PRODUCT_TITLE_LENGTH: 3,
  MAX_PRODUCT_TITLE_LENGTH: 100,

  // Product description
  MIN_PRODUCT_DESCRIPTION_LENGTH: 10,
  MAX_PRODUCT_DESCRIPTION_LENGTH: 1000,

  // Name fields
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,

  // Address
  MIN_ADDRESS_LENGTH: 5,
  MAX_ADDRESS_LENGTH: 200,

  // Price
  MIN_PRICE: 0,
  MAX_PRICE: 1000000,

  // Categories
  MIN_CATEGORIES: 1,
  MAX_CATEGORIES: 6,

  // Image
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
};

// Error messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number (10-15 digits)',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  TITLE_TOO_SHORT: `Title must be at least ${VALIDATION_RULES.MIN_PRODUCT_TITLE_LENGTH} characters`,
  TITLE_TOO_LONG: `Title cannot exceed ${VALIDATION_RULES.MAX_PRODUCT_TITLE_LENGTH} characters`,
  DESCRIPTION_TOO_SHORT: `Description must be at least ${VALIDATION_RULES.MIN_PRODUCT_DESCRIPTION_LENGTH} characters`,
  DESCRIPTION_TOO_LONG: `Description cannot exceed ${VALIDATION_RULES.MAX_PRODUCT_DESCRIPTION_LENGTH} characters`,
  PRICE_REQUIRED: 'Please enter at least one price (purchase or rent)',
  INVALID_PRICE: 'Please enter a valid price',
  CATEGORY_REQUIRED: 'Please select at least one category',
  IMAGE_TOO_LARGE: 'Image size must be less than 5MB',
  INVALID_IMAGE_TYPE: 'Only JPG and PNG images are allowed',
  INVALID_DATE_RANGE: 'End date must be after start date',
  DATE_IN_PAST: 'Date cannot be in the past',
};
