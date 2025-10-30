import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface BuyConfirmDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const BuyConfirmDialog: React.FC<BuyConfirmDialogProps> = ({
  visible,
  onDismiss,
  onConfirm,
  loading = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.message}>
            Are you sure you want to buy this product?
          </Text>

          <View style={styles.buttons}>
            <Button
              mode="contained"
              onPress={onDismiss}
              style={styles.noButton}
              labelStyle={styles.buttonLabel}
              disabled={loading}
            >
              No
            </Button>
            <Button
              mode="contained"
              onPress={onConfirm}
              style={styles.yesButton}
              labelStyle={styles.buttonLabel}
              loading={loading}
              disabled={loading}
            >
              Yes
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  noButton: {
    flex: 1,
    backgroundColor: '#D32F2F',
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#1976D2',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
