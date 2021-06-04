import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Modal, Portal, TextInput, Surface } from 'react-native-paper';
import { createKeyPair } from '../utils/sign';
import { NetworkList } from '../components/NetworkList';
import { AccountsList } from '../components/AccList';
import { useNavigation } from '@react-navigation/native';
import { IAccount } from '../utils/types';
import { AppContext } from '../utils/appContext';

export const HomeScreen = () => {
  const { navigate } = useNavigation();
  const { accounts, setAccounts } = useContext(AppContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [pwd, setPwd] = useState<string>('');
  const showPwdPrompt = () => setVisible(true);
  const hidePwdPrompt = () => setVisible(false);
  const handleCreate = () => {
    console.log('Will create new account');
    createKeyPair(pwd).then((keyPair: IAccount) => {
      setPwd('');
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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hidePwdPrompt}
          contentContainerStyle={styles.modalContainerStyle}>
          <Text>Enter a password for your keys!</Text>
          <TextInput
            label="Password"
            secureTextEntry={secureTextEntry}
            right={
              <TextInput.Icon
                name="eye"
                onPressIn={() => setSecureTextEntry(false)}
                onPressOut={() => setSecureTextEntry(true)}
              />
            }
            value={pwd}
            onChangeText={text => setPwd(text)}
          />
          <Button
            icon="ethereum"
            mode="contained"
            onPress={handleCreate}
            style={styles.buttonStyle}>
            Create
          </Button>
        </Modal>
      </Portal>
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
