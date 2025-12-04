import { Model } from '@nozbe/watermelondb';
export declare class PendingUpiIntentModel extends Model {
    static table: string;
    payeeVpa: string;
    payeeName: string | null;
    amount: number;
    currency: string;
    suggestedCategoryId: string | null;
    correlationKey: string;
    createdAt: Date;
    updatedAt: Date;
}
