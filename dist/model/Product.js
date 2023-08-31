"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Category_1 = require("./Category");
class product {
}
exports.product = product;
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], product.prototype, "productId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], product.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: "-" }),
    __metadata("design:type", String)
], product.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => Category_1.category, type: () => String }),
    __metadata("design:type", Object)
], product.prototype, "category", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], product.prototype, "costPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], product.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], product.prototype, "stock", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], product.prototype, "sold", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], product.prototype, "file", void 0);
exports.ProductModel = (0, typegoose_1.getModelForClass)(product, {
    schemaOptions: { timestamps: true },
});
