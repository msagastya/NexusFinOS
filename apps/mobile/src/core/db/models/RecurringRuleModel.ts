import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class RecurringRuleModel extends Model {
  static table = 'recurring_rules';

  @field('rule_type') ruleType!: string; // EMI | SIP | CUSTOM_RECURRING
  @field('source_transaction_id') sourceTransactionId!: string;
  @field('interval_months') intervalMonths!: number;
  @field('next_execution_date') nextExecutionDate!: number;

  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
