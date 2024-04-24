/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import authConfig from "@/config/auth.config";
import NextAuth from "next-auth";
import { env } from "./env.mjs";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    session: {
        strategy: "jwt",
        maxAge: env.AUTH_EXPIRATION ?? 30 * 60, // default 30 minutes,
    },
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = {
                name: token.name,
                email: token.email,
                id: token.id,
                username: token.username,
                company: token.company,
                access_token: token.access_token,
            } as any;
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    Authorization: `Bearer ${session.user.access_token}`,
                },
            });

            if (!res.ok) {
                const data = await res.json();
                console.error("Failed to fetch user data.", res.statusText, data.detail);
                session.user.error = {
                    error: { status: res.statusText, message: data.detail },
                };
            }

            return session;
        },
    },
});
