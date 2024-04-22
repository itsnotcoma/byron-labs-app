import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
    const session = await auth();
    return (
        <SessionProvider session={session} refetchOnWindowFocus={true}>
            <main>{children}</main>
        </SessionProvider>
    );
};

export default DashboardLayout;
