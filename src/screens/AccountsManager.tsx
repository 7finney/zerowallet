import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Portal, Modal, TextInput, Surface } from 'react-native-paper';
import { AppContext } from '../utils/appContext';
import { AccountsList } from '../components/AccList';
import { deleteKeyPair, listAccounts } from '../utils/sign';
import { IAccount } from '../utils/types';

export const AccountsManager = () => {
  const { setAccounts } = useContext(AppContext);
  const [pwd, setPwd] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const handleDelete = () => {
    deleteKeyPair(pwd)
      .then(() => {
        setVisible(false);
        ToastAndroid.showWithGravity(
          'Success! Account deleted.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        listAccounts()
          .then((accs: IAccount[]) => {
            setAccounts(accs);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(() => {
        setVisible(false);
        ToastAndroid.showWithGravity(
          'Error! Delete account failed.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };
  const showPwdPrompt = () => setVisible(true);
  const hidePwdPrompt = () => setVisible(false);
  return (
    <View>
      <AccountsList />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hidePwdPrompt}
          contentContainerStyle={styles.modalContainerStyle}>
          <Text>Enter password for your keys!</Text>
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
            onPress={handleDelete}
            style={styles.buttonStyle}>
            Delete
          </Button>
        </Modal>
      </Portal>
      <Surface style={styles.surface}>
        <Button
          icon="delete-forever"
          mode="contained"
          onPress={showPwdPrompt}
          style={styles.buttonStyle}>
          Delete account
        </Button>
        {/* TODO: Show account QR */}
        {/* <Button icon="delete-forever" mode="contained" onPress={showAddressQR}>
          Show address QR
        </Button> */}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  surface: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  buttonStyle: {
    marginVertical: 2,
    width: 300,
  },
});
