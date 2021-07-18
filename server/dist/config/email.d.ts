import nodemailer from "nodemailer";
export declare const getTransporter: () => Promise<nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>>;
