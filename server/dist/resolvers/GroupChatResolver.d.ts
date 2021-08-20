import { createGroupChatInput } from "../inputs";
import { GroupChatIds } from "../models/Groupchat";
export declare class GroupChatResolver {
    pageSize: number;
    getAllGroupChatIds(): Promise<GroupChatIds>;
    getGroupChats(page?: number): Promise<{
        groupChats: import("../database/schema").IGroupChat[];
        totalPages: number;
        pageNumber: number;
    }>;
    getGroupChatByStatus(status: string): Promise<import("../database/schema").IGroupChat[]>;
    getGroupChat(id: string): Promise<import("../database/schema").IGroupChat | null>;
    searchGroupChats(campus?: string, department?: string, code?: string, term?: string, year?: string, text?: string, type?: boolean, page?: number, pageSize?: number): Promise<{
        groupChats: import("../database/schema").IGroupChat[];
        totalPages: number;
        pageNumber: number;
    }>;
    addGroupChat(email: string, groupchatInfo: createGroupChatInput): Promise<import("../database/schema").IGroupChat | null>;
    updateGroupChat(id: string, chatInfo: createGroupChatInput): Promise<import("../database/schema").IGroupChat | null>;
    updateStatus(id: string, status: string): Promise<import("../database/schema").IGroupChat | null>;
    deleteGroupChat(id: string): Promise<boolean>;
    incrementLikes(id: string): Promise<import("../database/schema").IGroupChat | null>;
}
