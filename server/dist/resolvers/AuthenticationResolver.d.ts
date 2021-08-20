import { AuthenticationMsg } from "../models";
import "dotenv/config";
export declare class AuthenticationResolver {
    me(): Promise<string>;
    login(email: string, password: string): Promise<AuthenticationMsg>;
    signup(email: string, password: string): Promise<AuthenticationMsg>;
}
