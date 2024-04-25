/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { type IncidentDTO, type IncidentRes } from "@/types/incident";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import GridIncidents from "./grid-incidents";

const IncidentsSection = () => {
    const user = useCurrentUser();
    const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
    const [totalIncidents, setTotalIncidents] = useState<number>(0);

    useEffect(() => {
        const fetchIncidents = async () => {
            const res = await api<IncidentRes>("incident/all", {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });
            setIncidents(res.data);
            setTotalIncidents(res.total);
        };

        fetchIncidents();
    }, [user.access_token]);

    return (
        <section className="flex flex-col gap-6">
            <header className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xl font-semibold">{totalIncidents ?? "loading..."}</span>
            </header>
            <main>
                <GridIncidents incidents={incidents} />
            </main>
        </section>
    );
};

export default IncidentsSection;
