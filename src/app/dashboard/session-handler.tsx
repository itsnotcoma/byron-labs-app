"use client";

import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SessionHandlerProps {
    session: Session | null;
    children: React.ReactNode;
}

const SessionHandler = ({ session, children }: SessionHandlerProps) => {
    const router = useRouter();
    const error = session?.user?.error;

    useEffect(() => {
        const handleSignOut = async () => {
            if (error) {
                await signOut({ redirect: false });
                router.push("/");
            }
        };
        const timeout = setTimeout(() => handleSignOut(), 500);
        return () => clearTimeout(timeout);
    }, [error, router]);

    return <>{children}</>;
};

export default SessionHandler;
