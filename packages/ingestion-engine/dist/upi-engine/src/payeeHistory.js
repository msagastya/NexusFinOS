import { v4 as uuidv4 } from 'uuid';
export function buildCorrelationKey(upiPayload, at) {
    return `${upiPayload.payeeVpa}|${upiPayload.amount ?? 0}|${at.toISOString().slice(0, 16)}`;
}
export function buildUpiPaymentIntent(upiPayload, history, now = new Date()) {
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
