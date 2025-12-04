import { Model } from '@nozbe/watermelondb';
export declare class PayeeHistoryModel extends Model {
    static table: string;
    payeeVpa: string;
    payeeName: string | null;
    suggestedCategoryId: string | null;
    lastUsedAt: Date;
    totalTransactionsCount: number;
    totalVolume: number;
    createdAt: Date;
    updatedAt: Date;
}
