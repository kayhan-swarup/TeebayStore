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
  <Tab.Navigator>
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
  </Tab.Navigator>;
};
