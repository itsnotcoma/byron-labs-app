import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import SessionHandler from "./session-handler";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
    const session = await auth();
    return (
        <SessionProvider session={session} refetchOnWindowFocus={true}>
            <SessionHandler session={session}>
                <main>{children}</main>
            </SessionHandler>
        </SessionProvider>
    );
};

export default DashboardLayout;
