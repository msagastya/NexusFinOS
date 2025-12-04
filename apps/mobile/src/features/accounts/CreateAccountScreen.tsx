import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { AccountType } from '@nexus/shared-domain';
import { v4 as uuidv4 } from 'uuid';
import { AccountModel } from '../../core/db/models/AccountModel';
import { TransactionModel } from '../../core/db/models/TransactionModel';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

const CreateAccountScreen: React.FC<Props> = ({ navigation }) => {
  const database = useDatabase();
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('BANK');
  const [phone, setPhone] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');

  const handleSubmit = async () => {
    try {
      if (!name || !accountType) {
        Alert.alert('Error', 'Name and Account Type are required.');
        return;
      }

      await database.write(async () => {
        const newAccount = await database.collections.get<AccountModel>('accounts').create((account: AccountModel) => {
          account.name = name;
          account.type = accountType;
          account.currency = 'INR'; // Default to INR as per global memory
          account.isExcludedFromNetWorth = false; // Default
        });

        // Handle initial transaction for opening balance
        if (parseFloat(openingBalance) > 0) {
          await database.collections.get<TransactionModel>('transactions').create((transaction: TransactionModel) => {
            transaction.accountId = newAccount.id; // Link to the newly created account's ID
            transaction.amount = parseFloat(openingBalance);
            transaction.currency = 'INR';
            transaction.kind = 'CREDIT';
            transaction.status = 'CLEARED';
            transaction.timestamp = new Date();
            transaction.description = 'Opening balance';
          });
        }
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create account:', error);
      Alert.alert('Error', 'Failed to create account.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Account Name"
        value={name}
        onChangeText={setName}
      />

      <Picker
        selectedValue={accountType}
        style={styles.picker}
        onValueChange={(itemValue: AccountType) => setAccountType(itemValue)}
      >
        <Picker.Item label="Bank" value="BANK" />
        <Picker.Item label="Wallet" value="WALLET" />
        <Picker.Item label="Shadow" value="SHADOW" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Phone Number (Optional)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Opening Balance (INR)"
        keyboardType="numeric"
        value={openingBalance}
        onChangeText={setOpeningBalance}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
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
    padding: 0, // Padding handled by internal Picker styling
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
});

export default CreateAccountScreen;
