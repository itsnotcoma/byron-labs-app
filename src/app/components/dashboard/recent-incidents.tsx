/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import SeverityBadge from "@/components/incidents/badges/severity-badge";
import IncidentSkeleton from "@/components/incidents/skeletons/incident-skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { type IncidentDTO, type IncidentRes } from "@/types/incident";
import api from "@/utils/api";
import { formatRelative } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

const RecentIncidents = () => {
    const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
    const user = useCurrentUser();

    useEffect(() => {
        const fetchIncidents = async () => {
            const res = await api<IncidentRes>("incident/all?limit=5", {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });
            setIncidents(res.data);
        };

        fetchIncidents();
    }, [user.access_token]);

    return (
        <main className="">
            {incidents.length > 0 ? <Incidents incidents={incidents} /> : <RecentIncidentsSkeleton />}
        </main>
    );
};

export default RecentIncidents;

const Incidents = ({ incidents }: { incidents: IncidentDTO[] }) => {
    return (
        <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            {incidents.map((incident: IncidentDTO) => (
                <Link
                    key={incident.id}
                    href={`/dashboard/incidents/${incident.id}`}
                    className="flex flex-col gap-2 bg-accent p-2 shadow-lg transition-colors hover:bg-[#f2f2f2] sm:max-w-xs"
                >
                    <h3 className="font-clash-display text-xl">{incident.title}</h3>
                    <SeverityBadge severity={incident.severity} />
                    <p className="line-clamp-1">{incident.description}</p>
                    <p>{incident.reporter}</p>
                    <span className="text-sm italic">
                        Uploaded on {formatRelative(new Date(incident.created_at), new Date())}
                    </span>
                </Link>
            ))}
        </div>
    );
};

const RecentIncidentsSkeleton = () => {
    return (
        <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <IncidentSkeleton />
            <IncidentSkeleton />
            <IncidentSkeleton />
            <IncidentSkeleton />
            <IncidentSkeleton />
        </div>
    );
};
