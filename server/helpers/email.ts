import nodemailer from "nodemailer";

import { verifyEmail } from "./constants";

interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

const HOSTNAME =
  process.env.NODE_ENV === "production"
    ? "https://ulinks.io"
    : "http://localhost:3000";

const transporter =
  process.env.NODE_ENV === "production"
    ? nodemailer.createTransport({
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
    : nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

export const emailTypeToContent = (
  type: string,
  verificationHash: string = ""
): EmailContent => {
  const emailContent: EmailContent = {
    subject: "",
    html: "",
    text: "",
  };

  if (type === "confirmEmail") {
    emailContent.subject = "Verify Email";
    emailContent.html = verifyEmail(`${HOSTNAME}/verify/${verificationHash}`);
    emailContent.text = `Thanks for signing up to ULinks.io! To get started creating group chat entries, click this link to verify your email: ${HOSTNAME}/verify/${verificationHash}`;
  }
  return emailContent;
};

function getMail(
  recipient: string,
  subject: string,
  emailHtml: string,
  emailText: string
) {
  return {
    from: '"ULinks" <admin@ulinks.io>', // TODO: create an email
    to: recipient,
    subject: `ULinks - ${subject}`,
    text: emailText,
    html: emailHtml,
  };
}

export const sendEmail = async (
  recipient: string,
  emailContent: EmailContent
) => {
  const mail = getMail(
    recipient,
    emailContent.subject,
    emailContent.html,
    emailContent.text
  );
  const result = await transporter.sendMail(mail);
  console.log(result);
};
