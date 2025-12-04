import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class AccountModel extends Model {
  static table = 'accounts';

  @field('name') name!: string;
  @field('type') type!: string;
  @field('currency') currency!: string;
  @field('is_excluded_from_networth') isExcludedFromNetWorth!: boolean;

  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
