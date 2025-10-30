import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TextInput } from '../../../components/common/TextInput';

interface TitleProps {
  value: string;
  onChange: (value: string) => void;
}
export default function TitleForm({ value, onChange }: TitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Title</Text>
      <Text style={styles.subtitle}>
        Enter a clear and descriptive title for your product
      </Text>
      <TextInput
        label="Title"
        placeholder="e.g. iPhone 13 Pro Max"
        value={value}
        onChangeText={onChange}
        autoFocus
      />
    </View>
  );
}

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
