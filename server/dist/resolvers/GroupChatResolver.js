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
exports.GroupChatResolver = void 0;
const type_graphql_1 = require("type-graphql");
const database_1 = require("../database");
const models_1 = require("../models");
const inputs_1 = require("../inputs");
const Groupchat_1 = require("../models/Groupchat");
const helpers_1 = require("../helpers");
let GroupChatResolver = class GroupChatResolver {
    constructor() {
        this.pageSize = 8;
    }
    async getAllGroupChatIds() {
        const groupChats = await database_1.GroupChat.find();
        return {
            groupChats: groupChats.map((chat) => chat._id)
        };
    }
    async getGroupChats(page = 0) {
        const groupChats = await database_1.GroupChat.find().skip(page * this.pageSize).limit(this.pageSize);
        const totalCount = await database_1.GroupChat.find().countDocuments();
        if (totalCount === 0) {
            return {
                groupChats: [],
                totalPages: 0,
                pageNumber: 0
            };
        }
        return {
            groupChats,
            totalPages: Math.ceil(totalCount / this.pageSize) - 1,
            pageNumber: page
        };
    }
    async getGroupChatByStatus(status) {
        const GroupChat = await database_1.GroupChat.find({ status });
        return GroupChat;
    }
    async getGroupChat(id) {
        const GroupChat = await database_1.GroupChat.findOne({ _id: id });
        return GroupChat;
    }
    async searchGroupChats(campus, department, code, term, year, text, type, page = 0) {
        let queryObj = {};
        if (campus != undefined && campus !== "") {
            console.log(campus);
            queryObj = { ...queryObj, 'courseInformation.campus': campus };
        }
        if (department != undefined && department !== "") {
            queryObj = { ...queryObj, 'courseInformation.department': department };
        }
        if (code != undefined && code !== "") {
            queryObj = { ...queryObj, 'courseInformation.code': code };
        }
        if (term != undefined && term !== "") {
            queryObj = { ...queryObj, 'courseInformation.term': term };
        }
        if (year != undefined && year !== "") {
            queryObj = { ...queryObj, 'courseInformation.year': year };
        }
        if (text != undefined) {
            const regex = new RegExp(helpers_1.escapeRegex(text), 'gi');
            queryObj = { description: regex };
        }
        if (type != undefined) {
            queryObj = { ...queryObj, isCommunity: type };
        }
        const groupChats = await database_1.GroupChat.find(queryObj).skip(page * this.pageSize).limit(this.pageSize);
        const totalCount = await database_1.GroupChat.find(queryObj).countDocuments();
        console.log(groupChats, totalCount);
        if (totalCount === 0) {
            return {
                groupChats: [],
                totalPages: 0,
                pageNumber: 0
            };
        }
        return {
            groupChats,
            totalPages: Math.ceil(totalCount / this.pageSize) - 1,
            pageNumber: page
        };
    }
    async addGroupChat(email, groupchatInfo) {
        const user = database_1.User.findOne({ email });
        if (!user) {
            return null;
        }
        const newGroupChat = await database_1.GroupChat.create({ ...groupchatInfo });
        await database_1.User.updateOne({ email }, { $push: { groupChatsCreated: newGroupChat._id } });
        return newGroupChat;
    }
    async updateGroupChat(id, status) {
        const groupChat = await database_1.GroupChat.findOne({ _id: id });
        if (!groupChat) {
            return null;
        }
        groupChat.status = status;
        const result = await groupChat.save();
        return result;
    }
};
__decorate([
    type_graphql_1.Query(() => Groupchat_1.GroupChatIds),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupChatResolver.prototype, "getAllGroupChatIds", null);
__decorate([
    type_graphql_1.Query(() => Groupchat_1.GroupChatPaginiated),
    __param(0, type_graphql_1.Arg('page', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupChatResolver.prototype, "getGroupChats", null);
__decorate([
    type_graphql_1.Query(() => [models_1.GroupChat], { nullable: true }),
    __param(0, type_graphql_1.Arg('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupChatResolver.prototype, "getGroupChatByStatus", null);
__decorate([
    type_graphql_1.Query(() => models_1.GroupChat, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupChatResolver.prototype, "getGroupChat", null);
__decorate([
    type_graphql_1.Query(() => Groupchat_1.GroupChatPaginiated, { nullable: true }),
    __param(0, type_graphql_1.Arg('campus', { nullable: true })),
    __param(1, type_graphql_1.Arg('department', { nullable: true })),
    __param(2, type_graphql_1.Arg('code', { nullable: true })),
    __param(3, type_graphql_1.Arg('term', { nullable: true })),
    __param(4, type_graphql_1.Arg('year', { nullable: true })),
    __param(5, type_graphql_1.Arg('text', { nullable: true })),
    __param(6, type_graphql_1.Arg('isCommunity', { nullable: true })),
    __param(7, type_graphql_1.Arg('page', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Boolean, Number]),
    __metadata("design:returntype", Promise)
], GroupChatResolver.prototype, "searchGroupChats", null);
__decorate([
    type_graphql_1.Mutation(() => models_1.GroupChat, { nullable: true }),
    __param(0, type_graphql_1.Arg('email')), __param(1, type_graphql_1.Arg('info')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inputs_1.createGroupChatInput]),
    __metadata("design:returntype", Promise)
], GroupChatResolver.prototype, "addGroupChat", null);
__decorate([
    type_graphql_1.Mutation(() => models_1.GroupChat, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')), __param(1, type_graphql_1.Arg('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GroupChatResolver.prototype, "updateGroupChat", null);
GroupChatResolver = __decorate([
    type_graphql_1.Resolver(models_1.GroupChat)
], GroupChatResolver);
exports.GroupChatResolver = GroupChatResolver;
//# sourceMappingURL=GroupChatResolver.js.map