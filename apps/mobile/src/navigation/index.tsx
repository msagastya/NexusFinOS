import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountListScreen from '../features/accounts/AccountListScreen';
import TransactionListScreen from '../features/transactions/TransactionListScreen';
import CreateAccountScreen from '../features/accounts/CreateAccountScreen';
import AppEntry from '../AppEntry';

export type RootStackParamList = {
  Home: undefined;
  Accounts: undefined;
  Transactions: undefined;
  CreateAccount: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
