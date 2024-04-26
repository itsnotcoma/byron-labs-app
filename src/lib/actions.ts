"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        console.error("Failed to sign in.", error);
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                console.error("Invalid credentials.", error);
                return "Invalid credentials.";
            }
            return error.cause?.err?.message ?? "An error occurred while signing in.";
        }
        throw error;
    }
}
