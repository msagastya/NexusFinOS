import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { TransactionModel } from '../../core/db/models/TransactionModel';

const TransactionListScreen: React.FC = () => {
  const database = useDatabase();
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);

  useEffect(() => {
    const transactionsObservable = database.collections
      .get<TransactionModel>('transactions')
      .query()
      .observe();

    const subscription = transactionsObservable.subscribe(setTransactions);

    return () => subscription.unsubscribe();
  }, [database]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item: transaction }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Amount: {transaction.amount} {transaction.currency}</Text>
            <Text>Status: {transaction.status}</Text>
            <Text>Date: {transaction.createdAt.toLocaleDateString()}</Text>
            <Text>{transaction.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransactionListScreen;
