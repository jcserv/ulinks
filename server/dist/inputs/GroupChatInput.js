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
exports.createGroupChatInput = exports.courseInformationInput = void 0;
const type_graphql_1 = require("type-graphql");
let courseInformationInput = class courseInformationInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], courseInformationInput.prototype, "campus", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], courseInformationInput.prototype, "department", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], courseInformationInput.prototype, "code", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], courseInformationInput.prototype, "term", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], courseInformationInput.prototype, "year", void 0);
courseInformationInput = __decorate([
    type_graphql_1.InputType()
], courseInformationInput);
exports.courseInformationInput = courseInformationInput;
let createGroupChatInput = class createGroupChatInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], createGroupChatInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], createGroupChatInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], createGroupChatInput.prototype, "isCommunity", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], createGroupChatInput.prototype, "links", void 0);
__decorate([
    type_graphql_1.Field(() => courseInformationInput, { nullable: true }),
    __metadata("design:type", courseInformationInput)
], createGroupChatInput.prototype, "courseInformation", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], createGroupChatInput.prototype, "status", void 0);
createGroupChatInput = __decorate([
    type_graphql_1.InputType()
], createGroupChatInput);
exports.createGroupChatInput = createGroupChatInput;
//# sourceMappingURL=GroupChatInput.js.map