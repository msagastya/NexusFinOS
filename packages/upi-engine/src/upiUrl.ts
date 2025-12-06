import { URL } from 'react-native-url-polyfill';
import { UpiUrlPayload, UpiPaymentIntent } from './types';
import { CurrencyCode } from '@nexus/shared-domain';

export function parseUpiUrl(
  rawUrl: string,
  defaultCurrency: CurrencyCode = 'INR'
): UpiUrlPayload {
  if (!rawUrl.startsWith('upi://')) {
    throw new Error('Invalid UPI URL: must start with "upi://"');
  }

  const url = new URL(rawUrl);
  const params = url.searchParams;

  const payeeVpa = params.get('pa');
  if (!payeeVpa) {
    throw new Error('Invalid UPI URL: "pa" (payee VPA) is required.');
  }

  const payeeName = params.get('pn');
  const amountStr = params.get('am');
  const amount = amountStr ? parseFloat(amountStr) : null;
  const currency = (params.get('cu') as CurrencyCode) || defaultCurrency;

  return {
    rawUrl,
    payeeVpa,
    payeeName,
    amount,
    currency,
  };
}

export function buildUpiUrl(intent: UpiPaymentIntent): string {
  const url = new URL('upi://pay');
  url.searchParams.set('pa', intent.payeeVpa);
  if (intent.payeeName) {
    url.searchParams.set('pn', intent.payeeName);
  }
  url.searchParams.set('am', intent.amount.toFixed(2));
  url.searchParams.set('cu', intent.currency);

  return url.toString();
}
