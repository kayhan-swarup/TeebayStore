import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProductStore } from '../../store/productStore';
import { CATEGORIES, Category } from '../../constants';
import { Loading } from '../../components/common/Loading';
import { TextInput } from '../../components/common/TextInput';
import { Button, Chip } from 'react-native-paper';
import { openCamera, openGallery } from '../../utils/imagePicker';

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
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      await fetchProductById(productId);
    } catch (error) {
      console.error('Failed to load product:', error);
      Alert.alert('Error', 'Failed to load product details');
    }
  };

  //Set fetched product
  useEffect(() => {
    if (selectedProduct) {
      setTitle(selectedProduct.title);
      setCategories(selectedProduct.categories as Category[]);
      setDescription(selectedProduct.description);
      setPurchasePrice(selectedProduct.purchase_price);
      setRentPrice(selectedProduct.rent_price);
      setRentOption(selectedProduct.rent_option);
      setImagePreview(selectedProduct.product_image);
    }
  }, [selectedProduct]);

  const toggleCategory = (category: Category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleImageChange = (image: any) => {
    setProductImage(image);
    if (image?.uri) {
      setImagePreview(image.uri);
    }
  };

  const handleCamera = async () => {
    await openCamera(handleImageChange);
  };

  const handleGallery = async () => {
    await openGallery(handleImageChange);
  };

  if (isLoading && !selectedProduct) {
    return <Loading />;
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Enter product title"
        />
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.label}>Categories</Text>
          <View style={styles.chipsContainer}>
            {CATEGORIES.map(category => (
              <Chip
                key={category.value}
                mode={categories.includes(category.value) ? 'flat' : 'outlined'}
                selected={categories.includes(category.value)}
                onPress={() => toggleCategory(category.value)}
                style={[
                  styles.chip,
                  categories.includes(category.value) && styles.chipSelected,
                ]}
                textStyle={
                  categories.includes(category.value) && styles.chipTextSelected
                }
              >
                {category.label}
              </Chip>
            ))}
          </View>
          {/* Description */}
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter product description"
            multiline
            numberOfLines={6}
          />
          <View style={styles.section}>
            <Text style={styles.label}>Product Image</Text>
            {imagePreview && (
              <Image
                source={{ uri: imagePreview }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
            )}
            <View style={styles.imageButtons}>
              <Button
                mode="contained"
                icon="camera"
                onPress={handleCamera}
                style={styles.imageButton}
              >
                Take Photo
              </Button>
              <Button
                mode="outlined"
                icon="image"
                onPress={handleGallery}
                style={styles.imageButton}
              >
                Choose from Device
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#6200EE',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#E0E0E0',
  },
  imageButtons: {
    gap: 12,
  },
  imageButton: {
    marginBottom: 8,
  },
  priceSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  priceColumn: {
    flex: 1,
  },
  priceInput: {
    marginBottom: 0,
  },
  rentOptionContainer: {
    marginTop: 8,
  },
  rentOptionLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  rentOptionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rentOptionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  rentOptionButtonActive: {
    backgroundColor: '#6200EE',
    borderColor: '#6200EE',
  },
  rentOptionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  rentOptionButtonTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 32,
    paddingVertical: 8,
    backgroundColor: '#6200EE',
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
