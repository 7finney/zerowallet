import Geth from 'react-native-geth';
const geth = new Geth({ networkID: 5, testNet: 'goerli' });
import { IAccount, SignedTransaction } from '../types';

function trimInput(input: any) {
  return input.startsWith('0x') ? input.slice(2) : input;
}

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

export const signTransaction = async (
  password: string,
  tx: any,
): Promise<SignedTransaction> => {
  try {
    const txInput = {
      chainId: tx.chainId,
      to: tx.to,
      from: tx.from,
      value: tx.value,
      nonce: tx.nonce,
      gasLimit: parseInt(tx.gas, 10),
      gasPrice: tx.gasPrice,
      data: trimInput(tx.data),
    };
    const { transaction, raw } = await geth.signTransaction(password, txInput);
    return {
      transaction: JSON.parse(transaction),
      rawTransaction: `0x${raw}`,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const setGethAccount = async (accIndex: number) => {
  try {
    return await geth.setAccount(accIndex);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
