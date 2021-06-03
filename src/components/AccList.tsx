import React, { useEffect, useState, useContext } from 'react';
import { ToastAndroid } from 'react-native';
import { List } from 'react-native-paper';
import { listAccounts, setGethAccount } from '../utils/sign';
import { IAccount } from '../types';
import { AppContext } from '../appContext';

export const AccountsList = () => {
  const [account, setAccount] = useState<IAccount>();
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<Error>();
  const { accounts, setAccounts } = useContext(AppContext);
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
  }, [setAccounts]);
  return (
    <List.Section title="Public key">
      <List.Accordion
        title={account?.address}
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
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
