import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProductStore } from '../../store/productStore';

type EditProductRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EditProductScreen = () => {
  const route = useRoute<EditProductRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { selectedProduct, isLoading, fetchProductById } = useProductStore();
  return (
    <View>
      <Text>EditProductScreen</Text>
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({});
