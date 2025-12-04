import { parseUpiDebitSms } from './sms';
import { findBestReconciliation, resolveAndCleanPendingIntent } from '@upi/reconciliation';
import { getPendingIntents } from '@upi/pending';
export async function processUpiDebitSms(body) {
    const parsed = parseUpiDebitSms(body, 'INR');
    if (!parsed)
        return null;
    console.log('UPI Debit parsed:', parsed);
    // Attempt reconciliation
    const pending = await getPendingIntents(20);
    if (pending.length > 0) {
        const intents = pending.map((p) => ({
            id: p.id,
            payeeVpa: p.payeeVpa,
            payeeName: p.payeeName,
            amount: p.amount,
            currency: p.currency,
            suggestedCategoryId: p.suggestedCategoryId,
            correlationKey: p.correlationKey,
            createdAt: p.createdAt,
        }));
        const best = findBestReconciliation(intents, parsed);
        if (best) {
            console.log('Reconciliation candidate success:', best);
            const match = pending.find((p) => p.correlationKey === best.intent.correlationKey);
            if (match) {
                await resolveAndCleanPendingIntent(match.id, best.intent);
            }
        }
    }
    return parsed;
}
export function buildIngestionIntentFromParsed(parsed) {
    switch (parsed.payload.kind) {
        case 'LOAN_DISBURSAL': {
            // DO NOT hardcode account ids; use placeholder IDs.
            // Real mapping will be done later via user/account selection.
            const { creditedAmount, sanctionedAmount, currency } = parsed.payload;
            const params = {
                bankAccountId: '__BANK_ACCOUNT_TBD__',
                loanLiabilityAccountId: '__LOAN_ACCOUNT_TBD__',
                processingFeeExpenseAccountId: '__PROC_FEE_EXPENSE_TBD__',
                gstExpenseAccountId: '__GST_EXPENSE_TBD__',
                creditedAmount,
                sanctionedAmount,
                processingFeeGstRate: 0.18,
            };
            return {
                kind: 'LOAN_TRUE_COST',
                sourceMessageId: parsed.context.id,
                meta: { currency },
                params,
            };
        }
        case 'UPI_DEBIT': {
            const { amount, currency } = parsed.payload;
            return {
                kind: 'UPI_PAYMENT',
                sourceMessageId: parsed.context.id,
                meta: {
                    vpa: parsed.payload.vpa,
                    merchantName: parsed.payload.merchantName,
                },
                amount,
                currency,
            };
        }
        default:
            return {
                kind: 'UNKNOWN',
                sourceMessageId: parsed.context.id,
                meta: {},
            };
    }
}
