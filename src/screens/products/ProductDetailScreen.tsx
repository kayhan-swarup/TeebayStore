import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Card, Chip, Divider } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProductStore } from '../../store/productStore';
import { useAuthStore } from '../../store/authStore';
import { DUMMY_PRODUCT } from '../../constants';
import { BuyConfirmDialog } from '../../components/dialogs/BuyConfirmDialog';
import { RentPeriodDialog } from '../../components/dialogs/RentPeriodDialog';
import { useTransactionStore } from '../../store/transactionStore';
import { Loading } from '../../components/common/Loading';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { isLoading, selectedProduct, fetchProductById } = useProductStore();
  const [sold, setSold] = useState(false);
  const {
    isLoading: transactionLoading,
    createPurchase,
    createRental,
    getPurchaseByProductId,
    selectedPurchase,
    rentDates,
    getRentByProductId,
  } = useTransactionStore();
  const { user } = useAuthStore();
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [showRentDialog, setShowRentDialog] = useState(false);

  const { productId } = route.params;

  useEffect(() => {
    getRentByProductId(productId);
  }, [productId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const handleBuy = () => {
    if (sold) {
      Alert.alert(
        'Info',
        'This product has already been sold or out of stock.',
      );
      return;
    }
    setShowBuyDialog(true);
  };
  const handleRent = () => {
    if (sold) {
      Alert.alert(
        'Info',
        'This product has already been sold or out of stock.',
      );
      return;
    }
    setShowRentDialog(true);
  };

  useEffect(() => {
    fetchProductById(productId);
    getPurchaseByProductId(productId);
  }, [productId]);
  useEffect(() => {
    console.log('Selected Purchase:', selectedPurchase);
    setSold(selectedPurchase !== null);
  }, [selectedPurchase]);
  useEffect(() => {
    console.log('Sold status updated:', sold);
  }, [sold]);

  const handleBuyConfirm = async () => {
    if (!selectedProduct || !user) return;

    try {
      await createPurchase(user.id, selectedProduct.id);
      setShowBuyDialog(false);
      Alert.alert('Success', 'Product purchased successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error('Purchase error:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to purchase product';
      Alert.alert('Error', errorMessage);
    }
  };
  const handleRentConfirm = async (fromDate: Date, toDate: Date) => {
    if (!selectedProduct || !user) return;

    try {
      // Format dates to ISO string
      const startDate = fromDate.toISOString().split('T')[0];
      const endDate = toDate.toISOString().split('T')[0];

      await createRental(
        user.id,
        selectedProduct.id,
        selectedProduct.rent_option,
        startDate,
        endDate,
      );
      setShowRentDialog(false);
      Alert.alert('Success', 'Product rented successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error('Rental error:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to rent product';
      Alert.alert('Error', errorMessage);
    }
  };

  const product = selectedProduct || DUMMY_PRODUCT;
  const imageUrl = product.product_image;

  if (isLoading && !selectedProduct) {
    return <Loading />;
  }
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        {/* Product Image */}
        {imageUrl && (
          <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
        )}

        <Card.Content>
          {/* Title */}
          <Text style={styles.title}>{product?.title}</Text>

          {/* Posted Date */}
          <Text style={styles.date}>
            Posted on {formatDate(product.date_posted)}
          </Text>

          <Divider style={styles.divider} />

          {/* Categories */}
          <Text style={styles.label}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {product.categories.map((category, index) => (
              <Chip key={index} mode="outlined" style={styles.chip}>
                {category.replace('_', ' ').toUpperCase()}
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{product?.description}</Text>

          <Divider style={styles.divider} />

          {/* Pricing */}
          <Text style={styles.label}>Purchase Price</Text>
          <Text style={styles.price}>
            ${parseFloat(product.purchase_price).toFixed(2)}
          </Text>

          <Text style={[styles.label, styles.labelSpaced]}>Rent Price</Text>
          <Text style={styles.price}>
            ${parseFloat(product.rent_price).toFixed(2)} /{' '}
            {product?.rent_option}
          </Text>

          <Divider style={styles.divider} />
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      {user?.id !== selectedProduct?.seller ? (
        <View style={styles.actionButtons}>
          {parseFloat(product.purchase_price) !== 0 && (
            <Button
              mode="contained"
              onPress={handleBuy}
              style={[styles.button, styles.buyButton]}
              labelStyle={styles.buttonLabel}
              icon="shopping"
            >
              Buy Product
            </Button>
          )}

          {parseFloat(product.rent_price) !== 0 && (
            <Button
              mode="contained"
              onPress={handleRent}
              style={[styles.button, styles.rentButton]}
              labelStyle={styles.buttonLabel}
              icon="calendar"
            >
              Rent Product
            </Button>
          )}
        </View>
      ) : (
        <Text style={styles.views}>This is your product listing.</Text>
      )}
      <BuyConfirmDialog
        visible={showBuyDialog}
        onDismiss={() => setShowBuyDialog(false)}
        onConfirm={handleBuyConfirm}
      />
      <RentPeriodDialog
        visible={showRentDialog}
        onDismiss={() => setShowRentDialog(false)}
        onConfirm={handleRentConfirm}
        rentDates={rentDates}
      />
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  image: {
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  labelSpaced: {
    marginTop: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 8,
  },
  views: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  button: {
    paddingVertical: 8,
  },
  buyButton: {
    backgroundColor: '#6200EE',
  },
  rentButton: {
    backgroundColor: '#03DAC6',
    marginTop: 4,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
