export interface IAccount {
  account: number;
  address: string;
}

export interface UnsignedTransaction {
  gasPrice: string;
  chainId: number;
  from: string;
  gas: number;
  nonce: number;
  value: number;
  to: string;
  data: string;
}

export interface SignedTransaction {
  transaction: UnsignedTransaction;
  rawTransaction: string;
}
