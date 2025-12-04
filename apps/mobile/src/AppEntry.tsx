import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AccountType } from '@domain/types';
import { getDatabase } from '@core/index';
import { calculateEMI } from '@engine/emi';
import { ingestRawSms } from '@features/ingestion/service';
import { useEffect } from 'react';
import { buildUpiIntentFromUrl } from '@features/upiInterceptor/service';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function App({ navigation }: Props) {
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

  useEffect(() => {
    if (!__DEV__) {
      return;
    }

    (async () => {
      try {
        // Dev-only: loan ingestion smoke test
        await ingestRawSms({
          id: 'dev-loan-1',
          source: 'SMS',
          receivedAt: new Date(),
          sender: 'BANK',
          body: 'Credited ₹4,95,000 for Personal Loan of ₹5,00,000.',
        });

        // Dev-only: UPI intent smoke test
        const intent = await buildUpiIntentFromUrl(
          'upi://pay?pa=merchant@bank&pn=MerchantName&am=123.45&cu=INR'
        );
        console.log('Dev UPI intent smoke-test:', intent);
      } catch (e) {
        console.log('Dev ingestion/UPI smoke-tests failed:', e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>Welcome to NexusFinOS!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Accounts')}
      >
        <Text style={styles.buttonText}>Go to Accounts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Transactions')}
      >
        <Text style={styles.buttonText}>Go to Transactions</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
