/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from './src/theme';
import { RootNavigator } from './src/navigation/RootNavigator';
import { firebaseService } from './src/services/firebase.service';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // Initialize Firebase and get FCM token on app start
    const initializeFirebase = async () => {
      try {
        const token = await firebaseService.getFCMToken();
        if (token) {
          console.log('Firebase initialized with token:', token);
        } else {
          console.log('Failed to get FCM token');
        }
      } catch (error) {
        console.error('Firebase initialization error:', error);
      }
    };

    initializeFirebase();

    // Handle notification when app opened from notification (killed state)
    firebaseService.checkInitialNotification(data => {
      console.log('App opened from notification (killed):', data);
      if (data.product_id) {
        // Navigate to product details
        // You'll need to handle this with navigation ref
        console.log('Navigate to product:', data.product_id);
      }
    });

    // Listen for token refresh
    const unsubscribeTokenRefresh = firebaseService.onTokenRefresh(token => {
      console.log('New FCM token received:', token);
    });

    // Handle foreground notifications
    const unsubscribeForeground = firebaseService.setupForegroundHandler(
      data => {
        console.log('Foreground notification tapped:', data);
        if (data.product_id) {
          // Navigate to product
          console.log('Navigate to product:', data.product_id);
        }
      },
    );

    // Handle background notification taps
    const unsubscribeBackground = firebaseService.setupBackgroundHandler(
      data => {
        console.log('Background notification tapped:', data);
        if (data.product_id) {
          // Navigate to product
          console.log('Navigate to product:', data.product_id);
        }
      },
    );

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
