import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { AccountModel } from '../../core/db/models/AccountModel';
import { TransactionModel } from '../../core/db/models/TransactionModel';
import { AccountType, TransactionKind } from '@nexus/shared-domain'; // Assuming TransactionKind is defined here
import { Picker } from '@react-native-picker/picker';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateTransaction'>;

const CreateTransactionScreen: React.FC<Props> = ({ navigation }) => {
  const database = useDatabase();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [kind, setKind] = useState<TransactionKind>('DEBIT');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<AccountModel[]>([]);

  useEffect(() => {
    const accountsObservable = database.collections
      .get<AccountModel>('accounts')
      .query()
      .observe();

    const subscription = accountsObservable.subscribe(setAccounts);

    return () => subscription.unsubscribe();
  }, [database]);

  const handleSubmit = async () => {
    try {
      if (!amount || !selectedAccountId) {
        Alert.alert('Error', 'Amount and Account are required.');
        return;
      }

      await database.write(async () => {
        await database.collections.get<TransactionModel>('transactions').create((transaction) => {
          transaction.amount = parseFloat(amount);
          transaction.kind = kind;
          transaction.description = description;
          transaction.accountId = selectedAccountId;
          transaction.currency = 'INR'; // Default to INR
          transaction.status = 'CLEARED'; // Default status
          transaction.timestamp = new Date();
        });
      });

      Alert.alert('Success', 'Transaction created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create transaction:', error);
      Alert.alert('Error', 'Failed to create transaction.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Transaction</Text>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Description (Optional)"
        value={description}
        onChangeText={setDescription}
      />

      <Picker
        selectedValue={kind}
        style={styles.picker}
        onValueChange={(itemValue: TransactionKind) => setKind(itemValue)}
      >
        <Picker.Item label="Debit" value="DEBIT" />
        <Picker.Item label="Credit" value="CREDIT" />
      </Picker>

      {accounts.length > 0 ? (
        <Picker
          selectedValue={selectedAccountId}
          style={styles.picker}
          onValueChange={(itemValue: string | null) => setSelectedAccountId(itemValue)}
        >
          <Picker.Item label="Select Account" value={null} />
          {accounts.map((account) => (
            <Picker.Item key={account.id} label={account.name} value={account.id} />
          ))}
        </Picker>
      ) : (
        <Text style={styles.noAccountsText}>No accounts available. Please create one first.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  picker: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noAccountsText: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default CreateTransactionScreen;
