import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class DebtCycleModel extends Model {
  static table = 'debt_cycles';

  @field('from_account_id') fromAccountId!: string;
  @field('to_account_id') toAccountId!: string;
  @field('contact_name') contactName!: string;
  @field('total_amount') totalAmount!: number;
  @field('currency') currency!: string;
  @field('status') status!: string;

  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
