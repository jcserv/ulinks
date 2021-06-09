export declare class CourseInformation {
    campus?: string;
    department?: string;
    code?: String;
    term?: string;
    year: String;
}
export declare class GroupChat {
    id: String;
    name: string;
    description: string;
    links: String[];
    isCommunity: Boolean;
    courseInformation?: CourseInformation;
    status: string;
}
export declare class GroupChatIds {
    groupChats: String[];
}
export declare class GroupChatPaginiated {
    groupChats: GroupChat[];
    totalPages: Number;
    pageNumber: Number;
}
