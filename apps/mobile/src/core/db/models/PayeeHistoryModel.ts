import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class PayeeHistoryModel extends Model {
  static table = 'payee_history';

  @field('payee_vpa') payeeVpa!: string;
  @field('payee_name') payeeName!: string | null;
  @field('suggested_category_id') suggestedCategoryId!: string | null;
  @date('last_used_at') lastUsedAt!: Date;
  @field('total_transactions_count') totalTransactionsCount!: number;
  @field('total_volume') totalVolume!: number;
  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
