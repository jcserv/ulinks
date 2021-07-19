"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const getTransporter = async () => {
    if (process.env.NODE_ENV === "production") {
        return nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });
    }
    return nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });
};
exports.getTransporter = getTransporter;
//# sourceMappingURL=email.js.map