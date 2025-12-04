import { ParsedMessage, ParsedUpiDebit } from './types';
import { TrueCostLoanParams } from '@nexus/finance-engine/loan';
export declare function processUpiDebitSms(body: string): Promise<ParsedUpiDebit | null>;
export type IngestionIntentKind = 'LOAN_TRUE_COST' | 'UPI_PAYMENT' | 'UNKNOWN';
export interface IngestionIntent {
    kind: IngestionIntentKind;
    sourceMessageId: string;
    meta: Record<string, any>;
}
export interface LoanTrueCostIntent extends IngestionIntent {
    kind: 'LOAN_TRUE_COST';
    params: TrueCostLoanParams;
}
export type AnyIngestionIntent = LoanTrueCostIntent | IngestionIntent;
export declare function buildIngestionIntentFromParsed(parsed: ParsedMessage): AnyIngestionIntent;
