import { env } from "@/env.mjs";

export default async function api<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            ...options?.headers,
        },
    });
    if (!response.ok) {
        const data = (await response.json()) as unknown as { detail: string };
        console.error(data.detail);
        throw new Error(response.statusText);
    }
    return response.json() as unknown as Promise<T>;
}
