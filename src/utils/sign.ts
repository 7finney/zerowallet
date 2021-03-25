import Geth from 'react-native-geth';
const geth = new Geth({ networkID: 5, testNet: 'goerli' });
import { IAccount } from '../types';

export const listAccounts = async (): Promise<IAccount[]> => {
  try {
    return await geth.listAccounts();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createKeyPair = async (password: string): Promise<IAccount> => {
  try {
    const keyObject = await geth.newAccount(password);
    return keyObject;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
