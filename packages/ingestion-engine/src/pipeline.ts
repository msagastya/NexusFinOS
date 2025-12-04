import { ParsedMessage, ParsedUpiDebit } from './types';
import {
  TrueCostLoanParams,
} from '@nexus/finance-engine/loan';
import { parseUpiDebitSms } from './sms';
import { findBestReconciliation, resolveAndCleanPendingIntent } from '@upi/reconciliation';
import { getPendingIntents } from '@upi/pending';
import { UpiPaymentIntent } from '@upi/types';
import { CurrencyCode } from '@nexus/shared-domain';
import { v4 as uuidv4 } from 'uuid';
import { buildCorrelationKey } from '@upi/payeeHistory';

export async function processUpiDebitSms(
  body: string
): Promise<ParsedUpiDebit | null> {
  const parsed = parseUpiDebitSms(body, 'INR');
  if (!parsed) return null;

  console.log('UPI Debit parsed:', parsed);

  // Attempt reconciliation
  const pending = await getPendingIntents(20);
  if (pending.length > 0) {
    const intents: UpiPaymentIntent[] = pending.map((p) => ({
      id: p.id,
      payeeVpa: p.payeeVpa,
      payeeName: p.payeeName,
      amount: p.amount,
      currency: p.currency as CurrencyCode,
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

export type AnyIngestionIntent =
  | LoanTrueCostIntent
  | UpiPaymentIntent
  | IngestionIntent; // fallback for UNKNOWN

export function buildIngestionIntentFromParsed(
  parsed: ParsedMessage
): AnyIngestionIntent {
  switch (parsed.payload.kind) {
    case 'LOAN_DISBURSAL': {
      // DO NOT hardcode account ids; use placeholder IDs.
      // Real mapping will be done later via user/account selection.
      const { creditedAmount, sanctionedAmount, currency } = parsed.payload;

      const params: TrueCostLoanParams = {
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
      const { amount, currency, vpa } = parsed.payload;
      const now = new Date();
      return {
        id: uuidv4(),
        kind: 'UPI_PAYMENT',
        sourceMessageId: parsed.context.id,
        payeeVpa: vpa!, // Assuming vpa is always present for UPI_DEBIT
        payeeName: parsed.payload.merchantName,
        amount,
        currency: currency as CurrencyCode,
        createdAt: now,
        correlationKey: buildCorrelationKey(
          {
            rawUrl: '', // Not applicable here
            payeeVpa: vpa!,
            amount,
            currency,
          },
          now
        ),
      } as UpiPaymentIntent;
    }

    default:
      return {
        kind: 'UNKNOWN',
        sourceMessageId: parsed.context.id,
        meta: {},
      };
  }
}
