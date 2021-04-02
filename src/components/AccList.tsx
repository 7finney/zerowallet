import React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { List } from 'react-native-paper';
import { listAccounts } from '../utils/sign';
import { IAccount } from '../types';

export const AccountsList = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [account, setAccount] = useState<IAccount>();
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<Error>();
  const handlePress = () => setExpanded(!expanded);
  useEffect(() => {
    ToastAndroid.showWithGravity(
      'Checking Auth',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    // Load geth accounts
    listAccounts()
      .then((accs: IAccount[]) => {
        setAccounts(accs);
        setAccount(accs[0]);
      })
      .catch(err => {
        setError(err);
      });
  }, []);
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
            onPress={() => setAccount(acc)}
          />
        ))}
      </List.Accordion>
      {error && <List.Subheader>{error}</List.Subheader>}
    </List.Section>
  );
};
