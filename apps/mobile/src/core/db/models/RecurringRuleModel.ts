import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class RecurringRuleModel extends Model {
  static table = 'recurring_rules';

  @field('name') name!: string;
  @field('type') type!: string;
  @field('amount') amount!: number;
  @field('currency') currency!: string;
  @field('day_of_month') dayOfMonth?: number;
  @field('cron_expression') cronExpression?: string;
  @field('linked_account_id') linkedAccountId?: string;
  @field('category_id') categoryId?: string;
  @field('active') active!: boolean;

  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
