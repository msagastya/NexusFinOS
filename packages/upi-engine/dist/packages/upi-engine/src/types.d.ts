import { CurrencyCode } from '@nexus/shared-domain';
export interface UpiUrlPayload {
    rawUrl: string;
    payeeVpa: string;
    payeeName?: string | null;
    amount?: number | null;
    currency: CurrencyCode;
}
export interface PayeeHistoryRecord {
    id: string;
    payeeVpa: string;
    payeeName?: string | null;
    lastUsedAt: Date;
    suggestedCategoryId?: string | null;
    totalTransactionsCount: number;
    totalVolume: number;
}
export interface UpiPaymentIntent {
    id: string;
    payeeVpa: string;
    payeeName?: string | null;
    amount: number;
    currency: CurrencyCode;
    suggestedCategoryId?: string | null;
    createdAt: Date;
    correlationKey: string;
}
