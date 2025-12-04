import {
  PayeeHistoryRecord,
  UpiUrlPayload,
  UpiPaymentIntent,
} from './types';
import { v4 as uuidv4 } from 'uuid';

export interface PayeeHistoryProvider {
  findByVpa(vpa: string): Promise<PayeeHistoryRecord | null>;
  upsertFromIntent(intent: UpiPaymentIntent): Promise<void>;
}

export function buildCorrelationKey(
  upiPayload: UpiUrlPayload,
  at: Date
): string {
  return `${upiPayload.payeeVpa}|${
    upiPayload.amount ?? 0
  }|${at.toISOString().slice(0, 16)}`;
}

export function buildUpiPaymentIntent(
  upiPayload: UpiUrlPayload,
  history: PayeeHistoryRecord | null,
  now: Date = new Date()
): UpiPaymentIntent {
  if (!upiPayload.amount || upiPayload.amount <= 0) {
    throw new Error('UPI amount missing or invalid');
  }

  const correlationKey = buildCorrelationKey(upiPayload, now);

  return {
    id: uuidv4(),
    payeeVpa: upiPayload.payeeVpa,
    payeeName: upiPayload.payeeName ?? history?.payeeName ?? null,
    amount: upiPayload.amount,
    currency: upiPayload.currency,
    suggestedCategoryId: history?.suggestedCategoryId ?? null,
    createdAt: now,
    correlationKey,
  };
}
