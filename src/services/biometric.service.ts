import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { Buffer } from 'buffer';

class BiometricService {
  private rnBiometrics = new ReactNativeBiometrics();

  async isBiometricAvailable(): Promise<boolean> {
    const { available, biometryType } =
      await this.rnBiometrics.isSensorAvailable();
    console.log('Biometric available:', available, biometryType);
    return available;
  }
  async authenticate(
    reason: string = 'Authenticate to login',
  ): Promise<boolean> {
    try {
      const { success } = await this.rnBiometrics.simplePrompt({
        promptMessage: reason,
        cancelButtonText: 'Cancel',
      });
      return success;
    } catch (error) {
      console.error('Biometric auth failed:', error);
      return false;
    }
  }
  async saveCredentials(email: string, password: string): Promise<void> {
    // Simple base64 encoding
    const encodedEmail = Buffer.from(email).toString('base64');
    const encodedPassword = Buffer.from(password).toString('base64');

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.BIOMETRIC_ENABLED, 'true'],
      [STORAGE_KEYS.BIOMETRIC_USERNAME, encodedEmail],
      [STORAGE_KEYS.BIOMETRIC_PASSWORD, encodedPassword], // Add this to constants
    ]);
  }
  async getCredentials(): Promise<{ email: string; password: string } | null> {
    try {
      const [enabled, encodedEmail, encodedPassword] =
        await AsyncStorage.multiGet([
          STORAGE_KEYS.BIOMETRIC_ENABLED,
          STORAGE_KEYS.BIOMETRIC_USERNAME,
          STORAGE_KEYS.BIOMETRIC_PASSWORD,
        ]);

      if (enabled[1] !== 'true' || !encodedEmail[1] || !encodedPassword[1]) {
        return null;
      }

      const email = Buffer.from(encodedEmail[1], 'base64').toString('utf-8');
      const password = Buffer.from(encodedPassword[1], 'base64').toString(
        'utf-8',
      );

      return { email, password };
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      return null;
    }
  }
  async isBiometricEnabled(): Promise<boolean> {
    const enabled = await AsyncStorage.getItem(STORAGE_KEYS.BIOMETRIC_ENABLED);
    return enabled === 'true';
  }
  async disableBiometric(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.BIOMETRIC_ENABLED,
      STORAGE_KEYS.BIOMETRIC_USERNAME,
      STORAGE_KEYS.BIOMETRIC_PASSWORD,
    ]);
  }
}
export const biometricService = new BiometricService();
