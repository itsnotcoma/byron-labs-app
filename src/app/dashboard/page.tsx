"use client";

import SignOutButton from "@/components/sign-in/sign-out-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const DashboardPage = () => {
    const user = useCurrentUser();

    return (
        <main>
            <h1>Dashboard</h1>
            <SignOutButton />
            <p className="break-words">Hi, {user?.name}</p>
        </main>
    );
};

export default DashboardPage;
