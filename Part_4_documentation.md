# Part 4: Technical Implementation Documentation

## Project Overview

- **Application Name:** Teebay Marketplace
- **Platform:** React Native (Android)
- **Backend:** Django REST Framework
- **State Management:** Zustand
- **Navigation:** React Navigation v7
- **Key Dependencies:** Firebase Cloud Messaging, React Native Biometrics, React Native Paper

### Tech Stack Justification

- **Zustand** Lightweight state management (~1KB), simpler than Redux, perfect for this scale
- **React Navigation** Industry standard, excellent TypeScript support, robust deep linking
- **React Native Paper** Material Design components out-of-the-box, consistent UI/UX
- **AsyncStorage** Persistent storage for user data and biometric credentials
- **Axios** HTTP client with interceptors, better error handling than fetch

## Part 1: Authentication Implementation

### Requirement

- User Registration
- Login with Biometric/FaceID authentication
- Traditional login fallback
- Simple string matching (no encryption required per spec)

**Key Implementation: biometric.service.ts**

```typescript
// Core methods:
-isBiometricAvailable() - // Check device capability
  authenticate() - // Show biometric prompt
  saveCredentials() - // Store encrypted email/password
  getCredentials() - // Retrieve and decrypt credentials
  isBiometricEnabled() - // Check if user enabled biometric
  disableBiometric(); // Clear stored credentials
```

**Credential Storage Strategy:**

- Email and password stored in AsyncStorage
- Backend requires email+password for every login (no token-based auth)
- Base64 encoding using `Buffer`
- AsyncStorage with keys defined in `constants/storage.ts`

**Storage Keys:**

```typescript
BIOMETRIC_ENABLED: '@teebay_biometric_enabled';
BIOMETRIC_USERNAME: '@teebay_biometric_username';
BIOMETRIC_PASSWORD: '@teebay_biometric_password';
```

#### UI Implementation

**Biometric Button:**

- **Location:** Next to LOGIN button (side-by-side layout)
- **Appearance:** Square button (56x56px) with fingerprint icon
- **Visibility Logic:**
  - Only shown if device supports biometrics AND
  - User has previously enabled biometric login
- **States:** Normal, Loading (spinner), Disabled

**User Experience Flow:**

1. First login → User enters credentials → Success
2. Prompt appears: "Enable Biometric Login?"
3. User taps "Enable" → Biometric prompt for confirmation
4. Credentials saved → Fingerprint button appears on next visit
5. Subsequent logins → Tap fingerprint → Authenticate → Auto-login

#### Integration with Backend

**API Endpoint:** `POST /api/users/login/`

**Request Payload:**

```json
{
  "email": "user@example.com",
  "password": "plaintext_password",
  "fcm_token": "<firebase_token>" // For push notifications
}
```

**Biometric Auto-Login:**

```typescript
// On biometric success:
1. Retrieve stored credentials from AsyncStorage
2. Decode base64 strings
3. Call login() with decoded credentials
4. Backend validates and returns user data
5. Store in Zustand → App navigates to Main screen
```

## Part 2: Product Management Implementation

### Requirement

- Add Product (multi-page form with back/forth navigation)
- Edit Product
- Delete Product
- Multi-select categories (6 options)
- Support for purchase and/or rent pricing

#### Multi-Step Form Architecture

**Step Breakdown:**

1. **TitleForm** - Product title (3-100 chars)
2. **CategoryForm** - Multi-select categories (min 1 required)
3. **DescriptionForm** - Product description (10-1000 chars)
4. **ImageForm** - Optional image upload (camera/gallery)
5. **PriceForm** - Purchase price, rent price, rent option (at least one required)
6. **SummaryForm** - Review all data before submission

#### Back/Forward Navigation

**State Preservation:**

- All form data stored in parent component state
- Navigating back preserves entered values
- User can review and edit any previous step
- No data loss until explicit cancel or successful submit

#### Edit Product Implementation

**Approach:** Reuse same form components with pre-filled data

## Part 3: Marketplace & Transactions Implementation

### Requirement

- Browse all products (optimized for large datasets)
- Buy products
- Rent products (with date range)
- View transactions (bought/sold/borrowed/lent)
- FCM Push Notifications (Android)
- Deep linking to products

#### Product Detail Screen

**Features:**

- Display full product information
- Show seller details
- Buy button (if purchase price available)
- Rent button (if rent price available)
- Hide buttons for own products

#### Buy Flow Implementation

**Flow:**

```
1. User taps "Buy" button
2. Confirmation dialog appears
3. User confirms purchase
4. API call: POST /api/transactions/purchases/
5. Success → Navigate to Transactions screen
6. Backend sends FCM notification to seller
```

#### Rent Flow Implementation

**Flow:**

```
1. User taps "Rent" button
2. Date picker dialog appears
3. User selects start and end dates
4. Validation: end_date > start_date
5. Calculate total price based on duration
6. API call: POST /api/transactions/rentals/
7. Success → Navigate to Transactions screen
8. Backend sends FCM notification to seller
```

#### Transactions Screen Implementation

- 4 tabs, Bought, Sold, Borrowed, Lent
- Filtered out after fetching all transaction api

**Data Filtering:**

```typescript
// Bought: Purchases where current user is buyer
const myPurchases = purchases.filter(p => p.buyer === user.id);

// Sold: Purchases where current user is seller
const soldItems = purchases.filter(p => p.seller === user.id);

// Borrowed: Rentals where current user is renter
const myRentals = rentals.filter(r => r.renter === user.id);

// Lent: Rentals where current user is seller
const lentItems = rentals.filter(r => r.seller === user.id);
```

#### FCM Integration

**Features**

- Request notification permission after app launches
- Generates FCM token and stores in AsyncStorage
- Sends FCM token to server from login and signup
- Handles incoming cloud messaging from background and foreground when product purchased or rented
- Extract productId from fcm and navigates to Product Details with param
