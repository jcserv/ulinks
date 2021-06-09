export declare class courseInformationInput {
    campus: string;
    department: string;
    code: String;
    term: String;
    year: String;
}
export declare class createGroupChatInput {
    name: String;
    description: String;
    isCommunity: Boolean;
    links: String[];
    courseInformation?: courseInformationInput;
    status: String;
}
