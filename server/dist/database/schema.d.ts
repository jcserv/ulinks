import mongoose, { Document, Model } from "mongoose";
interface IUser extends Document {
    email: string;
    password: string;
    groupChatsCreated: [string];
    status: string;
    verified: boolean;
    verifyHash: string;
}
interface ICourseInformation extends Document {
    campus: string;
    department: string;
    code: string;
    term: string;
    year: number;
}
interface IGroupChat extends Document {
    name: string;
    createdBy: string;
    description: string;
    isCommunity: boolean;
    links: [string];
    image: string;
    courseInformation: ICourseInformation;
    status: string;
    created: Date;
    updated: Date;
    views: number;
    likes: number;
}
declare const User: Model<IUser>;
declare const GroupChat: Model<IGroupChat>;
export { mongoose, User, GroupChat, IUser, IGroupChat };
