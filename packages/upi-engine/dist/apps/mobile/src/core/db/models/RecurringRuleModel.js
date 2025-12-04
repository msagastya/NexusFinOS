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
    name;
    type;
    amount;
    currency;
    dayOfMonth;
    cronExpression;
    linkedAccountId;
    categoryId;
    active;
    createdAt;
    updatedAt;
}
__decorate([
    field('name'),
    __metadata("design:type", String)
], RecurringRuleModel.prototype, "name", void 0);
__decorate([
    field('type'),
    __metadata("design:type", String)
], RecurringRuleModel.prototype, "type", void 0);
__decorate([
    field('amount'),
    __metadata("design:type", Number)
], RecurringRuleModel.prototype, "amount", void 0);
__decorate([
    field('currency'),
    __metadata("design:type", String)
], RecurringRuleModel.prototype, "currency", void 0);
__decorate([
    field('day_of_month'),
    __metadata("design:type", Number)
], RecurringRuleModel.prototype, "dayOfMonth", void 0);
__decorate([
    field('cron_expression'),
    __metadata("design:type", String)
], RecurringRuleModel.prototype, "cronExpression", void 0);
__decorate([
    field('linked_account_id'),
    __metadata("design:type", String)
], RecurringRuleModel.prototype, "linkedAccountId", void 0);
__decorate([
    field('category_id'),
    __metadata("design:type", String)
], RecurringRuleModel.prototype, "categoryId", void 0);
__decorate([
    field('active'),
    __metadata("design:type", Boolean)
], RecurringRuleModel.prototype, "active", void 0);
__decorate([
    date('created_at'),
    __metadata("design:type", Date)
], RecurringRuleModel.prototype, "createdAt", void 0);
__decorate([
    date('updated_at'),
    __metadata("design:type", Date)
], RecurringRuleModel.prototype, "updatedAt", void 0);
