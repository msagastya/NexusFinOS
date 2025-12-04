import { PendingUpiIntentModel } from '@core/db/models';
import { UpiPaymentIntent } from './types';
export declare function savePendingIntent(intent: UpiPaymentIntent): Promise<void>;
export declare function getPendingIntents(limit?: number): Promise<PendingUpiIntentModel[]>;
export declare function removePendingIntent(id: string): Promise<void>;
