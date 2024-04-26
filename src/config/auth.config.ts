/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { env } from "@/env.mjs";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ username: z.string(), password: z.string() })
                    .safeParse(credentials);
                if (!parsedCredentials.success) {
                    return null;
                }
                const { username, password } = parsedCredentials.data;
                const user = await getUser({ username, password });
                if (!user) {
                    return null;
                }
                return user;
            },
        }),
    ],
} satisfies NextAuthConfig;

async function getUser(credentials: { username: string; password: string }) {
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            },
            body: new URLSearchParams(credentials),
        });

        if (!res.ok) {
            const data = await res.json();
            console.error(res.statusText, data.detail);
            throw new Error(data.detail);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user data.", error);
        throw error;
    }
}
