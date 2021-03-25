import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { createKeyPair } from './utils/sign';
import { NetworkList } from './components/NetworkList';
import { AccountsList } from './components/AccList';

export const HomeScreen = () => {
  const handleCreate = () => {
    console.log('Will create new account');
    createKeyPair('');
  };
  return (
    <View>
      <NetworkList />
      <AccountsList />
      <Button icon="ethereum" mode="contained" onPress={handleCreate}>
        Create New Account
      </Button>
    </View>
  );
};
