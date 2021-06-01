import { createContext } from 'react';
import { IAccount as Account } from './types';

// interface Account {
//   pubKey: string;
//   pvtKey: string;
// }

interface ContextInterface {
  accounts: Array<Account>;
  setAccounts: (_value: Array<Account>) => void;
}
export const AppContext = createContext<ContextInterface>({
  accounts: [],
  setAccounts: (_value: Array<Account>) => {},
});
