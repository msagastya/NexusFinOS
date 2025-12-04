import { getDatabase } from '@core/index';
import { PendingUpiIntentModel } from '@core/db/models';
import { UpiPaymentIntent } from './types';
import { Q } from '@nozbe/watermelondb';

export async function savePendingIntent(intent: UpiPaymentIntent): Promise<void> {
  const db = getDatabase();
  await db.write(async () => {
    const collection = db.get<PendingUpiIntentModel>('pending_upi_intents');
    collection.create((record) => {
      record.payeeVpa = intent.payeeVpa;
      record.payeeName = intent.payeeName ?? null;
      record.amount = intent.amount;
      record.currency = intent.currency;
      record.suggestedCategoryId = intent.suggestedCategoryId ?? null;
      record.correlationKey = intent.correlationKey;
    });
  });
}

export async function getPendingIntents(
  limit = 10
): Promise<PendingUpiIntentModel[]> {
  const db = getDatabase();
  const collection = db.get<PendingUpiIntentModel>('pending_upi_intents');
  return await collection.query(Q.take(limit)).fetch();
}

export async function removePendingIntent(id: string): Promise<void> {
  const db = getDatabase();
  await db.write(async () => {
    const intent = await db.get<PendingUpiIntentModel>('pending_upi_intents').find(id);
    await intent.destroyPermanently();
  });
}
