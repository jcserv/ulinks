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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const models_1 = require("../models");
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
let AuthenticationResolver = class AuthenticationResolver {
    async me() {
        return "Hello";
    }
    async login(email, password) {
        const user = await database_1.User.findOne({ email });
        if (!user) {
            return {
                status: "NO_USER_FOUND",
            };
        }
        const valid = await bcrypt_1.default.compare(password, user.password);
        if (!valid || user.status === "banned") {
            return {
                status: "INVALID",
            };
        }
        return {
            status: "OK",
            jwtToken: jsonwebtoken_1.default.sign({ email, status: `${user.status}` }, `${process.env.SECRET}`, { expiresIn: "1y" }),
        };
    }
    async signup(email, password) {
        const user = await database_1.User.findOne({ email });
        if (user) {
            return {
                status: "USER_EXISTS",
            };
        }
        const newUser = await database_1.User.create({
            email,
            password: await bcrypt_1.default.hash(password, 10),
            groupChatsCreated: [],
        });
        return {
            status: "OK",
            jwtToken: jsonwebtoken_1.default.sign({ email, status: `${newUser.status}` }, `${process.env.SECRET}`, { expiresIn: "1y" }),
        };
    }
};
__decorate([
    type_graphql_1.Authorized("user"),
    type_graphql_1.Query(() => String, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthenticationResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => models_1.AuthenticationMsg),
    __param(0, type_graphql_1.Arg("email")), __param(1, type_graphql_1.Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => models_1.AuthenticationMsg),
    __param(0, type_graphql_1.Arg("email")), __param(1, type_graphql_1.Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationResolver.prototype, "signup", null);
AuthenticationResolver = __decorate([
    type_graphql_1.Resolver()
], AuthenticationResolver);
exports.AuthenticationResolver = AuthenticationResolver;
//# sourceMappingURL=AuthenticationResolver.js.map