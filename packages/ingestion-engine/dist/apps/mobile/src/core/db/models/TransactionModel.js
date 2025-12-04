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
export class TransactionModel extends Model {
    static table = 'transactions';
    accountId;
    amount;
    currency;
    kind;
    status;
    timestamp;
    description;
    splitGroupId;
    geoLocation;
    createdAt;
    updatedAt;
}
__decorate([
    field('account_id'),
    __metadata("design:type", String)
], TransactionModel.prototype, "accountId", void 0);
__decorate([
    field('amount'),
    __metadata("design:type", Number)
], TransactionModel.prototype, "amount", void 0);
__decorate([
    field('currency'),
    __metadata("design:type", String)
], TransactionModel.prototype, "currency", void 0);
__decorate([
    field('kind'),
    __metadata("design:type", String)
], TransactionModel.prototype, "kind", void 0);
__decorate([
    field('status'),
    __metadata("design:type", String)
], TransactionModel.prototype, "status", void 0);
__decorate([
    date('timestamp'),
    __metadata("design:type", Date)
], TransactionModel.prototype, "timestamp", void 0);
__decorate([
    field('description'),
    __metadata("design:type", String)
], TransactionModel.prototype, "description", void 0);
__decorate([
    field('split_group_id'),
    __metadata("design:type", String)
], TransactionModel.prototype, "splitGroupId", void 0);
__decorate([
    field('geo_location'),
    __metadata("design:type", String)
], TransactionModel.prototype, "geoLocation", void 0);
__decorate([
    date('created_at'),
    __metadata("design:type", Date)
], TransactionModel.prototype, "createdAt", void 0);
__decorate([
    date('updated_at'),
    __metadata("design:type", Date)
], TransactionModel.prototype, "updatedAt", void 0);
