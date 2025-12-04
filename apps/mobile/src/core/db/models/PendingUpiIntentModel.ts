import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class PendingUpiIntentModel extends Model {
  static table = 'pending_upi_intents';

  @field('payee_vpa') payeeVpa!: string;
  @field('payee_name') payeeName!: string | null;
  @field('amount') amount!: number;
  @field('currency') currency!: string;
  @field('suggested_category_id') suggestedCategoryId!: string | null;
  @field('correlation_key') correlationKey!: string;
  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
