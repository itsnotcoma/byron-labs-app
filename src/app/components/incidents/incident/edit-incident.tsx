"use client";

import Modal from "@/components/shared/modal";
import { type AuthUser } from "@/types/auth";
import { IncidentSeverity, IncidentStatus, type IncidentDTO } from "@/types/incident";
import api from "@/utils/api";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SeverityBadge from "../badges/severity-badge";
import StatusBadge from "../badges/status-badge";

interface EditIncidentProps {
    auth: AuthUser;
    incident: IncidentDTO;
    onClose: () => void;
}

const EditIncident = ({ auth, incident: incident, onClose }: EditIncidentProps) => {
    const severityRef = useRef<HTMLDivElement | null>(null);
    const [severity, setSeverity] = useState(incident.severity);
    const [isSeverityOpen, setSeverityOpen] = useState(false);

    const statusRef = useRef<HTMLDivElement | null>(null);
    const [status, setStatus] = useState(incident.status);
    const [isStatusOpen, setStatusOpen] = useState(false);

    const severities = Object.values(IncidentSeverity);
    const statuses = Object.values(IncidentStatus);

    const handleSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const body = {
            title,
            severity,
            status,
            date,
            description,
        };

        const res = await api<IncidentDTO>(`incident/${incident.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${auth.access_token}`,
            },
            body: JSON.stringify(body),
        });

        redirect(`/dashboard/incidents/${res.id}`);
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
        <Modal onClose={onClose} title="Edit Incident">
            <form className="flex flex-col gap-4" action={handleSubmit}>
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
                            defaultValue={incident.title}
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
                                <SeverityBadge severity={severity} />
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
                                <StatusBadge status={status} />
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
                            defaultValue={incident.date.slice(0, 16)}
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
                            defaultValue={incident.description}
                        />
                    </div>
                </section>
                <div className="my-5 flex flex-wrap items-center justify-center gap-4">
                    <button
                        type="button"
                        className="flex shrink-0 items-center justify-center gap-2 border border-black/75 bg-primary px-4 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-black/80"
                        onClick={onClose}
                    >
                        Cancel changes
                    </button>
                    <button
                        type="submit"
                        className="flex shrink-0 items-center justify-center gap-2 border border-[#e63025] bg-[#e63025] px-4 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-red-500"
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditIncident;
