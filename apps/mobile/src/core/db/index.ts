import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { databaseSchema } from './schema';
import { AccountModel } from './models/AccountModel';
import { TransactionModel } from './models/TransactionModel';
import { DebtCycleModel } from './models/DebtCycleModel';
import { RecurringRuleModel } from './models/RecurringRuleModel';
import { PayeeHistoryModel } from './models/PayeeHistoryModel';
import { PendingUpiIntentModel } from './models/PendingUpiIntentModel';

let database: Database | null = null;

export const getDatabase = (): Database => {
  if (!database) {
    const adapter = new SQLiteAdapter({
      schema: databaseSchema,
      dbName: 'nexus_finos.db',
      // NOTE: SQLCipher integration will be added later; keep this unencrypted for now.
    });

    database = new Database({
      adapter,
      modelClasses: [
        AccountModel,
        TransactionModel,
        DebtCycleModel,
        RecurringRuleModel,
        PayeeHistoryModel,
        PendingUpiIntentModel,
      ],
    });
  }

  return database;
};