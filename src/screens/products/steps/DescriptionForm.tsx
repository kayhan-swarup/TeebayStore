import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, TextInput as PaperTextInput } from 'react-native-paper';

interface DescriptionProps {
  value: string;
  onChange: (value: string) => void;
}
const DescriptionForm: React.FC<DescriptionProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Description</Text>
      <Text style={styles.subtitle}>
        Provide detailed information about your product
      </Text>
      <PaperTextInput
        mode="outlined"
        label="Description"
        placeholder="Describe your product in detail..."
        value={value}
        onChangeText={onChange}
        multiline
        numberOfLines={8}
        style={styles.textInput}
        autoFocus
      />
      <Text style={styles.charCount}>{value.length} characters</Text>
    </View>
  );
};

export default DescriptionForm;

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
  textInput: {
    minHeight: 150,
  },
  charCount: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'right',
    marginTop: 8,
  },
});
