import { Platform, Alert, PermissionsAndroid } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';

const IMAGE_PICKER_OPTIONS = {
  mediaType: 'photo' as const,
  quality: 0.8,
  maxWidth: 1024,
  maxHeight: 1024,
};

/**
 * Request camera permission on Android
 */
const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera to take photos',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Camera permission error:', err);
    return false;
  }
};

/**
 * Handle image picker response and show appropriate errors
 */
const handleImagePickerResponse = (
  response: ImagePickerResponse,
  onSuccess: (asset: any) => void,
): void => {
  if (response.didCancel) {
    console.log('User cancelled image picker');
    return;
  }

  if (response.errorCode) {
    console.error(
      'ImagePicker Error:',
      response.errorCode,
      response.errorMessage,
    );

    let errorMessage = 'Failed to select image';

    switch (response.errorCode) {
      case 'camera_unavailable':
        errorMessage = 'Camera is not available on this device';
        break;
      case 'permission':
        errorMessage = 'Permission to access camera/gallery was denied';
        break;
      default:
        errorMessage = response.errorMessage || 'Failed to select image';
    }

    Alert.alert('Error', errorMessage);
    return;
  }

  if (response.assets && response.assets.length > 0) {
    onSuccess(response.assets[0]);
  } else {
    Alert.alert('Error', 'No image was selected');
  }
};

/**
 * Launch camera with proper permission handling
 */
export const openCamera = async (
  onSuccess: (asset: any) => void,
): Promise<void> => {
  const hasPermission = await requestCameraPermission();

  if (!hasPermission) {
    Alert.alert(
      'Permission Required',
      'Camera permission is required to take photos. Please grant permission in your device settings.',
    );
    return;
  }

  launchCamera(IMAGE_PICKER_OPTIONS as CameraOptions, response => {
    handleImagePickerResponse(response, onSuccess);
  });
};

/**
 * Launch image library
 */
export const openGallery = async (
  onSuccess: (asset: any) => void,
): Promise<void> => {
  launchImageLibrary(IMAGE_PICKER_OPTIONS as ImageLibraryOptions, response => {
    handleImagePickerResponse(response, onSuccess);
  });
};
