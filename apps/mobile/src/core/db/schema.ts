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
        { name: 'from_account_id', type: 'string', isIndexed: true },
        { name: 'to_account_id', type: 'string', isIndexed: true },
        { name: 'contact_name', type: 'string' },
        { name: 'total_amount', type: 'number' },
        { name: 'currency', type: 'string' },
        { name: 'status', type: 'string' }, // "ACTIVE" | "SETTLED"
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'recurring_rules',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' }, // "EMI" | "SIP" | "SUBSCRIPTION" | "OTHER"
        { name: 'amount', type: 'number' },
        { name: 'currency', type: 'string' },
        { name: 'day_of_month', type: 'number', isOptional: true },
        { name: 'cron_expression', type: 'string', isOptional: true },
        { name: 'linked_account_id', type: 'string', isOptional: true },
        { name: 'category_id', type: 'string', isOptional: true },
        { name: 'active', type: 'boolean' },
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