import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text, SegmentedButtons } from 'react-native-paper';
import { TextInput } from '../../../components/common/TextInput';

interface PriceProps {
  purchasePrice: string;
  rentPrice: string;
  rentOption: 'hour' | 'day';
  onChangePurchasePrice: (value: string) => void;
  onChangeRentPrice: (value: string) => void;
  onChangeRentOption: (value: 'hour' | 'day') => void;
}

const PriceForm: React.FC<PriceProps> = ({
  purchasePrice,
  rentPrice,
  rentOption,
  onChangePurchasePrice,
  onChangeRentPrice,
  onChangeRentOption,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Price</Text>
      <Text style={styles.subtitle}>
        Define the purchase and rental pricing for your product
      </Text>

      <TextInput
        label="Purchase Price"
        placeholder="0.00"
        value={purchasePrice}
        onChangeText={onChangePurchasePrice}
        keyboardType="decimal-pad"
        autoFocus
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rent Options</Text>

        <TextInput
          label="Rent Price"
          placeholder="0.00"
          value={rentPrice}
          onChangeText={onChangeRentPrice}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Rent Period</Text>
        <SegmentedButtons
          value={rentOption}
          onValueChange={value => onChangeRentOption(value as 'hour' | 'day')}
          buttons={[
            { value: 'hour', label: 'Per Hour' },
            { value: 'day', label: 'Per Day' },
          ]}
          style={styles.segmentedButtons}
        />
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
});
