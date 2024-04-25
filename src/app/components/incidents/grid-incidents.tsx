import { type IncidentDTO } from "@/types/incident";
import { formatRelative } from "date-fns";
import Link from "next/link";
import SeverityBadge from "./badges/severity-badge";
import StatusBadge from "./badges/status-badge";
import IncidentSkeleton from "./skeletons/incident-skeleton";

interface GridIncidentsProps {
    incidents: IncidentDTO[] | undefined | null;
}

function GridIncidents({ incidents }: GridIncidentsProps) {
    if (!incidents) {
        return <IncidentsSkeleton />;
    }
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[2048px]:grid-cols-6">
            {incidents.map((incident: IncidentDTO) => (
                <Link
                    key={incident.id}
                    href={`/dashboard/incidents/${incident.id}`}
                    className="flex flex-col gap-2 bg-accent p-2 shadow-lg transition-colors hover:bg-[#f2f2f2]"
                >
                    <h3 className="font-clash-display text-xl">{incident.title}</h3>
                    <StatusBadge status={incident.status} />
                    <SeverityBadge severity={incident.severity} />
                    <p className="line-clamp-1">{incident.description}</p>
                    <p className="font-medium">{incident.reporter.company}</p>
                    <span className="text-sm capitalize italic">
                        {formatRelative(new Date(incident.date), new Date())}
                    </span>
                </Link>
            ))}
        </div>
    );
}

export default GridIncidents;

const IncidentsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[2048px]:grid-cols-6">
            <IncidentSkeleton />
            <IncidentSkeleton />
            <IncidentSkeleton />
            <IncidentSkeleton />
            <IncidentSkeleton />
            <IncidentSkeleton />
        </div>
    );
};
