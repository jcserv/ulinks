import mongoose, { Document, Model } from "mongoose";
interface IUser extends Document {
    email: string;
    password: string;
    groupChatsCreated: [string];
    status: string;
}
interface ICourseInformation extends Document {
    campus: String;
    department: String;
    code: String;
    term: String;
    year: Number;
}
interface IGroupChat extends Document {
    name: string;
    description: string;
    isCommunity: Boolean;
    links: [string];
    courseInformation: ICourseInformation;
    status: string;
}
declare const User: Model<IUser>;
declare const GroupChat: Model<IGroupChat>;
export { mongoose, User, GroupChat, IUser, IGroupChat };
