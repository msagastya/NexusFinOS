import { v4 as uuidv4 } from 'uuid';
export function buildTransferTransactions(input) {
    const { fromAccountId, toAccountId, amount, currency, timestamp, description } = input;
    const splitGroupId = uuidv4();
    const fromTransaction = {
        id: uuidv4(),
        accountId: fromAccountId,
        amount: -amount, // Negative amount for debit
        currency,
        kind: 'DEBIT',
        status: 'CLEARED',
        timestamp,
        description: description || 'Transfer to another account',
        splitGroupId,
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    const toTransaction = {
        id: uuidv4(),
        accountId: toAccountId,
        amount: amount, // Positive amount for credit
        currency,
        kind: 'CREDIT',
        status: 'CLEARED',
        timestamp,
        description: description || 'Transfer from another account',
        splitGroupId,
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    return { fromTransaction, toTransaction };
}
/**
 * Validates that a set of transactions that are part of a single transfer
 * are balanced (i.e., their amounts sum to zero).
 */
export function validateTransfers(transactions) {
    if (transactions.length === 0) {
        return true;
    }
    const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    // Use a small epsilon for floating point comparison
    return Math.abs(total) < 0.001;
}
