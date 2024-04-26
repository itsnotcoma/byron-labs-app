import Link from "next/link";
import UserMenu from "./user-menu";

const DashboardHeader = () => {
    return (
        <header className="sticky top-0 flex w-full items-center justify-between gap-6 bg-accent px-5 py-4">
            <div className="flex items-center gap-6">
                <Link href={"/dashboard"} className="font-clash-display text-xl font-semibold">
                    CyberHQ
                </Link>
            </div>
            <div className="flex items-center gap-6">
                <nav className="hidden items-center gap-3 sm:flex">
                    <Link href={"/dashboard/incidents"} className="border-black font-semibold hover:border-b">
                        Incidents
                    </Link>
                </nav>
                <UserMenu />
            </div>
        </header>
    );
};

export default DashboardHeader;
