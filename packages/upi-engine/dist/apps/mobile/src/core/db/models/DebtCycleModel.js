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
export class DebtCycleModel extends Model {
    static table = 'debt_cycles';
    fromAccountId;
    toAccountId;
    contactName;
    totalAmount;
    currency;
    status;
    createdAt;
    updatedAt;
}
__decorate([
    field('from_account_id'),
    __metadata("design:type", String)
], DebtCycleModel.prototype, "fromAccountId", void 0);
__decorate([
    field('to_account_id'),
    __metadata("design:type", String)
], DebtCycleModel.prototype, "toAccountId", void 0);
__decorate([
    field('contact_name'),
    __metadata("design:type", String)
], DebtCycleModel.prototype, "contactName", void 0);
__decorate([
    field('total_amount'),
    __metadata("design:type", Number)
], DebtCycleModel.prototype, "totalAmount", void 0);
__decorate([
    field('currency'),
    __metadata("design:type", String)
], DebtCycleModel.prototype, "currency", void 0);
__decorate([
    field('status'),
    __metadata("design:type", String)
], DebtCycleModel.prototype, "status", void 0);
__decorate([
    date('created_at'),
    __metadata("design:type", Date)
], DebtCycleModel.prototype, "createdAt", void 0);
__decorate([
    date('updated_at'),
    __metadata("design:type", Date)
], DebtCycleModel.prototype, "updatedAt", void 0);
