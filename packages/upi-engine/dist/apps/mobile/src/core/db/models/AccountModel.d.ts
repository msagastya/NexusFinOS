import { Model } from '@nozbe/watermelondb';
export declare class AccountModel extends Model {
    static table: string;
    name: string;
    type: string;
    currency: string;
    isExcludedFromNetWorth: boolean;
    createdAt: Date;
    updatedAt: Date;
}
