import "dotenv/config";
export declare class AuthenticationResolver {
    me(): Promise<string>;
    login(email: string, password: string): Promise<{
        status: string;
        jwtToken?: undefined;
    } | {
        status: string;
        jwtToken: string;
    }>;
    signup(email: string, password: string): Promise<{
        status: string;
        jwtToken?: undefined;
    } | {
        status: string;
        jwtToken: string;
    }>;
}
