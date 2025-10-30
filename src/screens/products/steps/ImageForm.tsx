import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, Button as PaperButton } from 'react-native-paper';

interface ImageProps {
  value: any;
  onChange: (value: any) => void;
}

const ImageForm: React.FC<ImageProps> = ({ value, onChange }) => {
  const handleCamera = async () => {};

  const handleGallery = async () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Picture</Text>
      <Text style={styles.subtitle}>Add a photo to showcase your product</Text>

      {value ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: value.uri }} style={styles.image} />
          <PaperButton
            mode="outlined"
            onPress={() => onChange(null)}
            style={styles.removeButton}
          >
            Remove Image
          </PaperButton>
        </View>
      ) : (
        <View style={styles.uploadContainer}>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>

          <PaperButton
            mode="contained"
            icon="camera"
            onPress={handleCamera}
            style={styles.button}
          >
            Take Photo
          </PaperButton>

          <PaperButton
            mode="outlined"
            icon="image"
            onPress={handleGallery}
            style={styles.button}
          >
            Choose from Device
          </PaperButton>
        </View>
      )}
    </View>
  );
};

export default ImageForm;

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
  uploadContainer: {
    gap: 16,
  },
  placeholder: {
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666666',
  },
  imageContainer: {
    gap: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  button: {
    marginBottom: 8,
  },
  removeButton: {
    borderColor: '#B00020',
  },
});
