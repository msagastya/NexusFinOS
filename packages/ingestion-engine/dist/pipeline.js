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
