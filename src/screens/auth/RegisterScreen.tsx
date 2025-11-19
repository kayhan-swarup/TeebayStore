import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { TextInput } from '../../components/common/TextInput';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { RegisterRequest } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { registerSchema } from '../../validations/schema';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type RegisterFormData = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register, isLoading, error, clearError } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    clearError();

    try {
      const registerData: RegisterRequest = {
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        address: data.address.trim(),
        email: data.email.trim(),
        password: data.password,
        phone_number: data.phoneNumber.trim(),
        firebase_console_manager_token: '',
      };

      await register(registerData);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleSignInPress = () => {
    navigation.navigate('Login' as never);
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
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="First Name"
                placeholder="First Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.firstName?.message}
              />
            )}
          />

          {/* Last Name */}
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.lastName?.message}
              />
            )}
          />

          {/* Address */}
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Address"
                placeholder="Address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.address?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email?.message}
              />
            )}
          />

          {/* Phone Number */}
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Phone Number"
                placeholder="Phone Number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
                error={errors.phoneNumber?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Password"
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                autoCapitalize="none"
                error={errors.password?.message}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Confirm Password"
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                autoCapitalize="none"
                error={errors.confirmPassword?.message}
              />
            )}
          />

          {/* Register Button */}
          <Button
            onPress={handleSubmit(onSubmit)}
            loading={isLoading || isSubmitting}
            disabled={isLoading || isSubmitting}
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
