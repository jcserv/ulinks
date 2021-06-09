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
exports.GroupChatPaginiated = exports.GroupChatIds = exports.GroupChat = exports.CourseInformation = void 0;
const type_graphql_1 = require("type-graphql");
let CourseInformation = class CourseInformation {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CourseInformation.prototype, "campus", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CourseInformation.prototype, "department", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CourseInformation.prototype, "code", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CourseInformation.prototype, "term", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CourseInformation.prototype, "year", void 0);
CourseInformation = __decorate([
    type_graphql_1.ObjectType()
], CourseInformation);
exports.CourseInformation = CourseInformation;
let GroupChat = class GroupChat {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GroupChat.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GroupChat.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GroupChat.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], GroupChat.prototype, "links", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GroupChat.prototype, "isCommunity", void 0);
__decorate([
    type_graphql_1.Field(() => CourseInformation, { nullable: true }),
    __metadata("design:type", CourseInformation)
], GroupChat.prototype, "courseInformation", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GroupChat.prototype, "status", void 0);
GroupChat = __decorate([
    type_graphql_1.ObjectType()
], GroupChat);
exports.GroupChat = GroupChat;
let GroupChatIds = class GroupChatIds {
};
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], GroupChatIds.prototype, "groupChats", void 0);
GroupChatIds = __decorate([
    type_graphql_1.ObjectType()
], GroupChatIds);
exports.GroupChatIds = GroupChatIds;
let GroupChatPaginiated = class GroupChatPaginiated {
};
__decorate([
    type_graphql_1.Field(() => [GroupChat], { nullable: "itemsAndList" }),
    __metadata("design:type", Array)
], GroupChatPaginiated.prototype, "groupChats", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GroupChatPaginiated.prototype, "totalPages", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GroupChatPaginiated.prototype, "pageNumber", void 0);
GroupChatPaginiated = __decorate([
    type_graphql_1.ObjectType()
], GroupChatPaginiated);
exports.GroupChatPaginiated = GroupChatPaginiated;
//# sourceMappingURL=Groupchat.js.map