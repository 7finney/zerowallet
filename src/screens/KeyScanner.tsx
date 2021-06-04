import React, { useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UnsignedTransaction } from '../utils/types';

export const KeyScanner = () => {
  const { navigate } = useNavigation();
  const [dismiss, setDismiss] = useState(false);
  const onSuccess = (data: any) => {
    const unsgTxHash = data.data;
    fetch(`https://wallet.ethcode.dev/api/v0/getUnsignedTx/${unsgTxHash}`)
      .then(response => response.json())
      .then(txJSON => {
        console.log(txJSON);
        const unsignedTx: UnsignedTransaction = JSON.parse(JSON.parse(txJSON));
        navigate('Transaction', {
          unsignedTx,
        });
      })
      .catch(error => console.error(error));
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker
      fadeIn={false}
      containerStyle={styles.qrcontainer}
      bottomContent={
        !dismiss ? (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                setDismiss(true);
                navigate('Home');
              }}
              style={styles.buttonTouchable}>
              <View>
                <Text style={styles.textBold}>Scan Your Transaction QR</Text>
              </View>
              <View>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  qrcontainer: {
    backgroundColor: '#000',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  textBold: {
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    textAlign: 'center',
  },
  buttonTouchable: {
    padding: 40,
  },
});
