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
export class PayeeHistoryModel extends Model {
    static table = 'payee_history';
    payeeVpa;
    payeeName;
    suggestedCategoryId;
    lastUsedAt;
    totalTransactionsCount;
    totalVolume;
    createdAt;
    updatedAt;
}
__decorate([
    field('payee_vpa'),
    __metadata("design:type", String)
], PayeeHistoryModel.prototype, "payeeVpa", void 0);
__decorate([
    field('payee_name'),
    __metadata("design:type", Object)
], PayeeHistoryModel.prototype, "payeeName", void 0);
__decorate([
    field('suggested_category_id'),
    __metadata("design:type", Object)
], PayeeHistoryModel.prototype, "suggestedCategoryId", void 0);
__decorate([
    date('last_used_at'),
    __metadata("design:type", Date)
], PayeeHistoryModel.prototype, "lastUsedAt", void 0);
__decorate([
    field('total_transactions_count'),
    __metadata("design:type", Number)
], PayeeHistoryModel.prototype, "totalTransactionsCount", void 0);
__decorate([
    field('total_volume'),
    __metadata("design:type", Number)
], PayeeHistoryModel.prototype, "totalVolume", void 0);
__decorate([
    date('created_at'),
    __metadata("design:type", Date)
], PayeeHistoryModel.prototype, "createdAt", void 0);
__decorate([
    date('updated_at'),
    __metadata("design:type", Date)
], PayeeHistoryModel.prototype, "updatedAt", void 0);
