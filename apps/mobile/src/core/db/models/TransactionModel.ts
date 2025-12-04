import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class TransactionModel extends Model {
  static table = 'transactions';

  @field('account_id') accountId!: string;
  @field('amount') amount!: number;
  @field('currency') currency!: string;
  @field('kind') kind!: string;
  @field('status') status!: string;
  @date('timestamp') timestamp!: Date;
  @field('description') description?: string;
  @field('split_group_id') splitGroupId?: string;
  @field('geo_location') geoLocation?: string;

  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
