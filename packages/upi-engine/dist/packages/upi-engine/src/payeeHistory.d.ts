import { PayeeHistoryRecord, UpiUrlPayload, UpiPaymentIntent } from './types';
export interface PayeeHistoryProvider {
    findByVpa(vpa: string): Promise<PayeeHistoryRecord | null>;
    upsertFromIntent(intent: UpiPaymentIntent): Promise<void>;
}
export declare function buildCorrelationKey(upiPayload: UpiUrlPayload, at: Date): string;
export declare function buildUpiPaymentIntent(upiPayload: UpiUrlPayload, history: PayeeHistoryRecord | null, now?: Date): UpiPaymentIntent;
