import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { navigateToProductDetail } from '../navigation/navigationRef';
class FirebaseService {
  private fcmToken: string | null = null;
  async requestPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission denied');
          return false;
        }
      }

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }

      return enabled;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }
  async getFCMToken(): Promise<string | null> {
    try {
      if (this.fcmToken) {
        return this.fcmToken;
      }

      // Request permission first (for now check on Android only)
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        console.log('No notification permission');
        return null;
      }

      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        this.fcmToken = token;
        return token;
      }

      return null;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  /**
   * Listen for token refresh
   */
  onTokenRefresh(callback: (token: string) => void) {
    return messaging().onTokenRefresh(token => {
      console.log('FCM Token refreshed:', token);
      this.fcmToken = token;
      callback(token);
    });
  }
  setupForegroundHandler() {
    return messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);
      const productId = remoteMessage.data?.product_id;
      // Show alert for foreground notifications
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || '',
        [
          {
            text: 'View',
            onPress: () => {
              if (productId) {
                navigateToProductDetail(Number(productId));
              }
            },
          },
          { text: 'Dismiss', style: 'cancel' },
        ],
      );
    });
  }
  setupBackgroundHandler() {
    return messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened app from background:', remoteMessage);
      const productId = remoteMessage.data?.product_id;
      if (productId) {
        navigateToProductDetail(Number(productId));
      }
    });
  }
  async checkInitialNotification() {
    const remoteMessage = await messaging().getInitialNotification();
    if (remoteMessage) {
      console.log('Notification opened app from killed state:', remoteMessage);
      const productId = remoteMessage.data?.product_id;
      if (productId) {
        setTimeout(() => {
          navigateToProductDetail(Number(productId));
        }, 1000);
      }
    }
  }

  /**
   * Clear cached token when user logs out
   */
  clearToken() {
    messaging().deleteToken();
    this.fcmToken = null;
  }
}
export const firebaseService = new FirebaseService();
