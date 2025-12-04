import { Model } from '@nozbe/watermelondb';
export declare class RecurringRuleModel extends Model {
    static table: string;
    ruleType: string;
    sourceTransactionId: string;
    intervalMonths: number;
    nextExecutionDate: number;
    createdAt: Date;
    updatedAt: Date;
}
