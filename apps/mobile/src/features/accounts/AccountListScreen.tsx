import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { AccountModel } from '../../core/db/models/AccountModel';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Accounts'>;

const AccountListScreen: React.FC<Props> = ({ navigation }) => {
  const database = useDatabase();
  const [accounts, setAccounts] = useState<AccountModel[]>([]);

  useEffect(() => {
    const accountsObservable = database.collections
      .get<AccountModel>('accounts')
      .query()
      .observe();

    const subscription = accountsObservable.subscribe(setAccounts);

    return () => subscription.unsubscribe();
  }, [database]);

  // Placeholder for balance calculation - will be implemented later
  const calculateBalance = (account: AccountModel) => {
    // This is a placeholder. Actual balance calculation would involve transactions.
    return '0.00';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Accounts</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text style={styles.addButtonText}>Add Account</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item: account }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{account.name}</Text>
            <Text>Type: {account.type}</Text>
            <Text>Currency: {account.currency}</Text>
            <Text>Balance: {calculateBalance(account)}</Text>
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

export default AccountListScreen;

