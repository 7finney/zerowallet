import React, { useState, useContext } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { createKeyPair } from '../utils/sign';
import { NetworkList } from '../components/NetworkList';
import { PasswordPrompt } from '../components/PasswordPrompt';
import { AccountsList } from '../components/AccList';
import { useNavigation } from '@react-navigation/native';
import { IAccount } from '../utils/types';
import { AppContext } from '../utils/appContext';

export const HomeScreen = () => {
  const { navigate } = useNavigation();
  const { accounts, setAccounts } = useContext(AppContext);
  const [visible, setVisible] = useState<boolean>(false);
  const showPwdPrompt = () => setVisible(true);
  const hidePwdPrompt = () => setVisible(false);
  const handleCreate = (password: string) => {
    console.log('Will create new account');
    createKeyPair(password).then((keyPair: IAccount) => {
      hidePwdPrompt();
      setAccounts([...accounts, keyPair]);
      ToastAndroid.showWithGravity(
        'Success! Account created.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    });
  };
  return (
    <View style={styles.container}>
      <NetworkList />
      <AccountsList />
      <PasswordPrompt
        visible={visible}
        hidePasswordPrompt={hidePwdPrompt}
        onSubmit={handleCreate}
      />
      <Surface style={styles.surface}>
        <Button
          icon="ethereum"
          mode="contained"
          onPress={showPwdPrompt}
          style={styles.buttonStyle}>
          Create New Account
        </Button>
        <Button
          icon="camera"
          mode="contained"
          style={styles.buttonStyle}
          onPress={() => navigate('Scan QR')}>
          Scan
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  surface: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginVertical: 2,
    width: 300,
  },
});
