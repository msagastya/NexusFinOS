import { Model } from '@nozbe/watermelondb';
export declare class RecurringRuleModel extends Model {
    static table: string;
    name: string;
    type: string;
    amount: number;
    currency: string;
    dayOfMonth?: number;
    cronExpression?: string;
    linkedAccountId?: string;
    categoryId?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
