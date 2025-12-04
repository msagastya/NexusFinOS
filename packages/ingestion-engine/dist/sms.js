import { parseLoanDisbursementSms } from '@nexus/finance-engine/loan';
function normalizeSmsText(body) {
    return body.replace(/\s+/g, ' ').trim();
}
function tryParseLoanDisbursal(body, currency) {
    try {
        const parsed = parseLoanDisbursementSms(body, currency);
        return {
            kind: 'LOAN_DISBURSAL',
            creditedAmount: parsed.creditedAmount,
            sanctionedAmount: parsed.sanctionedAmount,
            currency: parsed.currency,
        };
    }
    catch (error) {
        return null;
    }
}
function tryParseUpiDebit(body, currency) {
    const lowerBody = body.toLowerCase();
    if (!lowerBody.includes('upi') || !lowerBody.includes('debited')) {
        return null;
    }
    // Regex to find amount (e.g., Rs. 1,234.00, Rs.1234, 1234.00)
    const amountRegex = /(?:Rs\.?|₹)\s*([\d,]+\.?\d*)/i;
    const amountMatch = body.match(amountRegex);
    if (!amountMatch || !amountMatch[1]) {
        return null;
    }
    const amount = parseFloat(amountMatch[1].replace(/,/g, ''));
    // Regex to find VPA
    const vpaRegex = /to\s+([\w.-]+@[\w.-]+)/i;
    const vpaMatch = body.match(vpaRegex);
    const vpa = vpaMatch ? vpaMatch[1] : null;
    return {
        kind: 'UPI_DEBIT',
        amount,
        currency,
        vpa,
        merchantName: null, // Placeholder for now
    };
}
export function parseSmsMessage(context, defaultCurrency = 'INR') {
    const body = normalizeSmsText(context.body);
    // 1) Try loan disbursal
    const loan = tryParseLoanDisbursal(body, defaultCurrency);
    if (loan) {
        return {
            context,
            payload: loan,
        };
    }
    // 2) Try UPI debit pattern
    const upiDebit = tryParseUpiDebit(body, defaultCurrency);
    if (upiDebit) {
        return {
            context,
            payload: upiDebit,
        };
    }
    // 3) Unknown
    return {
        context,
        payload: { kind: 'UNKNOWN' },
    };
}
