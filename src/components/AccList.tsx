import React, { useEffect, useState, useContext } from 'react';
import { ToastAndroid } from 'react-native';
import { List } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { listAccounts, setGethAccount } from '../utils/sign';
import { IAccount } from '../utils/types';
import { AppContext } from '../utils/appContext';

export const AccountsList = () => {
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<Error>();
  const { account, setAccount, accounts, setAccounts } = useContext(AppContext);
  const handlePress = () => setExpanded(!expanded);
  useEffect(() => {
    ToastAndroid.showWithGravity(
      'Fetching accounts from keystore',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    // Load geth accounts
    listAccounts()
      .then((accs: IAccount[]) => {
        setAccounts(accs);
        setAccount(accs[0]);
        setGethAccount(0);
      })
      .catch(err => {
        setError(err);
      });
  }, [setAccounts, setAccount]);
  const copyAddress = () => {
    console.log('Left button pressed.');
    Clipboard.setString(account?.address ? account.address : '');
    ToastAndroid.showWithGravity(
      'Public address copied to clipboard!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };
  return (
    <List.Section title="Public key">
      <List.Accordion
        title={account?.address}
        left={props => <List.Icon {...props} icon="content-copy" />}
        expanded={expanded}
        onPress={handlePress}
        onLongPress={copyAddress}>
        {accounts.map(acc => (
          <List.Item
            title={acc.address}
            key={acc.account}
            onPress={() => {
              setAccount(acc);
              setGethAccount(accounts.indexOf(acc));
            }}
          />
        ))}
      </List.Accordion>
      {error && <List.Subheader>{error}</List.Subheader>}
    </List.Section>
  );
};
