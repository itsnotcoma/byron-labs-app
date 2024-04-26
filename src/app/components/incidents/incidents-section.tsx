/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { type AuthUser } from "@/types/auth";
import { IncidentSeverity, IncidentStatus, type IncidentDTO, type IncidentRes } from "@/types/incident";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Modal from "../shared/modal";
import SeverityBadge from "./badges/severity-badge";
import StatusBadge from "./badges/status-badge";
import GridIncidents from "./grid-incidents";

const IncidentsSection = () => {
    const user = useCurrentUser();
    const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
    const [totalIncidents, setTotalIncidents] = useState<number>(0);

    useEffect(() => {
        const fetchIncidents = async () => {
            const res = await api<IncidentRes>("incident/all", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            setIncidents(res.data);
            setTotalIncidents(res.total);
        };

        fetchIncidents();
    }, [user]);

    return (
        <section className="flex flex-col gap-6">
            <header className="flex items-center justify-between gap-4">
                <NewIncidentButton auth={user} />
                {totalIncidents ? (
                    <span className="text-xl font-semibold">{totalIncidents}</span>
                ) : (
                    <span className="h-7 w-7 shrink-0 animate-pulse bg-black/10"></span>
                )}
            </header>
            <main>
                <GridIncidents incidents={incidents} />
            </main>
        </section>
    );
};

export default IncidentsSection;

const NewIncidentButton = ({ auth }: { auth: AuthUser }) => {
    const router = useRouter();

    const [isOpen, setOpenModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const severityRef = useRef<HTMLDivElement | null>(null);
    const [severity, setSeverity] = useState<IncidentSeverity | null>(null);
    const [isSeverityOpen, setSeverityOpen] = useState(false);

    const statusRef = useRef<HTMLDivElement | null>(null);
    const [status, setStatus] = useState<IncidentStatus>(IncidentStatus.NOT_STARTED);
    const [isStatusOpen, setStatusOpen] = useState(false);

    const severities = Object.values(IncidentSeverity);
    const statuses = Object.values(IncidentStatus);

    const handleCreate = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;

        if (!title?.trim()) {
            setError("Title is required");
            return;
        }

        if (!severity) {
            setError("Severity is required");
            return;
        }

        if (!date) {
            setError("Date is required");
            return;
        }

        if (!description?.trim()) {
            setError("Description is required");
            return;
        }

        const body = {
            title,
            description,
            date,
            severity,
            status,
            reporter: auth,
        };

        try {
            const res = await api<IncidentDTO>(`incident/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                },
                body: JSON.stringify(body),
            });
            setOpenModal(false);
            router.push(`/dashboard/incidents/${res.id}`);
        } catch (error) {
            setError("An error occurred while creating the incident");
        }
    };

    useEffect(() => {
        let timer = null;
        const severityBackdropHandler = (event: MouseEvent) => {
            if (!severityRef.current?.contains(event.target as Node)) {
                setSeverityOpen(false);
                window.removeEventListener("click", severityBackdropHandler);
            }
        };

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            window.addEventListener("click", severityBackdropHandler);
        });

        return () => {
            window.removeEventListener("click", severityBackdropHandler);
        };
    }, [severityRef]);

    useEffect(() => {
        let timer = null;
        const statusBackdropHandler = (event: MouseEvent) => {
            if (!statusRef.current?.contains(event.target as Node)) {
                setStatusOpen(false);
                window.removeEventListener("click", statusBackdropHandler);
            }
        };

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            window.addEventListener("click", statusBackdropHandler);
        });

        return () => {
            window.removeEventListener("click", statusBackdropHandler);
        };
    }, [statusRef]);

    return (
        <>
            <button
                type="button"
                className="flex shrink-0 items-center justify-center gap-2 border border-black/75 bg-primary px-4 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-black/80"
                onClick={() => setOpenModal(true)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.56 18V13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 15.5H7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 2V5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16 2V5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.81 3.41992C19.15 3.53992 20.84 4.76992 20.94 9.46992L21.07 15.6399C21.15 19.7599 20.2 21.8299 15.2 21.9399L9.20002 22.0599C4.20002 22.1599 3.16002 20.1199 3.08002 16.0099L2.94002 9.82992C2.84002 5.12992 4.49002 3.82992 7.81002 3.57992L15.81 3.41992Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span>New incident</span>
            </button>
            {isOpen && (
                <Modal onClose={() => setOpenModal(false)} title="New Incident">
                    <form className="flex flex-col gap-4" action={handleCreate}>
                        <section className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
                                <label htmlFor="title" className="w-20 font-medium">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="flex-1 border-0 border-b border-black/75 bg-black/5 px-4 py-2 text-sm text-primary focus-within:outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-20 font-medium">Severity</span>
                                <div
                                    ref={severityRef}
                                    className={`${isSeverityOpen ? "shadow-dropdown" : ""} relative z-10 mr-2 flex-1`}
                                >
                                    <button
                                        type="button"
                                        className={`${isSeverityOpen ? "bg-black/10" : ""} flex w-full items-start rounded-sm p-2 transition-colors duration-300 hover:bg-black/10`}
                                        onClick={() => setSeverityOpen(!isSeverityOpen)}
                                    >
                                        {severity ? <SeverityBadge severity={severity} /> : "Select severity"}
                                    </button>
                                    {isSeverityOpen && (
                                        <div className="shadow-dropdown absolute flex w-full flex-col bg-white">
                                            {severities.map((s) => {
                                                if (s === severity) {
                                                    return null;
                                                }
                                                return (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        className="flex w-full items-start rounded-sm p-2 transition-colors duration-300 hover:bg-black/10"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            setSeverity(s);
                                                            setSeverityOpen(false);
                                                        }}
                                                    >
                                                        <SeverityBadge severity={s} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-20 font-medium">Status</span>
                                <div
                                    ref={statusRef}
                                    className={`${isStatusOpen ? "shadow-dropdown" : ""} relative mr-2 flex-1`}
                                >
                                    <button
                                        type="button"
                                        className={`${isStatusOpen ? "bg-black/10" : ""} flex w-full items-start rounded-sm p-2 transition-colors duration-300 hover:bg-black/10`}
                                        onClick={() => setStatusOpen(!isStatusOpen)}
                                    >
                                        {status ? <StatusBadge status={status} /> : "Select status"}
                                    </button>
                                    {isStatusOpen && (
                                        <div className="shadow-dropdown absolute flex w-full flex-col bg-white">
                                            {statuses.map((s) => {
                                                if (s === status) {
                                                    return null;
                                                }
                                                return (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        className="flex w-full items-start rounded-sm p-2 transition-colors duration-300 hover:bg-black/10"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            setStatus(s);
                                                            setStatusOpen(false);
                                                        }}
                                                    >
                                                        <StatusBadge status={s} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="date" className="w-20 font-medium">
                                    Date
                                </label>
                                <input
                                    id="date"
                                    name="date"
                                    type="datetime-local"
                                    className="flex-1 border-0 border-b border-black/75 bg-black/5 px-4 py-2 text-sm text-primary focus-within:outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="description" className="font-medium">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="flex-1 border-0 border-b border-black/75 bg-black/5 px-4 py-2 text-sm text-primary focus-within:outline-none"
                                />
                            </div>
                        </section>
                        <div className="flex flex-col gap-4">
                            {error && (
                                <div
                                    className="flex h-8 items-center space-x-2 text-red-500"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 8V13"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.9945 16H12.0035"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p className="text-sm text-red-500">{error}</p>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="flex shrink-0 items-center justify-center gap-2 border border-black/75 bg-primary px-4 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-black/80"
                            >
                                Create incident
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};
