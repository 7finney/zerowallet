import { createContext } from 'react';
import { IAccount as Account } from './types';

interface ContextInterface {
  account: Account | undefined;
  setAccount: (_value: Account) => void;
  accounts: Array<Account>;
  setAccounts: (_value: Array<Account>) => void;
}
export const AppContext = createContext<ContextInterface>({
  account: undefined,
  setAccount: (_value: Account) => {},
  accounts: [],
  setAccounts: (_value: Array<Account>) => {},
});
