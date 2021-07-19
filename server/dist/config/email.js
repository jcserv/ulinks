"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const { OAuth2 } = googleapis_1.google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const getTransporter = async () => {
    if (process.env.NODE_ENV === "production") {
        const accessToken = await oauth2Client.getAccessToken();
        return nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.NODEMAILER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
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