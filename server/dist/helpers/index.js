"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.generateRandomString = exports.escapeRegex = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
exports.escapeRegex = escapeRegex;
function generateRandomString() {
    return (Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15));
}
exports.generateRandomString = generateRandomString;
const sendEmail = async (recipient, url) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });
    const message = {
        from: "Sender Name <sender@example.com>",
        to: `Recipient <${recipient}>`,
        subject: "Verification email",
        html: `<html>
        <body>
        <p>Testing!</p>
        <a href="${url}">confirm email</a>
        </body>
        </html>`,
    };
    await transporter.sendMail(message);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=index.js.map