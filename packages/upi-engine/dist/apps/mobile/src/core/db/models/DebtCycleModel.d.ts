import { Model } from '@nozbe/watermelondb';
export declare class DebtCycleModel extends Model {
    static table: string;
    fromAccountId: string;
    toAccountId: string;
    contactName: string;
    totalAmount: number;
    currency: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
