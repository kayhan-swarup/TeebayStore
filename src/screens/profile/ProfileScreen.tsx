import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/common/Button';
import { biometricService } from '../../services/biometric.service';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  useEffect(() => {
    const checkBiometric = async () => {
      const enabled = await biometricService.isBiometricEnabled();
      setBiometricEnabled(enabled);
    };
    checkBiometric();
  }, []);
  const disableBiometric = async () => {
    await biometricService.disableBiometric();
    setBiometricEnabled(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>
            {user.first_name} {user.last_name}
          </Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{user.address}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        {biometricEnabled && (
          <Button onPress={disableBiometric} mode={'outlined'}>
            Disable Biometric
          </Button>
        )}

        <Button onPress={handleLogout} mode="outlined">
          LOGOUT
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000000',
  },
  userInfo: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginTop: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    marginTop: 'auto',
    gap: 12,
  },
});
