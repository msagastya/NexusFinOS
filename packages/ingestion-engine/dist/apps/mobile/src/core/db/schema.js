import { appSchema, tableSchema } from '@nozbe/watermelondb';
export const databaseSchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'accounts',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'type', type: 'string' }, // "BANK" | "WALLET" | "SHADOW"
                { name: 'currency', type: 'string' },
                { name: 'is_excluded_from_networth', type: 'boolean' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'transactions',
            columns: [
                { name: 'account_id', type: 'string', isIndexed: true },
                { name: 'amount', type: 'number' },
                { name: 'currency', type: 'string' },
                { name: 'kind', type: 'string' }, // "DEBIT" | "CREDIT"
                { name: 'status', type: 'string' }, // "PENDING" | "CLEARED" | "FAILED"
                { name: 'timestamp', type: 'number' },
                { name: 'description', type: 'string', isOptional: true },
                { name: 'split_group_id', type: 'string', isOptional: true },
                { name: 'geo_location', type: 'string', isOptional: true },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'debt_cycles',
            columns: [
                { name: 'contact_phone', type: 'string' },
                { name: 'direction', type: 'string' }, // 'LEND' | 'BORROW'
                { name: 'total', type: 'number' },
                { name: 'remaining', type: 'number' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'recurring_rules',
            columns: [
                { name: 'rule_type', type: 'string' }, // EMI | SIP | CUSTOM_RECURRING
                { name: 'source_transaction_id', type: 'string' },
                { name: 'interval_months', type: 'number' },
                { name: 'next_execution_date', type: 'number' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'payee_history',
            columns: [
                { name: 'payee_vpa', type: 'string', isIndexed: true },
                { name: 'payee_name', type: 'string', isOptional: true },
                { name: 'suggested_category_id', type: 'string', isOptional: true },
                { name: 'last_used_at', type: 'number' },
                { name: 'total_transactions_count', type: 'number' },
                { name: 'total_volume', type: 'number' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'pending_upi_intents',
            columns: [
                { name: 'payee_vpa', type: 'string' },
                { name: 'payee_name', type: 'string', isOptional: true },
                { name: 'amount', type: 'number' },
                { name: 'currency', type: 'string' },
                { name: 'suggested_category_id', type: 'string', isOptional: true },
                { name: 'correlation_key', type: 'string', isIndexed: true },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
    ],
});
