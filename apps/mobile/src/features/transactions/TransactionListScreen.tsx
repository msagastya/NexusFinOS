import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { TransactionModel } from '../../core/db/models/TransactionModel';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

type Props = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const TransactionListScreen: React.FC<Props> = ({ navigation }) => {
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

  const exportTransactionsToCsv = async () => {
    if (transactions.length === 0) {
      Alert.alert('No Data', 'No transactions to export.');
      return;
    }

    const header = ['ID', 'Account ID', 'Amount', 'Currency', 'Kind', 'Status', 'Timestamp', 'Description', 'Split Group ID', 'Geo Location', 'Created At', 'Updated At'];
    const rows = transactions.map(t => [
      t.id,
      t.accountId,
      t.amount,
      t.currency,
      t.kind,
      t.status,
      t.timestamp.toISOString(),
      t.description || '',
      t.splitGroupId || '',
      t.geoLocation || '',
      t.createdAt.toISOString(),
      t.updatedAt.toISOString(),
    ]);

    const csvContent = [
      header.map(h => `"${h}"`).join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const fileUri = (FileSystem as any).cacheDirectory + 'transactions.csv';

    try {
      await FileSystem.writeAsStringAsync(fileUri, csvContent);
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this device.');
        return;
      }
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      Alert.alert('Error', 'Failed to export transactions.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Transactions</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateTransaction')}
          >
            <Text style={styles.addButtonText}>Add Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, styles.exportButton]}
            onPress={exportTransactionsToCsv}
          >
            <Text style={styles.addButtonText}>Export CSV</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exportButton: {
    backgroundColor: '#28a745', // Green color for export
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
