import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    username: string;
    name: string;
    email: string;
    company: string;
    access_token: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
