/**
 * Color constants based on UI specifications
 * Primary color: #6366F1 (Indigo/Purple-Blue from wireframes)
 */

export const COLORS = {
  // Primary colors
  primary: '#6366F1', // Indigo - Used for buttons, active states, links
  primaryDark: '#4F46E5', // Darker shade for pressed states
  primaryLight: '#818CF8', // Lighter shade for backgrounds

  // Background colors
  background: '#FFFFFF', // White background
  backgroundSecondary: '#F9FAFB', // Light gray for secondary backgrounds
  card: '#FFFFFF', // Card background

  // Text colors
  text: '#1F2937', // Dark gray - Primary text
  textSecondary: '#6B7280', // Medium gray - Secondary text
  textTertiary: '#9CA3AF', // Light gray - Tertiary text
  textPlaceholder: '#D1D5DB', // Placeholder text

  // Border colors
  border: '#E5E7EB', // Light gray border
  borderFocus: '#6366F1', // Primary color for focused inputs
  borderError: '#EF4444', // Red for error borders

  // Status colors
  success: '#10B981', // Green - Success messages
  warning: '#F59E0B', // Orange - Warning messages
  error: '#EF4444', // Red - Error messages, validation errors
  info: '#3B82F6', // Blue - Info messages

  // Functional colors
  link: '#3B82F6', // Blue for links ("Sign Up", "Sign In")
  disabled: '#D1D5DB', // Disabled button background
  disabledText: '#9CA3AF', // Disabled text

  // UI element colors
  shadow: 'rgba(0, 0, 0, 0.1)', // Shadow for cards and elevated elements
  overlay: 'rgba(0, 0, 0, 0.5)', // Modal/dialog overlay
  divider: '#E5E7EB', // Divider lines

  // FAB (Floating Action Button)
  fab: '#6366F1', // Primary color for FAB
  fabIcon: '#FFFFFF', // White icon on FAB

  // Tab bar
  tabActive: '#6366F1', // Active tab color
  tabInactive: '#9CA3AF', // Inactive tab color
  tabBackground: '#FFFFFF', // Tab bar background

  // Input colors
  inputBackground: '#FFFFFF',
  inputBorder: '#E5E7EB',
  inputBorderFocus: '#6366F1',
  inputText: '#1F2937',

  // Button variants
  buttonPrimary: '#6366F1',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondary: '#FFFFFF',
  buttonSecondaryBorder: '#6366F1',
  buttonSecondaryText: '#6366F1',

  // Product card
  cardBorder: '#E5E7EB',
  cardShadow: 'rgba(0, 0, 0, 0.05)',

  // Special
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

/**
 * Color opacity helpers
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Theme configuration (can be extended for dark mode in future)
 */
export const THEME = {
  light: {
    ...COLORS,
  },
  // dark: { ... } // For future dark mode support
};
