import { Linking } from 'react-native';
import { getDatabase } from '@core/index';
import { parseUpiUrl, buildUpiUrl } from '@upi/upiUrl';
import { buildUpiPaymentIntent } from '@upi/payeeHistory';
import { savePendingIntent } from '@upi/pending';
import { PayeeHistoryModel } from '../../core/db/models/PayeeHistoryModel';
import { UpiPaymentIntent } from './types';

export async function buildUpiIntentFromUrl(rawUrl: string): Promise<UpiPaymentIntent> {
  const db = getDatabase();
  const upiPayload = parseUpiUrl(rawUrl);

  const payeeCollection = db.get<PayeeHistoryModel>('payee_history');
  const existing = await payeeCollection
    .query()
    .fetch()
    .then((list) => list.find((p) => p.payeeVpa === upiPayload.payeeVpa) ?? null);

  const history =
    existing &&
    {
      id: existing.id,
      payeeVpa: existing.payeeVpa,
      payeeName: existing.payeeName,
      suggestedCategoryId: existing.suggestedCategoryId,
      lastUsedAt: existing.lastUsedAt,
      totalTransactionsCount: existing.totalTransactionsCount,
      totalVolume: existing.totalVolume,
    };

  const intent = buildUpiPaymentIntent(upiPayload, history ?? null);

  console.log('UPI intent built:', intent);
  return intent;
}

export async function buildUpiLaunchUrl(intent: {
  payeeVpa: string;
  payeeName?: string | null;
  amount: number;
  currency: string;
}): Promise<string> {
  const url = new URL('upi://pay');
  url.searchParams.set('pa', intent.payeeVpa);
  if (intent.payeeName) {
    url.searchParams.set('pn', intent.payeeName);
  }
  url.searchParams.set('am', intent.amount.toFixed(2));
  url.searchParams.set('cu', intent.currency);
  return url.toString();
}

export async function launchUpiAppForIntent(intent: UpiPaymentIntent) {
  // Persist this intent so that a later UPI debit SMS can be reconciled against it.
  await savePendingIntent(intent);

  const url = await buildUpiLaunchUrl({
    payeeVpa: intent.payeeVpa,
    payeeName: intent.payeeName,
    amount: intent.amount,
    currency: intent.currency,
  });

  // DO NOT auto-call this on app boot; this should be triggered by explicit UI flows later.
  await Linking.openURL(url);
}
