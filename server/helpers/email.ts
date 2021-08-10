import ejs from "ejs";
import mailgun from "mailgun-js";
import path from "path";

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

export const emailTypeToContent = async (
  type: string,
  verificationHash: string = ""
): Promise<EmailContent> => {
  const emailContent: EmailContent = {
    subject: "",
    html: "",
    text: "",
  };
  if (type === "confirmEmail") {
    emailContent.subject = "Verify Email";
    emailContent.html = await ejs.renderFile(
      path.join(__dirname, "..", "templates/verifyEmail.ejs"),
      {
        link: `${HOSTNAME}/verify/${verificationHash}`,
        image: `https://user-images.githubusercontent.com/45128231/127544410-c38a01c4-c2c1-408a-935d-ff9545ddaf94.png`,
      }
    );
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
