"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.emailTypeToContent = void 0;
const ejs_1 = __importDefault(require("ejs"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const path_1 = __importDefault(require("path"));
const HOSTNAME = process.env.NODE_ENV === "production"
    ? "https://ulinks.io"
    : "http://localhost:3000";
const mg = mailgun_js_1.default({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: "ulinks.io",
});
const emailTypeToContent = async (type, verificationHash = "") => {
    const emailContent = {
        subject: "",
        html: "",
        text: "",
    };
    if (type === "confirmEmail") {
        emailContent.subject = "Verify Email";
        emailContent.html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "..", "templates/verifyEmail.ejs"), {
            link: `${HOSTNAME}/verify/${verificationHash}`,
            image: `https://user-images.githubusercontent.com/45128231/127544410-c38a01c4-c2c1-408a-935d-ff9545ddaf94.png`,
        });
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
    mg.messages().send(mail, function (error, body) {
        if (error)
            console.log(error);
        console.log(body);
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map