import { UpiPaymentIntent } from '@upi/types';
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
export type AnyIngestionIntent = LoanTrueCostIntent | UpiPaymentIntent | IngestionIntent;
export declare function buildIngestionIntentFromParsed(parsed: ParsedMessage): AnyIngestionIntent;
