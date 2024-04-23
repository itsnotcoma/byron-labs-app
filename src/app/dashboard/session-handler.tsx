"use client";

import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

interface SessionHandlerProps {
    session: Session | null;
    children: React.ReactNode;
}

const SessionHandler = ({ session, children }: SessionHandlerProps) => {
    const error = session?.user?.error;

    useEffect(() => {
        const handleSignOut = async () => {
            if (error) {
                await signOut();
            }
        };
        void handleSignOut();
    }, [error]);

    return <>{children}</>;
};

export default SessionHandler;
