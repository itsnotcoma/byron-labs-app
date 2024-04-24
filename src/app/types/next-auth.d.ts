import { DefaultSession } from "next-auth";
import { AuthUser } from "./auth";

export type ExtendedUser = DefaultSession["user"] & AuthUser;

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
