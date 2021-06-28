import nodemailer from "nodemailer";
export function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export function generateRandomString(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
export const sendEmail = async (recipient: string, url: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const message = {
    from: "Sender Name <atechson@gmail.com>",
    to: `Recipient <${recipient}>`,
    subject: "Verification email",
    html: `<html>
        <body>
        <p>Testing!</p>
        <a href="${url}">confirm email</a>
        </body>
        </html>`,
  };

  const result = await transporter.sendMail(message);
  console.log(result);
};
