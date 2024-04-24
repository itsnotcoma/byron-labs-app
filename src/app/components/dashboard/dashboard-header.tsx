import Link from "next/link";
import UserMenu from "./user-menu";

const DashboardHeader = () => {
    return (
        <header className="flex w-full items-center justify-between gap-6 bg-accent px-5 py-2">
            <div className="flex items-center gap-6">
                <span className="font-clash-display text-xl font-semibold">CyberHQ</span>
            </div>
            <div className="flex items-center gap-6 sm:flex-1">
                <span className="italic sm:flex-1">Search</span>
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
