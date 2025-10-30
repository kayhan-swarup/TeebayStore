import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Category, ProductCategory } from '../../constants';
import { useAuthStore } from '../../store/authStore';
import { StepIndicator } from '../../components/forms/StepIndicator';
import { Button } from 'react-native-paper';
import { useProductStore } from '../../store/productStore';
import { TitleForm } from './steps/TitleForm';
import { CategoryForm } from './steps/CategoryForm';
import DescriptionForm from './steps/DescriptionForm';
import ImageForm from './steps/ImageForm';
import PriceForm from './steps/PriceForm';
import SummaryForm from './steps/SummaryForm';

interface ProductFormData {
  title: string;
  categories: Category[];
  description: string;
  product_image: any;
  purchase_price: string;
  rent_price: string;
  rent_option: 'hour' | 'day';
}
const TOTAL_STEPS = 6;

export default function AddProductScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
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
  const updateFormData = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TitleForm
            value={formData.title}
            onChange={value => updateFormData('title', value)}
          />
        );
      case 2:
        return (
          <CategoryForm
            value={formData.categories}
            onChange={value => updateFormData('categories', value)}
          />
        );
      case 3:
        return (
          <DescriptionForm
            value={formData.description}
            onChange={value => updateFormData('description', value)}
          />
        );
      case 4:
        return (
          <ImageForm
            value={formData.product_image}
            onChange={value => updateFormData('product_image', value)}
          />
        );
      case 5:
        return (
          <PriceForm
            purchasePrice={formData.purchase_price}
            rentPrice={formData.rent_price}
            rentOption={formData.rent_option}
            onChangePurchasePrice={value =>
              updateFormData('purchase_price', value)
            }
            onChangeRentPrice={value => updateFormData('rent_price', value)}
            onChangeRentOption={value => updateFormData('rent_option', value)}
          />
        );
      case 6:
        return <SummaryForm formData={formData} />;
      default:
        return null;
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };
  const handleSubmit = () => {};

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };
  const validateStep = (stepIndex: number): boolean => {
    // Add validation logic for each step here
    // Return true if valid, false otherwise
    return true;
  };

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
          mode="contained"
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
