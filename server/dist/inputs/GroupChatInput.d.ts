export declare class courseInformationInput {
    campus: string;
    department: string;
    code: string;
    term: string;
    year: string;
}
export declare class createGroupChatInput {
    name: string;
    description: string;
    isCommunity: boolean;
    links: string[];
    courseInformation?: courseInformationInput;
    status: string;
}
