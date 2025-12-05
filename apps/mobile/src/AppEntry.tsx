import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AccountType } from '@domain/types';
import { getDatabase } from '@core/index';
import { calculateEMI } from '@engine/emi';
import { ingestRawSms } from '@features/ingestion/service';
import React, { useEffect, useState } from 'react'; // Added useState
import { buildUpiIntentFromUrl } from '@features/upiInterceptor/service';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import { useDatabase } from '@nozbe/watermelondb/hooks'; // Added useDatabase
import { AccountModel } from './core/db/models/AccountModel'; // Added AccountModel
import { TransactionModel } from './core/db/models/TransactionModel'; // Added TransactionModel

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function App({ navigation }: Props) {
  // WatermelonDB hooks for home summary
  const database = useDatabase();
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  // Subscribe to accounts
  useEffect(() => {
    const accountsObservable = database.collections
      .get<AccountModel>('accounts')
      .query()
      .observe();

    const subscription = accountsObservable.subscribe(setAccounts);
    return () => subscription.unsubscribe();
  }, [database]);

  // Subscribe to transactions
  useEffect(() => {
    const transactionsObservable = database.collections
      .get<TransactionModel>('transactions')
      .query()
      .observe();

    const subscription = transactionsObservable.subscribe(setTransactions);
    return () => subscription.unsubscribe();
  }, [database]);

  // Calculate total balance across all accounts
  useEffect(() => {
    let balance = 0;
    // This is a simplified calculation. A real app might aggregate balances per account.
    accounts.forEach((account) => {
      // For now, let's just sum all credit-like transactions and subtract debit-like
      // This logic will be refined with actual account balances.
    });

    transactions.forEach((transaction) => {
      if (transaction.kind === 'CREDIT') {
        balance += transaction.amount;
      } else if (transaction.kind === 'DEBIT') {
        balance -= transaction.amount;
      } else if (transaction.kind === 'LOAN_PAYMENT') {
        balance -= transaction.amount;
      }
    });
    setTotalBalance(balance);
  }, [accounts, transactions]);

  // Example: Log the account type to verify the import works
  const exampleAccountType: AccountType = 'BANK';
  console.log(`Core architecture setup: ${exampleAccountType}`);

  // Example: Initialize the database
  // const db = getDatabase(); // Already getting database from useDatabase hook
  console.log('DB models:', database.collections.map); // Use 'database' from hook

  // Example: Calculate a sample EMI
  const sampleEmi = calculateEMI(500000, 12, 60);
  console.log('Sample EMI:', sampleEmi);

  // Dev-only side effects
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
      <Text style={styles.summaryTitle}>Total Balance</Text>
      <Text style={styles.totalBalance}>₹{totalBalance.toFixed(2)}</Text>
      <Text style={styles.summaryDetail}>Accounts: {accounts.length}</Text>
      <Text style={styles.summaryDetail}>Transactions: {transactions.length}</Text>

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
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  summaryTitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 5,
  },
  totalBalance: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  summaryDetail: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
