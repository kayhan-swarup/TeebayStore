import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import { useAuthStore } from '../store/authStore';
import AddProductScreen from '../screens/products/AddProductScreen';
import ProductDetailScreen from '../screens/products/ProductDetailScreen';
import EditProductScreen from '../screens/products/EditProductScreen';
import { Loading } from '../components/common/Loading';
import { navigationRef } from './navigationRef';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated && user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{
              headerShown: true,
              presentation: 'modal',
              headerStyle: {
                backgroundColor: '#6200EE',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: 'ADD PRODUCT',
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#6200EE',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: 'PRODUCT DETAILS',
            }}
          />
          <Stack.Screen
            name="EditProduct"
            component={EditProductScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#6200EE',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: 'Edit product',
            }}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};
