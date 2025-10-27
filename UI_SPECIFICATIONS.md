# Teebay UI/UX Specifications

## 🎨 Design System

### Color Palette
```
Primary (Buttons, Active States): #6366F1 (Indigo/Purple-Blue)
Background: #FFFFFF (White)
Text Primary: #1F2937 (Dark Gray)
Text Secondary: #6B7280 (Medium Gray)
Border: #E5E7EB (Light Gray)
Success: #10B981 (Green)
Error: #EF4444 (Red)
```

### Typography
```
Headers: Bold, ~24-28px
Screen Titles: Bold, ~20-22px
Product Titles: Medium, ~16-18px
Body Text: Regular, ~14-16px
Caption/Meta: Regular, ~12-14px
```

### Spacing
```
Screen Padding: 16-20px
Card Padding: 16px
Input Padding: 12-16px
Button Padding: 12-16px vertical, 24-32px horizontal
Element Spacing: 12-16px
```

---

## 📱 Screen Specifications

### 1. Login Screen

**Layout:**
```
┌─────────────────────┐
│                     │
│     SIGN IN         │ (Centered, Bold, Large)
│                     │
│  ┌───────────────┐  │
│  │ Email         │  │ (Light border, rounded)
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Password      │  │ (Light border, rounded)
│  └───────────────┘  │
│                     │
│    ┌─────────┐      │
│    │  LOGIN  │      │ (Purple button, rounded)
│    └─────────┘      │
│                     │
│ Don't have an       │
│ account? Signup     │ ("Signup" is blue link)
│                     │
└─────────────────────┘
```

**Elements:**
- Email input (placeholder: "Email")
- Password input (placeholder: "Password", secure entry)
- LOGIN button (purple/indigo background, white text, rounded corners)
- Navigation text with link

**Biometric Integration:**
- Show biometric prompt immediately if enabled
- Fallback to this screen if biometric fails/unavailable

---

### 2. Registration Screen

**Layout:**
```
┌─────────────────────┐
│                     │
│     SIGN UP         │ (Centered, Bold, Large)
│                     │
│  ┌───────────────┐  │
│  │ First Name    │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Last Name     │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Address       │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Email         │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Phone Number  │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Password      │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Confirm Pass  │  │
│  └───────────────┘  │
│                     │
│   ┌────────────┐    │
│   │  REGISTER  │    │ (Purple button)
│   └────────────┘    │
│                     │
│ Already have an     │
│ account? Sign In    │ ("Sign In" is blue link)
│                     │
└─────────────────────┘
```

**Fields:**
- First Name (required)
- Last Name (required)
- Address (required)
- Email (required, validated)
- Phone Number (required, validated)
- Password (required, min 6 chars)
- Confirm Password (required, must match)

**Validation:**
- Show error below field on blur
- Disable button until all fields valid

---

### 3. Main Navigation (Bottom Tabs)

**Tab Bar Items:**
```
┌─────────┬─────────┬─────────┬─────────┐
│ Browse  │   My    │ Trans-  │ Profile │
│  [icon] │Products │ actions │ [icon]  │
│         │ [icon]  │ [icon]  │         │
└─────────┴─────────┴─────────┴─────────┘
```

**Tabs:**
1. **Browse** - All products list
2. **My Products** - User's products with FAB
3. **Transactions** - 4 sub-tabs (Bought/Sold/Borrowed/Lent)
4. **Profile** - User profile/settings

**Active State:**
- Purple/blue color for active tab
- Gray for inactive tabs

---

### 4. Browse Screen (All Products)

**Header:**
```
ALL PRODUCTS (centered, bold)
```

**Product Card:**
```
┌─────────────────────────────────┐
│ Camping gear                    │ (Title, medium, bold)
│ Categories: Sporting Goods,     │ (Gray text, smaller)
│ Outdoor                         │
│ Price: $100 | Rent: $40 daily   │ (Gray text)
│                                 │
│ Et harum quidem rerum facilis   │ (Description preview)
│ et et expedita distinctio...    │
│ More Details                    │ (Blue link)
│                                 │
│ Date posted: 21st August 2020   │ (Small gray)
│ 156 views                       │ (Small gray)
└─────────────────────────────────┘
```

**List:**
- FlatList with cards
- Border around each card
- 16px margin between cards
- Pull to refresh
- Pagination/infinite scroll

**Interactions:**
- Tap card → Navigate to Product Details

---

### 5. My Products Screen

**Header:**
```
MY PRODUCTS (centered, bold)
```

**Product Card:** (Same as Browse, but for user's products)

**FAB Button:**
```
Position: Bottom right (fixed)
Icon: + (Plus symbol)
Color: Purple/Indigo background
Shape: Circle
Size: 56x56px
Shadow: Elevated
```

**Interactions:**
- Tap card → Navigate to Edit Product
- Tap FAB → Navigate to Add Product (multi-step)

---

### 6. Transactions Screen

**Tab Header:**
```
┌────────┬────────┬──────────┬────────┐
│ Bought │  Sold  │ Borrowed │  Lent  │ (Purple underline for active)
└────────┴────────┴──────────┴────────┘
```

**Content:** Product cards similar to Browse

**Tabs:**
1. **Bought** - Products purchased by user
2. **Sold** - User's products that were sold
3. **Borrowed** - Products rented by user
4. **Lent** - User's products that were rented out

---

### 7. Product Details Screen

**Layout:**
```
┌─────────────────────────────────┐
│ iPhone 13 pro max               │ (Title, large, bold)
│                                 │
│ Categories: Electronics         │ (Gray text)
│                                 │
│ Price: $1500                    │ (Medium text)
│                                 │
│ Latest iphone 13 max. Bought    │
│ from the Apple store. Sed ut    │
│ perspiciatis unde omnis iste    │
│ natus error sit voluptatem      │
│ accusantium doloremque          │
│ laudantium, totam rem aperiam,  │
│ eaque ipsa quae.                │
│                                 │
│ Et harum quidem rerum facilis   │
│ est et expedita distinctio.     │
│ Nam libero tempore, cum soluta  │
│ nobis est                       │
│                                 │
│        [Scrollable]             │
│                                 │
│ ┌───────────────────────────┐   │
│ │  ┌──────┐      ┌──────┐   │   │
│ │  │ Rent │      │ Buy  │   │   │ (Bottom buttons)
│ │  └──────┘      └──────┘   │   │
│ └───────────────────────────┘   │
└─────────────────────────────────┘
```

**Elements:**
- Product title (large, bold)
- Categories (gray)
- Price (bold)
- Full description (scrollable)
- Action buttons at bottom (fixed)

**Action Buttons:**
- **Rent** button (purple outline or secondary style)
- **Buy** button (purple solid)
- Show only relevant buttons based on product pricing
- Hide buttons if it's user's own product

**Interactions:**
- Rent → Navigate to Rent Confirmation with date picker
- Buy → Navigate to Buy Confirmation or show modal

---

### 8. Edit Product Screen

**Note:** Split into scrollable sections, all on one screen

**Section 1: Title**
```
Title (label)
┌─────────────────────────────────┐
│ iPhone 13 pro max               │
└─────────────────────────────────┘
```

**Section 2: Categories**
```
Categories (label)
┌────────────┐
│ Electronics ▼ │ [X] (Removable tag)
└────────────┘
(Multi-select dropdown)
```

**Section 3: Description**
```
Description (label)
┌─────────────────────────────────┐
│ Latest iphone 13 max. Bought    │
│ from the Apple store. Sed ut    │
│ perspiciatis unde omnis iste    │
│ natus error sit voluptatem      │
│ accusantium doloremque          │
│ laudantium, totam rem aperiam,  │
│ eaque ipsa quae.                │
│                                 │
│ Et harum quidem rerum facilis   │
│ est et expedita distinctio. Nam │
│ libero tempore                  │
└─────────────────────────────────┘
(Multiline textarea)
```

**[Scroll down to see pricing section]**

**Section 4: Price**
```
Price (header, centered, bold)

Price                  Rent
┌──────────┐         ┌──────────┐
│  $1500   │         │   $50    │
└──────────┘         └──────────┘
                     ┌──────────┐
                     │ per hr ▼ │ (Dropdown)
                     └──────────┘

         ┌────────────────┐
         │  Edit Product  │ (Purple button)
         └────────────────┘
```

**Interactions:**
- Edit any field
- Remove categories with X button
- Add more categories from dropdown
- Update pricing
- Submit changes

---

### 9. Add Product Screen (Multi-Step Form)

**Progress Bar:**
```
━━━━━━━━━━ ─────────────────────────
(40% complete - teal/purple, 60% gray)
```

**Common Elements:**
- Progress indicator at top (visual bar showing completion)
- Back button (bottom left)
- Next button (bottom right)
- Both buttons are purple

---

#### Step 1: Title

**Layout:**
```
[Progress Bar: 1/6]

Select a title for your product
(Centered instruction text)

┌─────────────────────────────────┐
│                                 │ (Text input)
└─────────────────────────────────┘

              ┌──────┐
              │ Next │ (Purple button)
              └──────┘
```

**Validation:**
- Min 3 characters
- Max 100 characters
- Required

---

#### Step 2: Categories

**Layout:**
```
[Progress Bar: 2/6]

Select categories
(Centered instruction text)

┌─────────────────────────────────┐
│ Select a category            ▼  │ (Dropdown)
└─────────────────────────────────┘

[Selected categories shown as removable tags]

┌──────┐              ┌──────┐
│ Back │              │ Next │
└──────┘              └──────┘
```

**Options:**
- ELECTRONICS
- FURNITURE
- HOME APPLIANCES
- SPORTING GOODS
- OUTDOOR
- TOYS

**Validation:**
- At least 1 category required
- Multi-select allowed

---

#### Step 3: Description

**Layout:**
```
[Progress Bar: 3/6]

Select description
(Centered instruction text)

┌─────────────────────────────────┐
│                                 │
│                                 │
│      (Large text area)          │
│                                 │
│                                 │
└─────────────────────────────────┘

┌──────┐              ┌──────┐
│ Back │              │ Next │
└──────┘              └──────┘
```

**Validation:**
- Min 10 characters
- Max 1000 characters
- Required

---

#### Step 4: Upload Picture

**Layout:**
```
[Progress Bar: 4/6]

Upload Product Picture
(Centered instruction text)

┌───────────────────────────────────┐
│  Take Picture using Camera        │ (Purple button)
└───────────────────────────────────┘

┌───────────────────────────────────┐
│  Upload Picture from Device       │ (Purple button)
└───────────────────────────────────┘

[Image preview if uploaded]

┌──────┐              ┌──────┐
│ Back │              │ Next │
└──────┘              └──────┘
```

**Options:**
- Camera capture
- Gallery selection
- Optional (can skip)

---

#### Step 5: Price

**Layout:**
```
[Progress Bar: 5/6]

Select price
(Centered instruction text)

┌─────────────────────────────────┐
│ Purchase price                  │ (Placeholder)
└─────────────────────────────────┘

Rent

┌─────────────────────────────────┐
│ Rent price                      │ (Placeholder)
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ per hr                       ▼  │ (Dropdown)
└─────────────────────────────────┘
Options: per hr, per day

┌──────┐              ┌──────┐
│ Back │              │ Next │
└──────┘              └──────┘
```

**Validation:**
- At least one price (purchase OR rent) required
- If rent price provided, rent option required
- Numeric values only

---

#### Step 6: Summary

**Layout:**
```
[Progress Bar: 6/6]

Summary
(Centered, bold)

Title: Playstation 5

Categories:
Electronics, Toys

Description: Brand new PS5
for sale in a discount

Price: $500
To rent: $50
per day

┌──────┐              ┌─────────┐
│ Back │              │ Submit  │
└──────┘              └─────────┘
```

**Elements:**
- Display all entered information
- Allow going back to edit
- Submit button creates product

---

## 🎯 Component Reusability Map

### Common Components Needed:

1. **Button**
   - Used in: Login, Register, All forms, Product details
   - Variants: Primary (solid purple), Secondary (outline), Link

2. **Input**
   - Used in: Login, Register, Product forms
   - Variants: Text, Numeric, Multiline, Secure

3. **Card**
   - Used in: Product lists, Transaction lists
   - Layout: Border, padding, shadow

4. **FormProgress**
   - Used in: Multi-step product form
   - Shows step X of Y with visual bar

5. **FormNavigation**
   - Used in: Multi-step product form
   - Back and Next/Submit buttons

6. **CategorySelector**
   - Used in: Add/Edit product
   - Multi-select dropdown with removable tags

7. **ProductCard**
   - Used in: Browse, My Products, Transactions
   - Reusable with slight variations

8. **TabBar**
   - Used in: Transactions screen
   - Custom tab component

9. **FAB**
   - Used in: My Products screen
   - Floating action button

---

## 📐 Layout Guidelines

### Screen Structure:
```
┌─────────────────────────────────┐
│ Status Bar (system)             │
│─────────────────────────────────│
│ Header/Title (centered)         │
│─────────────────────────────────│
│                                 │
│                                 │
│        Content Area             │
│        (scrollable)             │
│                                 │
│                                 │
│─────────────────────────────────│
│ Bottom Navigation (if main)     │
│ or Action Buttons               │
└─────────────────────────────────┘
```

### Responsive Considerations:
- Use flex layouts
- Avoid fixed heights (except buttons)
- Use ScrollView/FlatList for content
- Safe area handling for notches

---

## 🎭 Interaction Patterns

### Loading States:
- Show spinner/skeleton during API calls
- Disable buttons while loading
- Show progress for image uploads

### Error States:
- Show error message below field
- Red border for invalid inputs
- Toast/alert for API errors

### Empty States:
- Show helpful message when no products
- Suggest action (e.g., "Add your first product")

### Confirmation Dialogs:
- Before delete
- Before purchase/rent
- On form cancel with unsaved changes

---

## 🔔 Notification UI

### In-App Notification:
- Show banner at top when received in foreground
- Include product title
- Tap to navigate

### Notification Content:
```
Title: "Product Sold!" or "Product Rented!"
Body: "[Buyer Name] bought/rented your [Product Title]"
Data: { product_id: 123 }
```

---

This specification should guide all UI implementation to match the wireframes.
