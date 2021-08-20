interface EmailContent {
    subject: string;
    html: string;
    text: string;
}
export declare const emailTypeToContent: (type: string, verificationHash?: string) => Promise<EmailContent>;
export declare const sendEmail: (recipient: string, emailContent: EmailContent) => Promise<void>;
export {};
