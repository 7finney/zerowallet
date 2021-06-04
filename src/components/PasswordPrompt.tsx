import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Button, Modal, Text, TextInput } from 'react-native-paper';

interface IPwdPmt {
  visible: boolean;
  hidePasswordPrompt: () => void;
  onSubmit: (password: string) => void;
}
export const PasswordPrompt: React.FC<IPwdPmt> = ({
  visible,
  hidePasswordPrompt,
  onSubmit,
}: IPwdPmt) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [pwd, setPwd] = useState<string>('');
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hidePasswordPrompt}
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
          onPress={() => {
            const pass = pwd;
            setPwd('');
            onSubmit(pass);
          }}
          style={styles.buttonStyle}>
          Ok
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
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
