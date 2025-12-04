import { Transaction, CurrencyCode } from '@nexus/shared-domain';
export interface LoanDisbursementParsed {
    rawText: string;
    creditedAmount: number;
    sanctionedAmount: number;
    currency: CurrencyCode;
}
export interface LedgerEntry {
    accountId: string;
    amount: number;
    currency: CurrencyCode;
    side: 'DEBIT' | 'CREDIT';
    ledgerType: 'ASSET' | 'LIABILITY' | 'EXPENSE' | 'INCOME' | 'EQUITY';
    meta?: Record<string, string | number | boolean | null>;
}
export interface SplitExpenseInput {
    payingAccountId: string;
    totalAmount: number;
    currency: CurrencyCode;
    splits: Array<{
        shareAmount: number;
        categoryId: string | null;
        counterpartyName?: string | null;
        counterpartyAccountId?: string | null;
    }>;
}
export interface SplitExpenseResult {
    realTransaction: Transaction;
    syntheticTransactions: Transaction[];
}
