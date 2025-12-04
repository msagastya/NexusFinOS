import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class DebtCycleModel extends Model {
  static table = 'debt_cycles';

  @field('contact_phone') contactPhone!: string;
  @field('direction') direction!: string; // 'LEND' | 'BORROW'
  @field('total') total!: number;
  @field('remaining') remaining!: number;

  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
