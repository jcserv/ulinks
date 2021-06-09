import { User } from "../models";
export interface UserState extends Omit<User, "groupChatsCreated"> {
    groupChatsCreated: [String];
}
export declare class UserResolver {
    getUser(email: string): Promise<import("../database/schema").IUser | null>;
    updateUser(email: string, status: string): Promise<import("../database/schema").IUser | null>;
    groupChatsCreated(user: UserState): Promise<Promise<import("../database/schema").IGroupChat | null>[]>;
    getUsers(limit?: number, status?: string): Promise<import("../database/schema").IUser[]>;
    searchUsers(text?: string): Promise<import("../database/schema").IUser[]>;
}
