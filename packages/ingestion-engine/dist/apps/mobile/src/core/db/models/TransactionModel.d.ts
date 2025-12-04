import { Model } from '@nozbe/watermelondb';
export declare class TransactionModel extends Model {
    static table: string;
    accountId: string;
    amount: number;
    currency: string;
    kind: string;
    status: string;
    timestamp: Date;
    description?: string;
    splitGroupId?: string;
    geoLocation?: string;
    createdAt: Date;
    updatedAt: Date;
}
