import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Product } from '../../types';
import { Card, Chip } from 'react-native-paper';
interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
  showActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  showActions = false,
}) => {
  const formatPrice = (price: string) => {
    try {
      return `$${parseFloat(price).toFixed(2)}`;
    } catch (error) {
      return `$${price}`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const dateDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = nowDay.getTime() - dateDay.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <TouchableOpacity
      onPress={() => onPress?.(product)}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <Card style={styles.card}>
        <Card.Content>
          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Categories */}
          <View style={styles.categoriesContainer}>
            {product.categories.map((category, index) => (
              <Chip
                key={index}
                mode="outlined"
                style={styles.categoryChip}
                textStyle={styles.categoryText}
              >
                {category.replace('_', ' ').toUpperCase()}
              </Chip>
            ))}
          </View>

          {/* Prices */}
          <View style={styles.priceContainer}>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Purchase:</Text>
              <Text style={styles.priceValue}>
                {formatPrice(product.purchase_price)}
              </Text>
            </View>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Rent:</Text>
              <Text style={styles.priceValue}>
                {formatPrice(product.rent_price)}/{product.rent_option}
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>

          {/* Footer - Date Posted */}
          <View style={styles.footer}>
            <Text style={styles.dateText}>
              Posted {formatDate(product.date_posted)}
            </Text>
            {product.views !== undefined && (
              <Text style={styles.viewsText}>{product.views} views</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 4,
    height: 28,
  },
  categoryText: {
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  priceItem: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6200EE',
  },
  description: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
  },
  viewsText: {
    fontSize: 12,
    color: '#666666',
  },
});
