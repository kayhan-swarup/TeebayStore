import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TextInput } from '../../../components/common/TextInput';
import { Control, Controller } from 'react-hook-form';
import { ProductFormData } from '../AddProductScreen';

interface TitleProps {
  control: Control<ProductFormData, any>;
  error?: string;
}
export const TitleForm: React.FC<TitleProps> = ({ control, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Title"
            placeholder="e.g. iPhone 13 Pro Max"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error}
            autoFocus
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
