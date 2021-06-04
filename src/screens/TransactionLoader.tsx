import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';

export const TransactionLoader = () => {
  const { navigate } = useNavigation();
  const pickTransactionFile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      RNFS.readFile(res.uri, 'utf8')
        .then((data: string) => {
          navigate('Transaction', {
            unsignedTx: JSON.parse(JSON.parse(data)),
          });
        })
        .catch(err => console.error(err));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  return (
    <View>
      <Surface style={styles.surface}>
        <Button
          icon="camera"
          mode="contained"
          style={styles.buttonStyle}
          onPress={() => navigate('Scan QR')}>
          Scan
        </Button>
        <Button
          icon="file-upload"
          mode="contained"
          style={styles.buttonStyle}
          onPress={pickTransactionFile}>
          Load from JSON
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
