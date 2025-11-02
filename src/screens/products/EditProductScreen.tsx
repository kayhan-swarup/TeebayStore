import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProductStore } from '../../store/productStore';
import { Category } from '../../constants';
import { Loading } from '../../components/common/Loading';

type EditProductRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EditProductScreen = () => {
  const route = useRoute<EditProductRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { selectedProduct, isLoading, fetchProductById } = useProductStore();
  const { productId } = route.params;

  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [rentOption, setRentOption] = useState<'hour' | 'day'>('day');
  const [productImage, setProductImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (isLoading || !selectedProduct) {
    return <Loading />;
  }
  return (
    <View>
      <Text>EditProductScreen</Text>
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({});
