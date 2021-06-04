import React, { useState } from 'react';
import { View, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { List, Button } from 'react-native-paper';
import { SignedTransaction } from '../utils/types';
import { signTransaction } from '../utils/sign';

export const TransactionHandler = () => {
  const route = useRoute();
  // @ts-ignore
  const { unsignedTx } = route.params;
  const [signedTx, setSignedTx] = useState<string>();
  const handleSign = () => {
    signTransaction('', unsignedTx)
      .then((signedTx: SignedTransaction) => {
        const { rawTransaction } = signedTx;
        setSignedTx(rawTransaction);
      })
      .catch(err => {
        console.error(err);
        ToastAndroid.showWithGravity(
          `Error: Transaction sign failed.\n${err}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };
  const handleSend = () => {
    console.log('Should send tx');
    const formData = new FormData();
    formData.append('netId', 5);
    formData.append('rawTx', signedTx);

    fetch('https://wallet.ethcode.dev/api/v0/sendTx', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };
  return (
    <View>
      <List.Section>
        <List.Subheader>Transaction details</List.Subheader>
        <List.Item
          title={unsignedTx?.from}
          left={() => <Button mode="contained">From</Button>}
        />
        <List.Item
          title={unsignedTx?.to}
          left={() => <Button mode="contained">To</Button>}
        />
        <List.Item
          title={unsignedTx?.gasPrice}
          left={() => <Button mode="contained">Gas price</Button>}
        />
        <List.Item
          title={unsignedTx?.gas}
          left={() => <Button mode="contained">Gas</Button>}
        />
        <List.Item
          title={unsignedTx?.value}
          left={() => <Button mode="contained">Ether value</Button>}
        />
        <List.Item
          title={unsignedTx?.nonce}
          left={() => <Button mode="contained">Nonce</Button>}
        />
        <List.Item
          title={unsignedTx?.data}
          left={() => <Button mode="contained">Transaction data</Button>}
        />
        {signedTx && (
          <List.Item
            title={signedTx}
            left={() => (
              <Button mode="contained">Signed transaction data</Button>
            )}
          />
        )}
      </List.Section>
      {!signedTx && (
        <Button icon="ethereum" mode="contained" onPress={handleSign}>
          Sign transaction
        </Button>
      )}
      {signedTx && (
        <Button icon="ethereum" mode="contained" onPress={handleSend}>
          Send transaction
        </Button>
      )}
    </View>
  );
};
