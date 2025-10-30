import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Category } from '../../../constants';
import { Card, Chip, Divider } from 'react-native-paper';

interface SummaryProps {
  formData: {
    title: string;
    categories: Category[];
    description: string;
    product_image: any;
    purchase_price: string;
    rent_price: string;
    rent_option: 'hour' | 'day';
  };
}

const SummaryForm: React.FC<SummaryProps> = ({ formData }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review Your Product</Text>
      <Text style={styles.subtitle}>
        Please review all the information before submitting
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          {/* Image */}
          {formData.product_image && (
            <Image
              source={{ uri: formData.product_image?.uri }}
              style={styles.image}
            />
          )}

          {/* Title */}
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{formData.title}</Text>

          <Divider style={styles.divider} />

          {/* Categories */}
          <Text style={styles.label}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {formData.categories.map((category, index) => (
              <Chip key={index} mode="outlined" style={styles.chip}>
                {category.replace('_', ' ').toUpperCase()}
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{formData.description}</Text>

          <Divider style={styles.divider} />

          {/* Pricing */}
          <Text style={styles.label}>Purchase Price</Text>
          <Text style={styles.price}>${formData.purchase_price}</Text>

          <Text style={[styles.label, styles.labelSpaced]}>Rent Price</Text>
          <Text style={styles.price}>
            ${formData.rent_price} / {formData.rent_option}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default SummaryForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 24,
  },
  card: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  labelSpaced: {
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
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
});
