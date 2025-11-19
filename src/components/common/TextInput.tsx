import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';

interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoFocus?: boolean;
  style?: any;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry = false,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  autoFocus = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <PaperTextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        error={!!error}
        disabled={disabled}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        style={styles.input}
        outlineStyle={styles.outline}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  outline: {
    borderRadius: 8,
    borderColor: '#E0E0E0',
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
});
