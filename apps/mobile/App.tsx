import './src/core/sync/sync';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AccountType } from '@domain/types';
import { getDatabase } from '@core/index';
import { calculateEMI } from '@engine/emi';
import { ingestRawSms } from './src/features/ingestion/service';
import { useEffect } from 'react';
import { buildUpiIntentFromUrl } from './src/features/upiInterceptor/service';

export default function App() {
  // Example: Log the account type to verify the import works
  const exampleAccountType: AccountType = 'BANK';
  console.log(`Core architecture setup: ${exampleAccountType}`);

  // Example: Initialize the database
  const db = getDatabase();
  console.log('DB models:', db.collections.map);

  // Example: Calculate a sample EMI
  const sampleEmi = calculateEMI(500000, 12, 60);
  console.log('Sample EMI:', sampleEmi);

  // Example: Ingest a sample SMS
  ingestRawSms({
    id: 'test-loan-sms',
    source: 'SMS',
    receivedAt: new Date(),
    sender: 'BANK',
    body: 'Credited ₹4,95,000 for Personal Loan of ₹5,00,000.',
  });

  useEffect(() => {
    (async () => {
      try {
        const intent = await buildUpiIntentFromUrl(
          'upi://pay?pa=merchant@bank&pn=MerchantName&am=123.45&cu=INR'
        );
        console.log('Dev UPI intent smoke-test:', intent);
      } catch (e) {
        console.log('UPI intent test failed:', e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
