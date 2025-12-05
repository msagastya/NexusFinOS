import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountListScreen from '../features/accounts/AccountListScreen';
import TransactionListScreen from '../features/transactions/TransactionListScreen';
import CreateAccountScreen from '../features/accounts/CreateAccountScreen';
import CreateTransactionScreen from '../features/transactions/CreateTransactionScreen';
import AccountDetailScreen from '../features/accounts/AccountDetailScreen';
import AppEntry from '../AppEntry';

export type RootStackParamList = {
  Home: undefined;
  Accounts: undefined;
  Transactions: undefined;
  CreateAccount: undefined;
  CreateTransaction: undefined;
  AccountDetail: { accountId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AppEntry} />
        <Stack.Screen name="Accounts" component={AccountListScreen} />
        <Stack.Screen name="Transactions" component={TransactionListScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="CreateTransaction" component={CreateTransactionScreen} />
        <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
