/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { type IncidentDTO, type IncidentRes } from "@/types/incident";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import GridIncidents from "../incidents/grid-incidents";

const RecentIncidents = () => {
    const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
    const user = useCurrentUser();

    useEffect(() => {
        const fetchIncidents = async () => {
            const res = await api<IncidentRes>("incident/all?limit=4", {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });
            setIncidents(res.data);
        };

        fetchIncidents();
    }, [user]);

    return (
        <main className="">
            <GridIncidents incidents={incidents} />
        </main>
    );
};

export default RecentIncidents;
