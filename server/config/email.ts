import nodemailer from "nodemailer";
import { google } from "googleapis";
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const getTransporter = async () => {
  if (process.env.NODE_ENV === "production") {
    const accessToken = await oauth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.NODEMAILER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken as string,
      },
    });
  }
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
};
