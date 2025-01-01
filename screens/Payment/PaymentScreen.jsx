import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState(null);

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch('http://192.168.194.157:9999/api/payment-sheet', {
        method: 'POST',
      });
      const { paymentIntent } = await response.json();
      setClientSecret(paymentIntent);
    } catch (error) {
      console.error('Error fetching payment sheet parameters:', error);
      Alert.alert('Error', 'Unable to fetch payment sheet parameters.');
    }
  };

  const initializePaymentSheet = async () => {
    if (!clientSecret) return;

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'QuocHung',
    });

    if (error) {
      console.error('Error initializing payment sheet:', error);
      Alert.alert('Error', error.message);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Payment failed', error.message);
    } else {
      Alert.alert('Success', 'Payment successful!');
    }
  };

  useEffect(() => {
    fetchPaymentSheetParams();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Initialize Payment Sheet" onPress={initializePaymentSheet} />
      <Button title="Open Payment Sheet" onPress={openPaymentSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentScreen;
