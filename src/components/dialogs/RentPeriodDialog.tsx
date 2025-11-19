import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { useTransactionStore } from '../../store/transactionStore';
import { Rent } from '../../types';

interface RentPeriodDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (fromDate: Date, toDate: Date) => void;
  loading?: boolean;
  rentDates?: Rent[];
}

export const RentPeriodDialog: React.FC<RentPeriodDialogProps> = ({
  visible,
  onDismiss,
  onConfirm,
  loading = false,
  rentDates = [],
}) => {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
  ); // Default to next day
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const blockedDates = rentDates.map(d =>
    new Date(d.rent_period_start_date).toDateString(),
  );
  const checkDateBlocked = (date: Date) => {
    return blockedDates.includes(date.toDateString());
  };
  function isSameDay(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  const handleConfirm = () => {
    // Validate dates
    if (toDate <= fromDate) {
      // You might want to show an error here
      return;
    }
    onConfirm(fromDate, toDate);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onDismiss}
      >
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.title}>Rental period</Text>

            {/* From Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>From</Text>
              <TouchableOpacity onPress={() => setShowFromPicker(true)}>
                <TextInput
                  value={formatDate(fromDate)}
                  editable={false}
                  pointerEvents="none"
                  style={styles.input}
                  mode="outlined"
                  placeholder="dd/mm/yyyy"
                />
              </TouchableOpacity>
            </View>

            {/* To Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>To</Text>
              <TouchableOpacity onPress={() => setShowToPicker(true)}>
                <TextInput
                  value={formatDate(toDate)}
                  editable={false}
                  pointerEvents="none"
                  style={styles.input}
                  mode="outlined"
                  placeholder="dd/mm/yyyy"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.buttons}>
              <Button
                mode="contained"
                onPress={onDismiss}
                style={styles.backButton}
                labelStyle={styles.buttonLabel}
                disabled={loading}
              >
                Go Back
              </Button>
              <Button
                mode="contained"
                onPress={handleConfirm}
                style={styles.confirmButton}
                labelStyle={styles.buttonLabel}
                loading={loading}
                disabled={loading}
              >
                Confirm rent
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* From Date Picker */}
      <DatePicker
        modal
        open={showFromPicker}
        date={fromDate}
        mode="date"
        minimumDate={new Date()}
        onConfirm={date => {
          if (checkDateBlocked(date)) {
            Alert.alert(
              'Date Conflict',
              'This date is booked already. Please choose another date.',
            );
            return;
          }
          setFromDate(date);
          setShowFromPicker(false);
          // If toDate is before the new fromDate, adjust it
          if (toDate <= date) {
            setToDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
          }
        }}
        onCancel={() => setShowFromPicker(false)}
      />

      {/* To Date Picker */}
      <DatePicker
        modal
        open={showToPicker}
        date={toDate}
        mode="date"
        minimumDate={fromDate}
        onConfirm={date => {
          setToDate(date);
          setShowToPicker(false);
        }}
        onCancel={() => setShowToPicker(false)}
      />
    </>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#D32F2F',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#1976D2',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
