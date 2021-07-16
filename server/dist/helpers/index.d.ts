export declare function escapeRegex(text: string): string;
export declare function generateRandomString(): string;
export declare const sendEmail: (recipient: string, url: string) => Promise<void>;
interface Map {
    [key: string]: string | undefined;
}
export declare const departmentToImage: Map;
export {};
