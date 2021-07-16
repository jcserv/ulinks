import nodemailer from "nodemailer";

interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

const HOSTNAME =
  process.env.NODE_ENV === "production"
    ? "https://ulinks.io/"
    : "http://localhost:3000/";

const transporter = nodemailer.createTransport({
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
    emailContent.html = `Thanks for signing up to Ulinks.io! <br> To get started creating group chat entries, click this link to verify your email: <br> ${HOSTNAME}/verify/${verificationHash}`;
    emailContent.text = `Thanks for signing up to Ulinks.io! To get started creating group chat entries, click this link to verify your email: ${HOSTNAME}/verify/${verificationHash}`;
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
    from: '"Ulinks" <no.reply@ulinks.io>', // TODO: create an email
    to: recipient,
    subject: `Ulinks - ${subject}`,
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
