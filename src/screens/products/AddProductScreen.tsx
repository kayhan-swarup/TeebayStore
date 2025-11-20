import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Category } from '../../constants';
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addProductSchema, AddProductFormData } from '../../validations/schema';

export type ProductFormData = AddProductFormData;

const TOTAL_STEPS = 6;

export default function AddProductScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuthStore();
  const { createProduct, isLoading } = useProductStore();

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(addProductSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      categories: [],
      description: '',
      product_image: undefined,
      purchase_price: '',
      rent_price: '',
      rent_option: 'day',
    },
  });

  // Helper to safely extract error message
  const getErrorMessage = (error: any): string | undefined => {
    return error?.message;
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in');
      return;
    }

    try {
      // Transform string prices to numbers for API
      await createProduct({
        title: data.title,
        description: data.description,
        categories: data.categories as Category[],
        product_image: data.product_image,
        purchase_price: parseFloat(data.purchase_price),
        rent_price: parseFloat(data.rent_price),
        rent_option: data.rent_option,
        seller: user.id,
      });

      Alert.alert('Success', 'Product created successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to create product');
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TitleForm control={control} error={getErrorMessage(errors.title)} />;
      case 2:
        return (
          <CategoryForm
            control={control}
            error={getErrorMessage(errors.categories)}
          />
        );
      case 3:
        return (
          <DescriptionForm
            control={control}
            error={getErrorMessage(errors.description)}
          />
        );
      case 4:
        return (
          <ImageForm
            control={control}
            error={getErrorMessage(errors.product_image)}
          />
        );
      case 5:
        return (
          <PriceForm
            control={control}
            errors={{
              purchase_price: getErrorMessage(errors.purchase_price),
              rent_price: getErrorMessage(errors.rent_price),
              rent_option: getErrorMessage(errors.rent_option),
            }}
          />
        );
      case 6:
        return <SummaryForm watch={watch} />;
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

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger('title');
        break;
      case 2:
        isValid = await trigger('categories');
        break;
      case 3:
        isValid = await trigger('description');
        break;
      case 4:
        isValid = await trigger('product_image');
        break;
      case 5:
        isValid = await trigger([
          'purchase_price',
          'rent_price',
          'rent_option',
        ]);
        break;
    }

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
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
          onPress={currentStep === TOTAL_STEPS ? handleSubmit(onSubmit) : handleNext}
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
