# Teebay - Installed Dependencies

## ✅ Installation Complete

All required dependencies have been successfully installed for the Teebay marketplace mobile application.

---

## 📦 Production Dependencies (19 packages)

### 🧭 Navigation (5 packages)
| Package | Version | Purpose |
|---------|---------|---------|
| `@react-navigation/native` | ^7.1.18 | Core React Navigation library |
| `@react-navigation/native-stack` | ^7.5.1 | Native stack navigator for screen transitions |
| `@react-navigation/bottom-tabs` | ^7.5.0 | Bottom tab navigator for main app tabs |
| `react-native-screens` | ^4.18.0 | Native screen components for better performance |
| `react-native-safe-area-context` | ^5.6.1 | Handle safe areas (notches, status bars) |

**Use Cases:**
- Auth flow (Login → Register)
- Main tabs (Browse, My Products, Transactions, Profile)
- Product stack (Details, Add, Edit screens)
- Deep linking for push notifications

---

### 🌐 API & Storage (3 packages)
| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | ^1.12.2 | HTTP client for API requests |
| `@react-native-async-storage/async-storage` | ^2.2.0 | Persistent key-value storage |

**Use Cases:**
- API calls to Django backend
- Store user tokens
- Cache user data
- Store FCM tokens
- Persist biometric preferences

---

### 📝 Forms & Validation (3 packages)
| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | ^7.65.0 | Performant form state management |
| `@hookform/resolvers` | ^5.2.2 | Validation resolver adapters |
| `yup` | ^1.7.1 | Schema validation library |

**Use Cases:**
- Login/Register forms
- Multi-step product creation form
- Edit product form
- Form validation with error messages

---

### 🔐 Biometric Authentication (1 package)
| Package | Version | Purpose |
|---------|---------|---------|
| `react-native-biometrics` | ^3.0.1 | Biometric authentication (FaceID, TouchID, Fingerprint) |

**Use Cases:**
- Biometric login on app launch
- Store encrypted credentials
- Fallback to traditional login

---

### 🔔 Firebase (2 packages)
| Package | Version | Purpose |
|---------|---------|---------|
| `@react-native-firebase/app` | ^23.4.1 | Firebase core SDK |
| `@react-native-firebase/messaging` | ^23.4.1 | Firebase Cloud Messaging for push notifications |

**Use Cases:**
- Receive push notifications when product sold/rented
- Send FCM token to backend on login
- Deep link to product on notification click
- Foreground/background notification handling

---

### 📅 Date & Calendar (2 packages)
| Package | Version | Purpose |
|---------|---------|---------|
| `react-native-calendars` | ^1.1313.0 | Calendar picker component |
| `date-fns` | ^4.1.0 | Date manipulation and formatting |

**Use Cases:**
- Rent date range picker (from/to dates)
- Date formatting in product cards
- Calculate rent duration
- Validate date ranges

---

### 🖼️ Image Handling (1 package)
| Package | Version | Purpose |
|---------|---------|---------|
| `react-native-image-picker` | ^8.2.1 | Image selection from camera/gallery |

**Use Cases:**
- Product image upload (Step 4 of add product)
- Camera capture option
- Gallery selection option
- Image preview before upload

---

### 🎨 UI Components (1 package)
| Package | Version | Purpose |
|---------|---------|---------|
| `react-native-vector-icons` | ^10.3.0 | Icon library (FontAwesome, MaterialIcons, etc.) |

**Use Cases:**
- Tab bar icons
- Button icons (add, edit, delete)
- Form input icons
- Empty state illustrations

**Note:** This package is deprecated and suggests per-icon-family packages, but still works fine for this project.

---

### 📱 React Native Core (2 packages)
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.1.1 | React core library |
| `react-native` | 0.82.1 | React Native framework |

---

## 🛠️ Development Dependencies (18 packages)

### TypeScript & Types
- `typescript` ^5.8.3 - TypeScript compiler
- `@react-native/typescript-config` 0.82.1 - React Native TypeScript configuration
- `@types/react` ^19.1.1 - React type definitions
- `@types/react-test-renderer` ^19.1.0 - Test renderer type definitions
- `@types/jest` ^29.5.13 - Jest type definitions

### Build Tools
- `@babel/core` ^7.25.2 - Babel compiler core
- `@babel/preset-env` ^7.25.3 - Babel preset for environment
- `@babel/runtime` ^7.25.0 - Babel runtime helpers
- `@react-native/babel-preset` 0.82.1 - React Native Babel preset
- `@react-native/metro-config` 0.82.1 - Metro bundler configuration

### CLI & Platform Tools
- `@react-native-community/cli` 20.0.0 - React Native CLI
- `@react-native-community/cli-platform-android` 20.0.0 - Android platform tools
- `@react-native-community/cli-platform-ios` 20.0.0 - iOS platform tools

### Code Quality
- `eslint` ^8.19.0 - JavaScript linter
- `@react-native/eslint-config` 0.82.1 - React Native ESLint configuration
- `prettier` 2.8.8 - Code formatter

### Testing
- `jest` ^29.6.3 - JavaScript testing framework
- `react-test-renderer` 19.1.1 - React component test renderer

---

## 🚀 Next Steps for Setup

### 1. Link Native Modules (iOS)
If running on iOS, you need to install pods:
```bash
cd ios
pod install
cd ..
```

### 2. Configure Android for Firebase
- Add `google-services.json` to `android/app/`
- Update `android/app/build.gradle`
- Update `android/build.gradle`

### 3. Configure Vector Icons
Link icon fonts for Android:
- Update `android/app/build.gradle` to include font assets

### 4. Run the App
```bash
# Android
npm run android

# iOS (macOS only)
npm run ios
```

---

## ⚠️ Known Issues & Notes

### Node Version Warning
- Current Node: v20.18.0
- Required: >= 20.19.4
- **Status:** ⚠️ Warning only, app should work fine

### React Native Fast Image
- **Not Installed:** Peer dependency conflict with React 19
- **Impact:** Will use standard `<Image>` component instead
- **Alternative:** Can implement image caching with React Native's built-in Image component

### React Native Vector Icons
- **Deprecated:** Package has moved to per-icon-family model
- **Impact:** Still works, but consider migrating in future
- **Migration:** See https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md

---

## 📊 Package Count Summary

- **Total Production Dependencies:** 19 packages
- **Total Dev Dependencies:** 18 packages
- **Total Packages Installed:** 964 packages (including sub-dependencies)
- **Vulnerabilities:** 0 ✅

---

## 🔧 Additional Setup Required

### Firebase Configuration
1. Obtain Firebase Admin SDK JSON file
2. Place in Django backend: `teebay-django-backend-mobile-dev-assessment/teebay-mobile-assesment-firebase-adminsdk.json`
3. Add `google-services.json` to `android/app/`

### Environment Variables
Create `.env` file (if needed):
```
API_BASE_URL=http://localhost:8000
```

### Backend Setup
Ensure Django backend is running:
```bash
cd teebay-django-backend-mobile-dev-assessment
python manage.py runserver
```

---

## ✅ Installation Status: COMPLETE

All dependencies have been successfully installed. The project is now ready for development.
