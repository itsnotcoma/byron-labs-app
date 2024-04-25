import IncidentsSection from "@/components/incidents/incidents-section";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Incidents",
    description: "Incidents page",
};

const IncidentsPage = () => {
    return (
        <main className="flex flex-col p-5">
            <h1 className="mb-8 font-clash-display text-4xl">Incidents</h1>
            <IncidentsSection />
        </main>
    );
};

export default IncidentsPage;
