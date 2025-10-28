import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput } from '../../components/common/TextInput';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignInPress = () => {
    navigation.navigate('Login' as never);
  };
  const handleRegister = async () => {};
  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
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
          <Text style={styles.title}>SIGN UP</Text>

          {/* First Name */}
          <TextInput
            label="First Name"
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={text => updateField('firstName', text)}
            error={errors.firstName}
          />

          {/* Last Name */}
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={text => updateField('lastName', text)}
            error={errors.lastName}
          />

          {/* Address */}
          <TextInput
            label="Address"
            placeholder="Address"
            value={formData.address}
            onChangeText={text => updateField('address', text)}
            error={errors.address}
          />

          {/* Email */}
          <TextInput
            label="Email"
            placeholder="Email"
            value={formData.email}
            onChangeText={text => updateField('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email}
          />

          {/* Phone Number */}
          <TextInput
            label="Phone Number"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChangeText={text => updateField('phoneNumber', text)}
            keyboardType="phone-pad"
            error={errors.phoneNumber}
          />

          {/* Password */}
          <TextInput
            label="Password"
            placeholder="Password"
            value={formData.password}
            onChangeText={text => updateField('password', text)}
            secureTextEntry
            autoCapitalize="none"
            error={errors.password}
          />

          {/* Confirm Password */}
          <TextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={text => updateField('confirmPassword', text)}
            secureTextEntry
            autoCapitalize="none"
            error={errors.confirmPassword}
          />

          {/* Register Button */}
          <Button
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading}
            style={styles.registerButton}
          >
            REGISTER
          </Button>

          {/* Sign In Link */}
          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignInPress}>
              <Text style={styles.signinLink}>Sign In</Text>
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
  },
  content: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#000000',
  },
  registerButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    fontSize: 14,
    color: '#666666',
  },
  signinLink: {
    fontSize: 14,
    color: '#6200EE',
    fontWeight: '600',
  },
});
