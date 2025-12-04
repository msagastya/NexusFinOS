import { Model } from '@nozbe/watermelondb';
export declare class DebtCycleModel extends Model {
    static table: string;
    contactPhone: string;
    direction: string;
    total: number;
    remaining: number;
    createdAt: Date;
    updatedAt: Date;
}
