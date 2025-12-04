import { CurrencyCode } from '@nexus/shared-domain';
import { LoanDisbursementParsed, LedgerEntry } from './types';

/**
 * Parses a simple Indian loan disbursement SMS.
 * Example: "Credited ₹4,95,000 for Personal Loan of ₹5,00,000."
 */
export function parseLoanDisbursementSms(
  raw: string,
  currency: CurrencyCode = 'INR'
): LoanDisbursementParsed {
  // Normalize string: remove commas, currency symbols, and non-breaking spaces
  const cleaned = raw
    .replace(/₹/g, '')
    .replace(/,/g, '')
    .replace(/\u00A0/g, ' ');

  const numbers = cleaned.match(/(\d+\.?\d*)/g);

  if (!numbers || numbers.length < 2) {
    throw new Error('Could not parse credited and sanctioned amounts from the string.');
  }

  const creditedAmount = parseFloat(numbers[0]);
  const sanctionedAmount = parseFloat(numbers[1]);

  return {
    rawText: raw,
    creditedAmount,
    sanctionedAmount,
    currency,
  };
}

export interface TrueCostLoanParams {
  bankAccountId: string;
  loanLiabilityAccountId: string;
  processingFeeExpenseAccountId: string;
  gstExpenseAccountId: string;
  creditedAmount: number;
  sanctionedAmount: number;
  processingFeeGstRate: number; // e.g. 0.18 (18%)
}

export interface TrueCostLoanResult {
  entries: LedgerEntry[];
  effectiveProcessingFee: number;
  effectiveGstAmount: number;
}

export function buildTrueCostLoanEntries(params: TrueCostLoanParams): TrueCostLoanResult {
  const {
    bankAccountId,
    loanLiabilityAccountId,
    processingFeeExpenseAccountId,
    gstExpenseAccountId,
    creditedAmount,
    sanctionedAmount,
    processingFeeGstRate,
  } = params;

  const totalDiff = sanctionedAmount - creditedAmount;
  const fee = totalDiff / (1 + processingFeeGstRate);
  const gst = totalDiff - fee;

  const effectiveProcessingFee = Math.round(fee * 100) / 100;
  const effectiveGstAmount = Math.round(gst * 100) / 100;

  const entries: LedgerEntry[] = [
    // 1. Liability: Loan principal is a credit to the liability account
    {
      accountId: loanLiabilityAccountId,
      amount: sanctionedAmount,
      currency: 'INR',
      side: 'CREDIT',
      ledgerType: 'LIABILITY',
      meta: { note: 'Loan principal sanctioned' },
    },
    // 2. Asset: Cash received is a debit to the bank account
    {
      accountId: bankAccountId,
      amount: creditedAmount,
      currency: 'INR',
      side: 'DEBIT',
      ledgerType: 'ASSET',
      meta: { note: 'Loan amount credited to bank' },
    },
    // 3. Expense: Processing fee is a debit to an expense account
    {
      accountId: processingFeeExpenseAccountId,
      amount: effectiveProcessingFee,
      currency: 'INR',
      side: 'DEBIT',
      ledgerType: 'EXPENSE',
      meta: { note: 'Processing fee deducted' },
    },
    // 4. Expense: GST on processing fee is a debit to an expense account
    {
      accountId: gstExpenseAccountId,
      amount: effectiveGstAmount,
      currency: 'INR',
      side: 'DEBIT',
      ledgerType: 'EXPENSE',
      meta: { note: 'GST on processing fee' },
    },
  ];

  return {
    entries,
    effectiveProcessingFee,
    effectiveGstAmount,
  };
}
