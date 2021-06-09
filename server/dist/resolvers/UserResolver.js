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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const database_1 = require("../database");
const models_1 = require("../models");
const helpers_1 = require("../helpers");
let UserResolver = class UserResolver {
    async getUser(email) {
        const user = await database_1.User.findOne({ email });
        return user;
    }
    async updateUser(email, status) {
        const user = await database_1.User.findOne({ email });
        if (!user)
            return null;
        if (user.status === "admin")
            return null;
        user.status = status;
        const result = await user.save();
        return result;
    }
    async groupChatsCreated(user) {
        return user.groupChatsCreated.map(async (groupChatId) => await database_1.GroupChat.findById(groupChatId));
    }
    async getUsers(limit = 0, status) {
        let queryObj = {};
        if (status)
            queryObj = { status };
        const users = await database_1.User.find(queryObj).limit(limit);
        return users;
    }
    async searchUsers(text) {
        let queryObj = {};
        if (text != undefined) {
            const regex = new RegExp(helpers_1.escapeRegex(text), "gi");
            queryObj = { email: regex };
        }
        const users = await database_1.User.find(queryObj).limit(10);
        return users;
    }
};
__decorate([
    type_graphql_1.Query(() => models_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Authorized("admin"),
    type_graphql_1.Mutation(() => models_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("email")), __param(1, type_graphql_1.Arg("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "groupChatsCreated", null);
__decorate([
    type_graphql_1.Query(() => [models_1.User], { nullable: "itemsAndList" }),
    __param(0, type_graphql_1.Arg("limit", { nullable: true })),
    __param(1, type_graphql_1.Arg("status", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    type_graphql_1.Query(() => [models_1.User], { nullable: true }),
    __param(0, type_graphql_1.Arg("text", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "searchUsers", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(models_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map