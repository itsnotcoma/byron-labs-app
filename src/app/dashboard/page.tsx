import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
};

const DashboardPage = () => {
    return (
        <main className="p-5">
            <h1 className="font-clash-display text-4xl">Dashboard</h1>
        </main>
    );
};

export default DashboardPage;
