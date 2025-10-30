import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProductCategory } from '../../constants';
import { useAuthStore } from '../../store/authStore';
import { StepIndicator } from '../../components/forms/StepIndicator';
import { Button } from 'react-native-paper';
import { useProductStore } from '../../store/productStore';
import TitleForm from './steps/TitleForm';
import CategoryForm from './steps/CategoryForm';
import DescriptionForm from './steps/DescriptionForm';
import ImageForm from './steps/ImageForm';
import PriceForm from './steps/PriceForm';
import SummaryForm from './steps/SummaryForm';

interface ProductFormData {
  title: string;
  categories: ProductCategory[];
  description: string;
  product_image: any;
  purchase_price: string;
  rent_price: string;
  rent_option: 'hour' | 'day';
}
const TOTAL_STEPS = 6;

const productFormSteps = [
  TitleForm,
  CategoryForm,
  DescriptionForm,
  ImageForm,
  PriceForm,
  SummaryForm,
];

export default function AddProductScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuthStore();
  const { isLoading } = useProductStore();

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    categories: [],
    description: '',
    product_image: null,
    purchase_price: '',
    rent_price: '',
    rent_option: 'day',
  });
  const renderStep = () => (
    <View>
      <Text>Step {currentStep}</Text>
    </View>
  );
  const handleBack = () => {};
  const handleSubmit = () => {};

  const handleNext = () => {};

  return (
    <View style={styles.container}>
      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <View style={styles.content}>{renderStep()}</View>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={handleBack}
          style={styles.backButton}
          disabled={isLoading}
        >
          {currentStep === 1 ? 'CANCEL' : 'BACK'}
        </Button>
        <Button
          onPress={currentStep === TOTAL_STEPS ? handleSubmit : handleNext}
          style={styles.nextButton}
          loading={isLoading}
          disabled={isLoading}
        >
          {currentStep === TOTAL_STEPS ? 'SUBMIT' : 'NEXT'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  nextButton: {
    flex: 1,
    marginLeft: 8,
  },
});
