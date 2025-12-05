import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { AccountModel } from '../../core/db/models/AccountModel';
import { TransactionModel } from '../../core/db/models/TransactionModel';
import { Q } from '@nozbe/watermelondb';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountDetail'>;

const AccountDetailScreen: React.FC<Props> = ({ route }) => {
  const { accountId } = route.params;
  const database = useDatabase();
  const [account, setAccount] = useState<AccountModel | null>(null);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [balance, setBalance] = useState<number>(0);

  // Subscribe to account details
  useEffect(() => {
    if (!accountId) return;

    const accountObservable = database.collections
      .get<AccountModel>('accounts')
      .findAndObserve(accountId);

    const subscription = accountObservable.subscribe(setAccount);

    return () => subscription.unsubscribe();
  }, [database, accountId]);

  // Subscribe to transactions for the account
  useEffect(() => {
    if (!accountId) return;

    const transactionsObservable = database.collections
      .get<TransactionModel>('transactions')
      .query(Q.where('account_id', accountId), Q.sortBy('created_at', Q.desc))
      .observe();

    const subscription = transactionsObservable.subscribe(setTransactions);

    return () => subscription.unsubscribe();
  }, [database, accountId]);

  // Calculate balance when transactions change
  useEffect(() => {
    let total = 0;
    transactions.forEach((transaction) => {
      if (transaction.kind === 'CREDIT') {
        total += transaction.amount;
      } else if (transaction.kind === 'DEBIT') {
        total -= transaction.amount;
      }
    });
    setBalance(total);
  }, [transactions]);

  if (!account) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading account details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{account.name}</Text>
      <Text style={styles.subHeader}>{account.type}</Text>
      <Text style={styles.balance}>
        Balance: {account.currency} {balance.toFixed(2)}
      </Text>

      <Text style={styles.transactionsTitle}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item: transaction }) => (
          <View style={styles.transactionItem}>
            <Text>Description: {transaction.description}</Text>
            <Text>Amount: {transaction.amount.toFixed(2)}</Text>
            <Text>Kind: {transaction.kind}</Text>
            <Text>Date: {transaction.createdAt.toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 24,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
});

export default AccountDetailScreen;
