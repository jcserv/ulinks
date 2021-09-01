export declare class CourseInformation {
    campus?: string;
    department?: string;
    code?: string;
    term?: string;
    year: string;
}
export declare class GroupChat {
    id: string;
    name: string;
    description: string;
    createdBy: string;
    links: string[];
    isCommunity: boolean;
    courseInformation?: CourseInformation;
    status: string;
    image: string;
    created: Date;
    updated: Date;
    views: number;
    likes: number;
}
export declare class GroupChatIds {
    groupChats: string[];
}
export declare class GroupChatPaginiated {
    groupChats: GroupChat[];
    totalPages: number;
    pageNumber: number;
}
