import { auth } from "@/auth";
import DashboardHeader from "@/components/dashboard/dashboard-header";
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
                <DashboardHeader />
                <main>{children}</main>
            </SessionHandler>
        </SessionProvider>
    );
};

export default DashboardLayout;
