import { v4 as uuidv4 } from 'uuid'; // Assuming uuid is available
// Helper to create a base transaction
const createBaseTransaction = (accountId, amount, currency, timestamp, kind) => ({
    id: uuidv4(),
    accountId,
    amount,
    currency,
    kind,
    status: 'CLEARED', // Pure functions assume cleared status
    timestamp,
    createdAt: timestamp,
    updatedAt: timestamp,
});
export function buildSplitExpenseTransactions(input, timestamp = new Date()) {
    const { payingAccountId, totalAmount, currency, splits } = input;
    const splitGroupId = uuidv4();
    // 1. The real transaction from the user's actual bank/wallet account
    const realTransaction = createBaseTransaction(payingAccountId, totalAmount, currency, timestamp, 'DEBIT' // Money is leaving the account
    );
    realTransaction.description = 'Group expense payment';
    realTransaction.splitGroupId = splitGroupId;
    const syntheticTransactions = [];
    for (const split of splits) {
        // This is the user's own share of the expense
        if (split.categoryId) {
            const userShareTx = createBaseTransaction(payingAccountId, // Associated with the user's real account
            split.shareAmount, currency, timestamp, 'DEBIT');
            userShareTx.description = `Expense share: ${split.categoryId}`;
            userShareTx.splitGroupId = splitGroupId;
            // This might be better modeled as a ledger entry, but using Transaction for now
            syntheticTransactions.push(userShareTx);
        }
        // This is the share owed by a friend (a receivable)
        if (split.counterpartyAccountId) {
            const receivableTx = createBaseTransaction(split.counterpartyAccountId, split.shareAmount, currency, timestamp, 'CREDIT' // Creates or increases a receivable asset
            );
            receivableTx.description = `Receivable from ${split.counterpartyName || 'Friend'}`;
            receivableTx.splitGroupId = splitGroupId;
            syntheticTransactions.push(receivableTx);
        }
    }
    return { realTransaction, syntheticTransactions };
}
export function buildSettlementTransactions(input, timestamp = new Date()) {
    const { bankAccountId, receivableAccountId, amount, currency } = input;
    const settlementGroupId = uuidv4();
    // Friend pays you back, so money comes INTO your bank account
    const bankTransaction = createBaseTransaction(bankAccountId, amount, currency, timestamp, 'CREDIT');
    bankTransaction.description = 'Settlement received';
    bankTransaction.splitGroupId = settlementGroupId;
    // The receivable asset is now reduced by the amount paid back
    const receivableTransaction = createBaseTransaction(receivableAccountId, -amount, // Reducing the asset
    currency, timestamp, 'DEBIT');
    receivableTransaction.description = 'Settlement against receivable';
    receivableTransaction.splitGroupId = settlementGroupId;
    return { bankTransaction, receivableTransaction };
}
