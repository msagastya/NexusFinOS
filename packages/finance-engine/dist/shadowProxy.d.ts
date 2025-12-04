import { SplitExpenseInput, SplitExpenseResult } from './types';
import { Transaction, CurrencyCode } from '@nexus/shared-domain';
export declare function buildSplitExpenseTransactions(input: SplitExpenseInput, timestamp?: Date): SplitExpenseResult;
export interface SettlementInput {
    bankAccountId: string;
    receivableAccountId: string;
    amount: number;
    currency: CurrencyCode;
}
export interface SettlementResult {
    bankTransaction: Transaction;
    receivableTransaction: Transaction;
}
export declare function buildSettlementTransactions(input: SettlementInput, timestamp?: Date): SettlementResult;
