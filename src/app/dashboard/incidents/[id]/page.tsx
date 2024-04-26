import { auth } from "@/auth";
import IncidentPageDisplay from "@/components/incidents/incident/incident-page-display";
import { type IncidentDTO } from "@/types/incident";
import api from "@/utils/api";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const session = await auth();
    const { id } = params;
    try {
        const incident = await api<IncidentDTO>(`incident/${id}`, {
            headers: {
                Authorization: `Bearer ${session?.user?.access_token}`,
            },
        });
        return {
            title: incident.title,
            description: incident.description,
        };
    } catch (error) {
        console.error("generateMetadata", error);
        notFound();
    }
}

const IncidentPage = ({ params }: Props) => {
    return <IncidentPageDisplay params={params} />;
};

export default IncidentPage;
