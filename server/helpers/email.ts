import mailgun from "mailgun-js";
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

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY as string,
  domain: "ulinks.io",
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
    from: '"ULinks" <admin@ulinks.io>',
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
  mg.messages().send(mail, function (error, body) {
    if (error) console.log(error);
    console.log(body);
  });
};
