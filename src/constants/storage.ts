export const STORAGE_KEYS = {
  // Authentication
  USER_TOKEN: '@teebay_user_token',
  USER_DATA: '@teebay_user_data',
  USER_ID: '@teebay_user_id',
  USER: '@teebay_user',

  // Biometric
  BIOMETRIC_ENABLED: '@teebay_biometric_enabled',
  BIOMETRIC_USERNAME: '@teebay_biometric_username',

  // Firebase
  FCM_TOKEN: '@teebay_fcm_token',

  // App state
  FIRST_LAUNCH: '@teebay_first_launch',
  LAST_SYNC: '@teebay_last_sync',
} as const;
