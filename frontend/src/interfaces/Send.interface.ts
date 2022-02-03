export interface SendState {
  receipt: TransactionReceiptCustom;
}

interface ObjectDecoded {
  negative: number;
  words: number[];
}

export interface DecodedMethod {
  inputs: [string, ObjectDecoded];
  method: string;
  names: string[];
  types: string[];
}

export interface TransactionReceiptCustom {
  status: boolean;
  blockHash: string;
  blockNumber: number;
  transactionHash: string;
  from: string;
  to: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  logs?: LogEntry[];
}

export interface LogEntry {
  logIndex: number | null;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string | null;
  blockNumber: number | null;
  address: string;
  data: string;
  topics: string[];
}


export interface Transaction {
  txnId: string;
  from: string;
  to: string;
  amount: string;
  asset: string;
  block: string;
  fees: string;
}

export interface AlgorandTransactionReceipt {
  transaction_id: string;
  block: string;
  link: string;
}

export interface AlgorandDynamicFeesTxnReceipt {
  main_txn_id: string;
  main_txn_block: string;
  main_txn_link: string;
  fee_refund_txn_id: string;
  fee_refund_txn_block: string;
  fee_refund_txn_link: string;
}

