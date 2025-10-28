import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { MainTabParamList } from '../types';
import MyProductsScreen from '../screens/products/MyProductsScreen';
import TransactionsScreen from '../screens/transactions/TransactionsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AllProductsScreen from '../screens/products/AllProductsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#6200EE',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Browse"
        component={AllProductsScreen}
        options={{
          title: 'BROWSE',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProducts"
        component={MyProductsScreen}
        options={{
          title: 'MY PRODUCTS',
          tabBarLabel: 'My Products',
          tabBarIcon: ({ color, size }) => (
            <Icon name="package-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          title: 'TRANSACTIONS',
          tabBarIcon: ({ color, size }) => (
            <Icon name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainTabNavigator;
