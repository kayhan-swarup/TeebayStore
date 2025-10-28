import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Custom colors for Teebay app
const colors = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  tertiary: '#018786',
  error: '#B00020',
  success: '#4CAF50',
  warning: '#FF9800',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#000000',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    error: colors.error,
  },
  roundness: 8,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    error: colors.error,
  },
  roundness: 8,
};

export default lightTheme;
