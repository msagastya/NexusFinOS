import { Transaction, CurrencyCode } from '@nexus/shared-domain';
export interface TransferInput {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    currency: CurrencyCode;
    timestamp: Date;
    description?: string;
}
export interface TransferResult {
    fromTransaction: Transaction;
    toTransaction: Transaction;
}
export declare function buildTransferTransactions(input: TransferInput): TransferResult;
/**
 * Validates that a set of transactions that are part of a single transfer
 * are balanced (i.e., their amounts sum to zero).
 */
export declare function validateTransfers(transactions: Transaction[]): boolean;
