"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.emailTypeToContent = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const constants_1 = require("./constants");
const HOSTNAME = process.env.NODE_ENV === "production"
    ? "https://ulinks.io"
    : "http://localhost:3000";
const transporter = process.env.NODE_ENV === "production"
    ? nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.NODEMAILER_EMAIL,
            serviceClient: process.env.SERVICE_CLIENT,
            privateKey: process.env.PRIVATE_KEY,
        },
    })
    : nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });
const emailTypeToContent = (type, verificationHash = "") => {
    const emailContent = {
        subject: "",
        html: "",
        text: "",
    };
    if (type === "confirmEmail") {
        emailContent.subject = "Verify Email";
        emailContent.html = constants_1.verifyEmail(`${HOSTNAME}/verify/${verificationHash}`);
        emailContent.text = `Thanks for signing up to ULinks.io! To get started creating group chat entries, click this link to verify your email: ${HOSTNAME}/verify/${verificationHash}`;
    }
    return emailContent;
};
exports.emailTypeToContent = emailTypeToContent;
function getMail(recipient, subject, emailHtml, emailText) {
    return {
        from: '"ULinks" <admin@ulinks.io>',
        to: recipient,
        subject: `ULinks - ${subject}`,
        text: emailText,
        html: emailHtml,
    };
}
const sendEmail = async (recipient, emailContent) => {
    const mail = getMail(recipient, emailContent.subject, emailContent.html, emailContent.text);
    const result = await transporter.sendMail(mail);
    console.log(result);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map