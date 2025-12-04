import { CurrencyCode } from '@nexus/shared-domain';
export type MessageSource = 'SMS' | 'PUSH' | 'MANUAL';
export type ParsedMessageKind = 'LOAN_DISBURSAL' | 'UPI_DEBIT' | 'UPI_CREDIT' | 'CARD_DEBIT' | 'GENERIC_CREDIT' | 'GENERIC_DEBIT' | 'UNKNOWN';
export interface RawMessageContext {
    id: string;
    source: MessageSource;
    receivedAt: Date;
    sender?: string | null;
    body: string;
}
export interface ParsedLoanDisbursal {
    kind: 'LOAN_DISBURSAL';
    creditedAmount: number;
    sanctionedAmount: number;
    currency: CurrencyCode;
}
export interface ParsedUpiDebit {
    kind: 'UPI_DEBIT';
    amount: number;
    currency: CurrencyCode;
    vpa?: string | null;
    merchantName?: string | null;
}
export type ParsedMessagePayload = ParsedLoanDisbursal | ParsedUpiDebit | {
    kind: 'UNKNOWN';
};
export interface ParsedMessage {
    context: RawMessageContext;
    payload: ParsedMessagePayload;
}
