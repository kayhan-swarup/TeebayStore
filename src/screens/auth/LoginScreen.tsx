import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../../components/common/TextInput';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { biometricService } from '../../services/biometric.service';
import { ActivityIndicator } from 'react-native-paper';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [showBiometric, setShowBiometric] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  const checkBiometricAvailability = async () => {
    const available = await biometricService.isBiometricAvailable();
    const enabled = await biometricService.isBiometricEnabled();
    setShowBiometric(available && enabled);
  };

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const handleBiometricLogin = async () => {
    setBiometricLoading(true);
    try {
      const authenticated = await biometricService.authenticate(
        'Login to Teebay',
      );

      if (!authenticated) {
        setBiometricLoading(false);
        return;
      }

      const credentials = await biometricService.getCredentials();

      if (!credentials) {
        Alert.alert('Error', 'Biometric credentials not found');
        setBiometricLoading(false);
        return;
      }

      await login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      console.error('Biometric login failed:', error);
      Alert.alert('Error', 'Biometric login failed');
    } finally {
      setBiometricLoading(false);
    }
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSignupPress = () => {
    navigation.navigate('Register' as never);
  };

  const handleLogin = async () => {
    console.log('Login pressed');
    if (!validate()) return;
    console.log('Validated');
    clearError();

    try {
      await login({
        email: email.trim(),
        password,
      });
      const available = await biometricService.isBiometricAvailable();
      const enabled = await biometricService.isBiometricEnabled();

      if (available && !enabled) {
        Alert.alert(
          'Enable Biometric Login?',
          'Use fingerprint or face recognition for faster login',
          [
            {
              text: 'Not Now',
              style: 'cancel',
            },
            {
              text: 'Enable',
              onPress: async () => {
                const authenticated = await biometricService.authenticate(
                  'Confirm to enable biometric login',
                );
                if (authenticated) {
                  await biometricService.saveCredentials(
                    email.trim(),
                    password,
                  );
                  setShowBiometric(true);
                  Alert.alert('Success', 'Biometric login enabled!');
                }
              },
            },
          ],
        );
      }
    } catch (err) {
      // Error is handled by store
      console.error('Login failed:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.title}>SIGN IN</Text>

          {/* Error Message */}
          {error && <ErrorMessage message={error} onDismiss={clearError} />}

          {/* Email Input */}
          <TextInput
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email}
          />

          {/* Password Input */}
          <TextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (errors.password)
                setErrors({ ...errors, password: undefined });
            }}
            secureTextEntry
            autoCapitalize="none"
            error={errors.password}
          />

          {/* Login Button */}
          <View style={styles.buttonContainer}>
            <Button
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={styles.loginButton}
            >
              LOGIN
            </Button>
            {showBiometric && (
              <TouchableOpacity
                onPress={handleBiometricLogin}
                disabled={isLoading || biometricLoading}
                style={styles.biometricButton}
              >
                {biometricLoading ? (
                  <ActivityIndicator color="#6200EE" />
                ) : (
                  <Icon name="fingerprint" size={32} color="#6200EE" />
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* Signup Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Dont have an account? </Text>
            <TouchableOpacity onPress={handleSignupPress}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#000000',
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 24,
    flex: 1,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666666',
  },
  signupLink: {
    fontSize: 14,
    color: '#6200EE',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  biometricButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6200EE',
    marginTop: 8,
    marginBottom: 24,
  },
});
