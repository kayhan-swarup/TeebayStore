import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Product, RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FAB } from 'react-native-paper';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export default function MyProductsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [myProducts, setMyProducts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const renderProduct = ({ item }: { item: any }) => <Text>{item.title}</Text>;
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyTitle}>No Products Yet</Text>
      <Text style={styles.emptyText}>
        Tap the + button below to add your first product
      </Text>
    </View>
  );
  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  const handleProductPress = (product: Product) => {
    // navigation.navigate('EditProduct', { productId: product.id });
  };

  const handleAddProduct = () => {
    // navigation.navigate('AddProduct');
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={myProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={
          myProducts.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#6200EE']}
          />
        }
      />

      {/* Green Circular FAB Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="#FFFFFF"
        onPress={handleAddProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    paddingVertical: 8,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4CAF50', // Green color as per wireframe
  },
});
