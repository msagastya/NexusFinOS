var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';
export class RecurringRuleModel extends Model {
    static table = 'recurring_rules';
    ruleType; // EMI | SIP | CUSTOM_RECURRING
    sourceTransactionId;
    intervalMonths;
    nextExecutionDate;
    createdAt;
    updatedAt;
}
__decorate([
    field('rule_type'),
    __metadata("design:type", String)
], RecurringRuleModel.prototype, "ruleType", void 0);
__decorate([
    field('source_transaction_id'),
    __metadata("design:type", String)
], RecurringRuleModel.prototype, "sourceTransactionId", void 0);
__decorate([
    field('interval_months'),
    __metadata("design:type", Number)
], RecurringRuleModel.prototype, "intervalMonths", void 0);
__decorate([
    field('next_execution_date'),
    __metadata("design:type", Number)
], RecurringRuleModel.prototype, "nextExecutionDate", void 0);
__decorate([
    date('created_at'),
    __metadata("design:type", Date)
], RecurringRuleModel.prototype, "createdAt", void 0);
__decorate([
    date('updated_at'),
    __metadata("design:type", Date)
], RecurringRuleModel.prototype, "updatedAt", void 0);
