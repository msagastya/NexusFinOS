import { URL } from 'whatwg-url';
export function parseUpiUrl(rawUrl, defaultCurrency = 'INR') {
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
    const currency = params.get('cu') || defaultCurrency;
    return {
        rawUrl,
        payeeVpa,
        payeeName,
        amount,
        currency,
    };
}
export function buildUpiUrl(intent) {
    const url = new URL('upi://pay');
    url.searchParams.set('pa', intent.payeeVpa);
    if (intent.payeeName) {
        url.searchParams.set('pn', intent.payeeName);
    }
    url.searchParams.set('am', intent.amount.toFixed(2));
    url.searchParams.set('cu', intent.currency);
    return url.toString();
}
