# Teebay Mobile App - Implementation Plan

## 📋 Overview

This document outlines the complete implementation strategy for the Teebay marketplace mobile application, covering all 4 parts of the requirements.

---

## 🎯 Core Requirements Summary

### Part 1: Authentication (Biometric Focus)

- User Registration
- Login with Biometric/FaceID authentication
- Traditional login fallback
- Simple string matching (no encryption)

### Part 2: Product Management (Multi-page Form)

- Add Product (multi-page form with back/forth navigation)react native
- Edit Product
- Delete Product
- Multi-select categories (6 options)
- Support for purchase and/or rent pricing

### Part 3: Marketplace & Transactions

- Browse all products (optimized for large datasets)
- Buy products
- Rent products (with date range)
- View transactions (bought/sold/borrowed/lent)
- FCM Push Notifications (Android)
- Deep linking to products

### Part 4: Documentation

- Technical documentation (Part_4_documentation.md)
- Architecture decisions
- Corner cases and solutions

---

## 🏗️ Architecture & Tech Stack

### Dependencies to Install

```json
{
  "core": [
    "@react-navigation/native",
    "@react-navigation/native-stack",
    "@react-navigation/bottom-tabs",
    "react-native-screens",
    "react-native-safe-area-context"
  ],
  "state": ["@react-redux/toolkit", "react-redux", "@reduxjs/toolkit"],
  "api": ["axios", "@react-native-async-storage/async-storage"],
  "forms": ["react-hook-form", "yup", "@hookform/resolvers"],
  "biometric": ["react-native-biometrics"],
  "firebase": [
    "@react-native-firebase/app",
    "@react-native-firebase/messaging"
  ],
  "ui": [
    "react-native-vector-icons",
    "react-native-modal",
    "react-native-paper"
  ],
  "performance": ["react-native-fast-image"],
  "date": ["react-native-calendars", "date-fns"],
  "image": ["react-native-image-picker"]
}
```

### File Structure Plan

```
Teebay/
├── src/
│   ├── types/
│   │   └── index.ts ✓ (Already created)
│   │
│   ├── constants/
│   │   ├── index.ts                  # App-wide constants
│   │   ├── api.ts                    # API endpoints
│   │   └── colors.ts                 # Theme colors
│   │
│   ├── services/
│   │   ├── api.ts                    # Axios configuration
│   │   ├── auth.service.ts           # Auth API calls
│   │   ├── product.service.ts        # Product API calls
│   │   ├── transaction.service.ts    # Transaction API calls
│   │   ├── biometric.service.ts      # Biometric auth
│   │   ├── notification.service.ts   # FCM handling
│   │   └── storage.service.ts        # AsyncStorage wrapper
│   │
│   ├── context/
│   │   └── AuthContext.tsx           # Auth state management
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                # Auth hook
│   │   ├── useProducts.ts            # Products hook
│   │   ├── useTransactions.ts        # Transactions hook
│   │   ├── useBiometric.ts           # Biometric hook
│   │   └── useNotifications.ts       # Notifications hook
│   │
│   ├── utils/
│   │   ├── validation.ts             # Form validation helpers
│   │   ├── formatters.ts             # Date/price formatters
│   │   ├── helpers.ts                # Generic helpers
│   │   └── errorHandler.ts           # Error handling
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   └── Header.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── FormInput.tsx         # Reusable form input
│   │   │   ├── FormCheckbox.tsx      # Checkbox for categories
│   │   │   ├── FormRadio.tsx         # Radio for rent options
│   │   │   ├── ImagePicker.tsx       # Image upload
│   │   │   └── FormNavigation.tsx    # Back/Next buttons
│   │   │
│   │   ├── products/
│   │   │   ├── ProductCard.tsx       # Product list item
│   │   │   ├── ProductList.tsx       # Optimized FlatList
│   │   │   ├── ProductDetails.tsx    # Product detail view
│   │   │   ├── CategorySelector.tsx  # Multi-select categories
│   │   │   └── PriceDisplay.tsx      # Price formatting
│   │   │
│   │   └── transactions/
│   │       ├── TransactionCard.tsx   # Transaction list item
│   │       ├── TransactionList.tsx   # Transaction listing
│   │       └── DateRangePicker.tsx   # Rent date picker
│   │
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   │
│   │   ├── products/
│   │   │   ├── BrowseScreen.tsx              # All products
│   │   │   ├── ProductDetailsScreen.tsx      # Product details
│   │   │   ├── MyProductsScreen.tsx          # User's products
│   │   │   ├── AddProductScreen.tsx          # Multi-step form container
│   │   │   ├── steps/
│   │   │   │   ├── Step1_BasicInfo.tsx       # Title & description
│   │   │   │   ├── Step2_Categories.tsx      # Category selection
│   │   │   │   ├── Step3_Pricing.tsx         # Price & rent options
│   │   │   │   ├── Step4_Images.tsx          # Image upload
│   │   │   │   └── Step5_Review.tsx          # Review & submit
│   │   │   └── EditProductScreen.tsx
│   │   │
│   │   ├── transactions/
│   │   │   ├── TransactionsScreen.tsx        # All transactions
│   │   │   ├── BuyConfirmScreen.tsx          # Buy confirmation
│   │   │   └── RentConfirmScreen.tsx         # Rent confirmation
│   │   │
│   │   └── profile/
│   │       └── ProfileScreen.tsx
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx          # Root navigator
│   │   ├── AuthNavigator.tsx         # Auth stack
│   │   ├── MainNavigator.tsx         # Main tabs
│   │   ├── ProductNavigator.tsx      # Product stack
│   │   └── linking.ts                # Deep linking config
│   │
│   └── App.tsx                        # Main app entry (replaces root App.tsx)
│
├── android/                           # Android native config (FCM setup)
├── ios/                               # iOS native config
├── __tests__/                         # Test files
├── Part_4_documentation.md            # Technical documentation
└── README.md                          # Setup instructions
```

---

## 📝 Implementation Order & Tasks

### Phase 1: Foundation Setup

**Priority: Critical | Estimated Time: 2-3 hours**

1. **Install Dependencies**

   - Install all required npm packages
   - Link native modules
   - Configure Android for FCM

2. **Constants & Configuration**

   - API endpoints and base URL
   - App constants (colors, validation rules)
   - Category and rent option definitions

3. **API Service Layer**

   - Axios instance with interceptors
   - Storage service (AsyncStorage wrapper)
   - Error handling utilities

4. **Type Definitions** ✓
   - User, Product, Transaction types
   - Navigation types
   - API response types

---

### Phase 2: Authentication (PART 1)

**Priority: High | Estimated Time: 4-5 hours**

#### 2.1 Basic Auth Setup

- [ ] Create AuthContext with state management
- [ ] Implement storage service for tokens
- [ ] Build auth API service (login, register)
- [ ] Create useAuth custom hook

#### 2.2 UI Components

- [ ] Build reusable Input, Button components
- [ ] Create LoginScreen with form validation
- [ ] Create RegisterScreen with multi-field form
- [ ] Add error handling and loading states

#### 2.3 Biometric Authentication

- [ ] Set up react-native-biometrics
- [ ] Create biometric service wrapper
- [ ] Implement useBiometric hook
- [ ] Add biometric prompt on app launch
- [ ] Store biometric preference
- [ ] Add fallback to traditional login
- [ ] Handle biometric failures gracefully

#### 2.4 Navigation Setup

- [ ] Configure AuthNavigator (Login, Register)
- [ ] Set up navigation guards
- [ ] Implement auto-login with stored credentials

**Testing Checklist:**

- [ ] Register new user successfully
- [ ] Login with email/password
- [ ] Login with biometric (after enabling)
- [ ] Handle wrong credentials
- [ ] Persist login session
- [ ] Logout functionality

---

### Phase 3: Product Management (PART 2)

**Priority: High | Estimated Time: 6-8 hours**

#### 3.1 Product API Integration

- [ ] Create product service (CRUD operations)
- [ ] Implement useProducts hook
- [ ] Add image upload handling

#### 3.2 Multi-Step Form Architecture

- [ ] Design form state management (useReducer or Context)
- [ ] Create FormNavigation component (Back/Next buttons)
- [ ] Implement progress indicator
- [ ] Add form validation at each step
- [ ] Preserve state on navigation

#### 3.3 Product Form Steps

- [ ] **Step 1**: Title & Description
  - Text inputs with validation
  - Character count
- [ ] **Step 2**: Categories
  - Multi-select checkboxes
  - Minimum 1 category required
- [ ] **Step 3**: Pricing
  - Purchase price input
  - Rent price input
  - Rent option selector (Per Hour/Per Day)
  - At least one pricing option required
- [ ] **Step 4**: Images (Optional)
  - Image picker integration
  - Image preview
  - Remove image option
- [ ] **Step 5**: Review & Submit
  - Display all entered data
  - Edit button for each section
  - Submit to API

#### 3.4 Product Listing & Management

- [ ] Create MyProductsScreen
- [ ] Build ProductCard component
- [ ] Implement EditProductScreen (reuse form steps)
- [ ] Add delete confirmation modal
- [ ] Handle empty state (no products)

**Key Considerations:**

- Form state persists when going back
- Validation prevents proceeding to next step
- Edit mode pre-fills form with existing data
- Delete removes product and associated transactions

**Testing Checklist:**

- [ ] Complete full form flow (forward)
- [ ] Navigate backwards and edit
- [ ] Submit with valid data
- [ ] Validation errors display correctly
- [ ] Edit existing product
- [ ] Delete product with confirmation

---

### Phase 4: Marketplace & Transactions (PART 3)

**Priority: Critical | Estimated Time: 8-10 hours**

#### 4.1 Browse Products

- [ ] Create BrowseScreen with optimized FlatList
- [ ] Implement pagination/infinite scroll
- [ ] Add pull-to-refresh
- [ ] Show loading skeleton
- [ ] Handle empty state

**Performance Optimizations:**

- Use `getItemLayout` for fixed heights
- Implement `windowSize` optimization
- Memoize ProductCard with React.memo
- Use react-native-fast-image for images
- Debounce search/filter inputs

#### 4.2 Product Details & Actions

- [ ] Create ProductDetailsScreen
- [ ] Show product info, seller details
- [ ] Add "Buy" button (if purchase available)
- [ ] Add "Rent" button (if rent available)
- [ ] Disable actions for own products

#### 4.3 Buy Flow

- [ ] Create BuyConfirmScreen
- [ ] Show purchase summary
- [ ] Implement purchase API call
- [ ] Show success message
- [ ] Navigate to transactions

#### 4.4 Rent Flow

- [ ] Create RentConfirmScreen
- [ ] Implement DateRangePicker component
- [ ] Validate date range (from < to)
- [ ] Check rent availability (no overlap)
- [ ] Calculate total price
- [ ] Implement rent API call
- [ ] Show success message

**Rent Overlap Logic:**

```
Check if product has existing rentals that overlap with selected dates:
- Query rentals for product
- Compare date ranges
- Block if conflict exists
- Show error message with conflicting dates
```

#### 4.5 Transactions View

- [ ] Create TransactionsScreen with tabs/sections:
  - Bought (purchases by user)
  - Sold (products sold by user)
  - Borrowed (rentals by user)
  - Lent (products rented out by user)
- [ ] Build TransactionCard component
- [ ] Show relevant details per type
- [ ] Add filters and sorting

**Testing Checklist:**

- [ ] Browse products loads efficiently (test with 100+ products)
- [ ] Pagination works smoothly
- [ ] Buy product successfully
- [ ] Rent product with valid dates
- [ ] Prevent rent overlap
- [ ] View all transaction types
- [ ] Handle network errors

---

### Phase 5: Push Notifications (PART 3 - FCM)

**Priority: High | Estimated Time: 4-5 hours**

#### 5.1 Firebase Setup

- [ ] Add google-services.json to android/app/
- [ ] Configure AndroidManifest.xml
- [ ] Update build.gradle files
- [ ] Install @react-native-firebase packages

#### 5.2 FCM Integration

- [ ] Initialize Firebase in App.tsx
- [ ] Request notification permissions
- [ ] Get FCM token on app start
- [ ] Send token to backend on login
- [ ] Store token in AsyncStorage

#### 5.3 Notification Handling

- [ ] Handle foreground notifications
- [ ] Handle background notifications
- [ ] Handle app killed state notifications
- [ ] Parse notification payload (product_id)
- [ ] Implement notification service

#### 5.4 Deep Linking

- [ ] Configure linking in navigation
- [ ] Create deep link handler
- [ ] Navigate to ProductDetailsScreen on notification click
- [ ] Handle invalid product_id gracefully

**Notification Flow:**

```
1. User B rents/buys from User A
2. Backend sends FCM to User A's token
3. App receives notification with product_id
4. User A clicks notification
5. App navigates to ProductDetailsScreen(product_id)
```

**Testing Checklist:**

- [ ] Receive notification when product sold
- [ ] Receive notification when product rented
- [ ] Click notification navigates to product
- [ ] Foreground notifications show alert
- [ ] Background notifications work
- [ ] Notification when app is killed

---

### Phase 6: UI/UX Polish

**Priority: Medium | Estimated Time: 3-4 hours**

- [ ] Add loading states everywhere
- [ ] Implement error boundaries
- [ ] Create empty state illustrations/messages
- [ ] Add skeleton screens
- [ ] Implement pull-to-refresh
- [ ] Add confirmation modals (delete, logout)
- [ ] Improve form validation messages
- [ ] Add success toast messages
- [ ] Optimize images and assets
- [ ] Test on different screen sizes

---

### Phase 7: Testing & Quality

**Priority: High | Estimated Time: 4-5 hours**

#### 7.1 Unit Tests

- [ ] Test utility functions
- [ ] Test validation logic
- [ ] Test API services (mocked)
- [ ] Test custom hooks

#### 7.2 Integration Tests

- [ ] Test complete flows (register → login)
- [ ] Test product creation flow
- [ ] Test buy/rent flows

#### 7.3 Manual Testing

- [ ] Test with 100+ products (use backend script)
- [ ] Test on Android device
- [ ] Test biometric on real device
- [ ] Test push notifications
- [ ] Test edge cases (network errors, invalid data)
- [ ] Test battery impact with large datasets

---

### Phase 8: Documentation (PART 4)

**Priority: Critical | Estimated Time: 2-3 hours**

Create `Part_4_documentation.md` covering:

#### Structure:

1. **Architecture Overview**

   - Tech stack choices
   - Folder structure rationale
   - Navigation architecture

2. **Part 1: Authentication Solution**

   - Biometric implementation approach
   - Storage strategy
   - Fallback mechanisms

3. **Part 2: Multi-Step Form Solution**

   - State management approach
   - Validation strategy
   - Back/forth navigation handling

4. **Part 3: Marketplace & Performance**

   - Large dataset optimization techniques
   - Transaction flow design
   - Rent overlap prevention logic
   - FCM integration approach
   - Deep linking implementation

5. **Corner Cases & Solutions**

   - Rent date overlap
   - Network failures
   - Image upload failures
   - Biometric unavailability
   - Product deletion with pending transactions
   - Notification handling when app killed
   - Token expiration

6. **Testing Strategy**

   - Unit test approach
   - Integration test coverage
   - Performance testing methodology

7. **Future Improvements**
   - Real authentication (JWT)
   - Password encryption
   - Offline mode
   - Advanced search/filters
   - Product reviews/ratings

---

## 🎨 Component Reusability Strategy

### Reusable Components Priority:

1. **Button** - Used everywhere (forms, cards, modals)
2. **Input** - Forms (login, register, product steps)
3. **Card** - Product cards, transaction cards
4. **Loading** - All screens with async operations
5. **EmptyState** - Lists with no data
6. **FormInput** - Wrapped Input with validation
7. **Modal** - Confirmations, errors

### Compound Components:

- **ProductCard** - Reused in Browse, MyProducts, Transactions
- **TransactionCard** - Reused in all transaction tabs
- **FormNavigation** - Reused across all product form steps

---

## 🔍 Corner Cases to Handle

1. **Rent Overlap**

   - Check existing rentals before confirming
   - Show conflicting dates to user

2. **Product Deletion**

   - Confirm before delete
   - Backend cascade deletes transactions

3. **Network Errors**

   - Retry mechanism
   - Offline indicator
   - Cached data display

4. **Biometric Failures**

   - Too many attempts
   - Hardware unavailable
   - Fallback to password

5. **Image Upload**

   - Size validation
   - Format validation
   - Upload progress indicator

6. **FCM Token**

   - Token refresh handling
   - Send updated token to backend
   - Handle token retrieval failures

7. **Deep Linking**

   - Invalid product_id
   - Product deleted
   - User not logged in

8. **Form State**

   - Unsaved changes warning
   - State persistence on app background
   - Clear state after submission

9. **Date Validation**

   - Rent from date must be future
   - Rent to date must be after from date
   - Maximum rent duration

10. **Performance**
    - Large image optimization
    - FlatList optimization
    - Memory management

---

## 📊 Performance Benchmarks

### Targets:

- **Product List Rendering**: < 16ms per frame (60fps)
- **API Response Handling**: < 500ms
- **Image Loading**: Progressive/lazy loading
- **Memory Usage**: < 200MB for 1000 products
- **App Launch**: < 3 seconds to interactive

### Optimization Techniques:

1. FlatList optimization (windowSize, getItemLayout)
2. Image caching and optimization
3. Component memoization
4. Debounced search
5. Pagination
6. Lazy loading
7. Code splitting (if using RN 0.64+)

---

## 🚀 Development Workflow

### Commit Strategy:

- Feature branches for each part
- Meaningful commit messages
- Small, focused commits
- Regular pushes to show progress

### Example Commits:

```
feat: add biometric authentication
feat: implement multi-step product form
feat: add rent date overlap validation
fix: resolve FlatList performance issue
refactor: extract reusable Button component
docs: add Part 4 documentation
test: add unit tests for validation utils
```

---

## 📱 Demo Video Checklist

Record Loom video demonstrating:

1. User registration
2. Biometric login
3. Creating product (full multi-step form)
4. Editing product
5. Deleting product
6. Browsing products (show many products)
7. Buying a product
8. Renting a product
9. Viewing transactions (all 4 types)
10. Receiving push notification
11. Clicking notification → navigate to product

---

## 🎯 Success Criteria

### Functional:

- ✅ All 3 parts implemented
- ✅ Biometric authentication working
- ✅ Multi-step form with navigation
- ✅ Buy and rent flows complete
- ✅ Push notifications working
- ✅ Large dataset performance optimized

### Code Quality:

- ✅ Reusable components throughout
- ✅ TypeScript types for all data
- ✅ Error handling everywhere
- ✅ Loading states for async ops
- ✅ Input validation
- ✅ No code duplication

### Documentation:

- ✅ README with setup instructions
- ✅ Part_4_documentation.md complete
- ✅ Code comments where needed
- ✅ Demo video covering all features

---

## ⏱️ Total Estimated Time: 35-45 hours

**Breakdown:**

- Phase 1: 2-3 hours
- Phase 2: 4-5 hours
- Phase 3: 6-8 hours
- Phase 4: 8-10 hours
- Phase 5: 4-5 hours
- Phase 6: 3-4 hours
- Phase 7: 4-5 hours
- Phase 8: 2-3 hours
- Testing & Bug Fixes: 2-4 hours

---

## 📌 Next Steps

1. Review and approve this plan
2. Install dependencies
3. Start with Phase 1 (Foundation)
4. Progress through phases sequentially
5. Test frequently
6. Document as you build
7. Record demo video at end
