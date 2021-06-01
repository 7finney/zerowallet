import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { createKeyPair } from './utils/sign';
import { NetworkList } from './components/NetworkList';
import { AccountsList } from './components/AccList';
import { useNavigation } from '@react-navigation/native';
import { IAccount } from './types';
import { AppContext } from './appContext';

export const HomeScreen = () => {
  const { navigate } = useNavigation();
  const { accounts, setAccounts } = useContext(AppContext);
  const handleCreate = () => {
    console.log('Will create new account');
    createKeyPair('').then((keyPair: IAccount) => {
      setAccounts([...accounts, keyPair]);
    });
  };
  return (
    <View>
      <NetworkList />
      <AccountsList />
      <Button icon="ethereum" mode="contained" onPress={handleCreate}>
        Create New Account
      </Button>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => navigate('KeyScanner')}>
        Scan
      </Button>
    </View>
  );
};
