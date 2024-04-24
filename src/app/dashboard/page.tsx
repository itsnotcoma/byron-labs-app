import RecentIncidents from "@/components/dashboard/recent-incidents";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
};

const DashboardPage = () => {
    return (
        <main className="flex flex-col p-5">
            <h1 className="mb-8 font-clash-display text-4xl">Dashboard</h1>
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className=" font-clash-display text-xl">Latest Incidents</h2>
                <Link
                    href={"/dashboard/incidents"}
                    className="border border-black bg-accent px-2 transition-colors duration-300 hover:bg-primary hover:text-secondary"
                >
                    See All
                </Link>
            </div>
            <RecentIncidents />
        </main>
    );
};

export default DashboardPage;
