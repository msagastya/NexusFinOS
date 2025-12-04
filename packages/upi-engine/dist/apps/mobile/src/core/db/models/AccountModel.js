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
export class AccountModel extends Model {
    static table = 'accounts';
    name;
    type;
    currency;
    isExcludedFromNetWorth;
    createdAt;
    updatedAt;
}
__decorate([
    field('name'),
    __metadata("design:type", String)
], AccountModel.prototype, "name", void 0);
__decorate([
    field('type'),
    __metadata("design:type", String)
], AccountModel.prototype, "type", void 0);
__decorate([
    field('currency'),
    __metadata("design:type", String)
], AccountModel.prototype, "currency", void 0);
__decorate([
    field('is_excluded_from_networth'),
    __metadata("design:type", Boolean)
], AccountModel.prototype, "isExcludedFromNetWorth", void 0);
__decorate([
    date('created_at'),
    __metadata("design:type", Date)
], AccountModel.prototype, "createdAt", void 0);
__decorate([
    date('updated_at'),
    __metadata("design:type", Date)
], AccountModel.prototype, "updatedAt", void 0);
