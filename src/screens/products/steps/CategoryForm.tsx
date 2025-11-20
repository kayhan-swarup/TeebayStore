import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { CATEGORIES, Category } from '../../../constants/categories';
import { Control, Controller, FieldError } from 'react-hook-form';
import { ProductFormData } from '../AddProductScreen';

interface CategoriesProps {
  control: Control<ProductFormData, any>;
  error?: string;
}

export const CategoryForm: React.FC<CategoriesProps> = ({ control, error }) => {
  return (
    <Controller
      control={control}
      name="categories"
      render={({ field: { onChange, value } }) => {
        const toggleCategory = (category: Category) => {
          if (value.includes(category)) {
            onChange(value.filter(c => c !== category));
          } else {
            onChange([...value, category]);
          }
        };

        return (
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Select Categories</Text>
            <Text style={styles.subtitle}>
              Choose one or more categories that best describe your product
            </Text>
            <View style={styles.chipsContainer}>
              {CATEGORIES.map(category => (
                <Chip
                  key={category.value}
                  mode={value.includes(category.value) ? 'flat' : 'outlined'}
                  selected={value.includes(category.value)}
                  onPress={() => toggleCategory(category.value)}
                  style={[
                    styles.chip,
                    value.includes(category.value) && styles.chipSelected,
                  ]}
                  textStyle={
                    value.includes(category.value) && styles.chipTextSelected
                  }
                >
                  {category.label}
                </Chip>
              ))}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </ScrollView>
        );
      }}
    />
  );
};

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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    marginBottom: 12,
  },
  chipSelected: {
    backgroundColor: '#6200EE',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginTop: 16,
    marginLeft: 4,
  },
});
