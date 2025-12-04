import { CurrencyCode } from '@nexus/shared-domain';
import { LoanDisbursementParsed, LedgerEntry } from './types';
/**
 * Parses a simple Indian loan disbursement SMS.
 * Example: "Credited ₹4,95,000 for Personal Loan of ₹5,00,000."
 */
export declare function parseLoanDisbursementSms(raw: string, currency?: CurrencyCode): LoanDisbursementParsed;
export interface TrueCostLoanParams {
    bankAccountId: string;
    loanLiabilityAccountId: string;
    processingFeeExpenseAccountId: string;
    gstExpenseAccountId: string;
    creditedAmount: number;
    sanctionedAmount: number;
    processingFeeGstRate: number;
}
export interface TrueCostLoanResult {
    entries: LedgerEntry[];
    effectiveProcessingFee: number;
    effectiveGstAmount: number;
}
export declare function buildTrueCostLoanEntries(params: TrueCostLoanParams): TrueCostLoanResult;
