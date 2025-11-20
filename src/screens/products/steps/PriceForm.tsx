import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text, SegmentedButtons } from 'react-native-paper';
import { TextInput } from '../../../components/common/TextInput';
import { Control, Controller } from 'react-hook-form';
import { ProductFormData } from '../AddProductScreen';

interface PriceProps {
  control: Control<ProductFormData, any>;
  errors?: {
    purchase_price?: string;
    rent_price?: string;
    rent_option?: string;
  };
}

const PriceForm: React.FC<PriceProps> = ({ control, errors }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Price</Text>
      <Text style={styles.subtitle}>
        Define the purchase and rental pricing for your product
      </Text>

      <Controller
        control={control}
        name="purchase_price"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Purchase Price"
            placeholder="0.00"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="decimal-pad"
            autoFocus
            error={errors?.purchase_price}
          />
        )}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rent Options</Text>

        <Controller
          control={control}
          name="rent_price"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Rent Price"
              placeholder="0.00"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="decimal-pad"
              error={errors?.rent_price}
            />
          )}
        />

        <Text style={styles.label}>Rent Period</Text>
        <Controller
          control={control}
          name="rent_option"
          render={({ field: { onChange, value } }) => (
            <SegmentedButtons
              value={value}
              onValueChange={onChange}
              buttons={[
                { value: 'hour', label: 'Per Hour' },
                { value: 'day', label: 'Per Day' },
              ]}
              style={styles.segmentedButtons}
            />
          )}
        />
        {errors?.rent_option && (
          <Text style={styles.errorText}>{errors.rent_option}</Text>
        )}
      </View>
    </View>
  );
};

export default PriceForm;

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
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    marginTop: 16,
  },
  segmentedButtons: {
    marginTop: 8,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
});
