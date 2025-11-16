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
    firebaseService.checkInitialNotification();

    // Listen for token refresh
    const unsubscribeTokenRefresh = firebaseService.onTokenRefresh(token => {
      console.log('New FCM token received:', token);
      // send refreshed token to server
    });

    // Handle foreground notifications
    const unsubscribeForeground = firebaseService.setupForegroundHandler();

    // Handle background notification taps
    const unsubscribeBackground = firebaseService.setupBackgroundHandler();

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
