import { Transaction, CurrencyCode } from '@nexus/shared-domain';

export interface LoanDisbursementParsed {
  rawText: string;
  creditedAmount: number; // e.g. 495000
  sanctionedAmount: number; // e.g. 500000
  currency: CurrencyCode;
}

export interface LedgerEntry {
  accountId: string;
  // sign convention: positive = increase in account, negative = decrease
  amount: number;
  currency: CurrencyCode;
  side: 'DEBIT' | 'CREDIT';
  ledgerType: 'ASSET' | 'LIABILITY' | 'EXPENSE' | 'INCOME' | 'EQUITY';
  meta?: Record<string, string | number | boolean | null>;
}

export interface SplitExpenseInput {
  payingAccountId: string; // real money account (bank/wallet)
  totalAmount: number;
  currency: CurrencyCode;
  splits: Array<{
    shareAmount: number;
    categoryId: string | null;
    counterpartyName?: string | null; // e.g. "Alex"
    counterpartyAccountId?: string | null; // receivable/payable shadow account
  }>;
}

export interface SplitExpenseResult {
  realTransaction: Transaction;
  syntheticTransactions: Transaction[];
}
