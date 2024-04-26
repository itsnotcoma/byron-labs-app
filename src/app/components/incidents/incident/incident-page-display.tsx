/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import Modal from "@/components/shared/modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import { type AuthUser } from "@/types/auth";
import { type IncidentDTO } from "@/types/incident";
import api from "@/utils/api";
import { formatRelative } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SeverityBadge from "../badges/severity-badge";
import StatusBadge from "../badges/status-badge";
import EditIncident from "./edit-incident";

type Props = {
    params: { id: string };
};

const IncidentPageDisplay = ({ params }: Props) => {
    const { id } = params;
    const auth = useCurrentUser();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [incident, setIncident] = useState<IncidentDTO | null>(null);
    const [hiddenProperties, setHiddenProperties] = useState<boolean>(true);
    const [isEditing, setEditing] = useState<boolean>(false);

    const handleHiddenProperties = () => {
        setHiddenProperties(!hiddenProperties);
    };

    const handleOnCloseEdit = () => {
        setEditing(false);
        router.replace(`/dashboard/incidents/${id}`, { scroll: false });
    };

    const handleOnClickEdit = (event: MouseEvent) => {
        event.preventDefault();
        setEditing(true);
    };

    useEffect(() => {
        const fetchIncidents = async () => {
            const res = await api<IncidentDTO>(`incident/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                },
            });
            setIncident(res);
        };

        fetchIncidents();
    }, [id, auth]);

    useEffect(() => {
        setEditing(searchParams.get("edit") === "true");
    }, [searchParams]);

    if (!incident) {
        return skeleton();
    }

    return (
        <>
            <main className="flex flex-col divide-y divide-black/10 p-5">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="break-words font-clash-display text-4xl">{incident.title}</h1>
                    <div className="hidden flex-wrap items-center gap-4 sm:flex">
                        <EditButton auth={auth} incidentId={id} onClick={handleOnClickEdit} />
                        <DeleteButton auth={auth} incidentId={id} />
                    </div>
                </div>
                <section className="flex flex-col gap-3 py-4">
                    <div className="flex items-center gap-4">
                        <span className="w-24 px-2 py-1.5 text-black/60">Severity</span>
                        <span className="px-2 py-1.5">
                            <SeverityBadge severity={incident.severity} />
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 px-2 py-1.5 text-black/60">Status</span>
                        <span className="px-2 py-1.5">
                            <StatusBadge status={incident.status} />
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 px-2 py-1.5 text-black/60">Date</span>
                        <span className="px-2 py-1.5 font-medium">
                            {formatRelative(new Date(incident.date), new Date())}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 px-2 py-1.5 text-black/60">Company</span>
                        <span className="px-2 py-1.5 font-medium">{incident.reporter.company}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 px-2 py-1.5 text-black/60">Reporter</span>
                        <span className="px-2 py-1.5 font-medium">{incident.reporter.name}</span>
                    </div>
                    <div className={`${hiddenProperties ? "hidden" : "flex"} items-center gap-4`}>
                        <span className="w-24 px-2 py-1.5 text-black/60">Created</span>
                        <span className="px-2 py-1.5 font-medium">
                            {formatRelative(new Date(incident.date), new Date())}
                        </span>
                    </div>
                    <div className={`${hiddenProperties ? "hidden" : "flex"} items-center gap-4`}>
                        <span className="w-24 px-2 py-1.5 text-black/60">Updated</span>
                        <span className="px-2 py-1.5 font-medium">
                            {formatRelative(new Date(incident.date), new Date())}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="flex w-fit items-center justify-center gap-2 rounded px-2 py-1.5 text-black/60 transition-colors duration-300 hover:bg-black/10"
                        onClick={handleHiddenProperties}
                    >
                        <svg
                            className={hiddenProperties ? undefined : "rotate-180"}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>{hiddenProperties ? "Hide 2 properties" : "2 more properties"}</span>
                    </button>
                </section>
                <div className="py-4">
                    <p
                        className="px-2 py-1.5"
                        dangerouslySetInnerHTML={{ __html: incident.description.replace(/(?:\r\n|\r|\n)/g, "<br />") }}
                    ></p>
                </div>
                <div className="flex flex-wrap items-center gap-4 py-4 sm:hidden">
                    <EditButton auth={auth} incidentId={id} onClick={handleOnClickEdit} />
                    <DeleteButton auth={auth} incidentId={id} />
                </div>
            </main>
            {isEditing && <EditIncident auth={auth} incident={incident} onClose={handleOnCloseEdit} />}
        </>
    );
};

export default IncidentPageDisplay;

type ActionButtonProps = {
    auth: AuthUser;
    incidentId: string;
};

const EditButton = ({ auth, incidentId, onClick }: { onClick: (event: MouseEvent) => void } & ActionButtonProps) => {
    const handleOnClick = () => {
        onClick(new MouseEvent("click"));
    };

    return (
        <Link
            href={`/dashboard/incidents/${incidentId}?edit=true`}
            passHref
            className="flex shrink-0 items-center justify-center gap-2 border border-black/75 bg-primary px-4 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-black/80"
            onClick={handleOnClick}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M3 22H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span>Edit</span>
        </Link>
    );
};

const DeleteButton = ({ auth, incidentId }: ActionButtonProps) => {
    const [isOpen, setOpenModal] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await api(`incident/${incidentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                },
            });
            router.push("/dashboard/incidents");
        } catch (error) {
            console.error("Failed to delete incident.", error);
        } finally {
            setOpenModal(false);
        }
    };

    return (
        <>
            <button
                type="button"
                className="flex shrink-0 items-center justify-center gap-2 border border-[#e63025] bg-[#e63025] px-4 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-red-500"
                onClick={() => setOpenModal(true)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10.33 16.5H13.66"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.5 12.5H14.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span>Delete</span>
            </button>
            {isOpen && (
                <Modal onClose={() => setOpenModal(false)} title="Are you sure you want to delete this incident?">
                    <div className="flex flex-col gap-4">
                        <p>
                            Deleting this incident is irreversible. All the data related to this incident will be lost
                            permanently.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                type="button"
                                className="flex shrink-0 items-center justify-center gap-2 border border-black/75 bg-primary px-4 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-black/80"
                                onClick={() => setOpenModal(false)}
                            >
                                Keep incident
                            </button>
                            <button
                                type="button"
                                className="flex shrink-0 items-center justify-center gap-2 border border-[#e63025] bg-[#e63025] px-4 py-1.5 text-sm text-accent transition-colors duration-300 hover:bg-red-500"
                                onClick={handleDelete}
                            >
                                Delete permanently
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

const skeleton = () => {
    return (
        <main className="flex flex-col divide-y divide-black/10 p-5">
            <h1 className="mb-4 h-10 w-4/5 animate-pulse bg-black/10 sm:w-1/3"></h1>
            <section className="flex flex-col gap-3 py-4">
                <div className="flex items-center gap-4">
                    <span className="h-7 w-24 animate-pulse bg-black/10 px-2 py-1.5"></span>
                    <span className="h-7 w-full max-w-2xl animate-pulse bg-black/10 px-2 py-1.5"></span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="h-7 w-24 animate-pulse bg-black/10 px-2 py-1.5"></span>
                    <span className="h-7 w-full max-w-2xl animate-pulse bg-black/10 px-2 py-1.5"></span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="h-7 w-24 animate-pulse bg-black/10 px-2 py-1.5"></span>
                    <span className="h-7 w-full max-w-2xl animate-pulse bg-black/10 px-2 py-1.5"></span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="h-7 w-24 animate-pulse bg-black/10 px-2 py-1.5"></span>
                    <span className="h-7 w-full max-w-2xl animate-pulse bg-black/10 px-2 py-1.5"></span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="h-7 w-24 animate-pulse bg-black/10 px-2 py-1.5"></span>
                    <span className="h-7 w-full max-w-2xl animate-pulse bg-black/10 px-2 py-1.5"></span>
                </div>
            </section>
            <div className="flex flex-col gap-1 py-4">
                <p className="h-4 animate-pulse bg-black/10"></p>
                <p className="h-4 animate-pulse bg-black/10"></p>
                <p className="h-4 w-1/2 animate-pulse bg-black/10"></p>
                <p className="h-4 animate-pulse bg-black/10"></p>
                <p className="mb-4 h-4 w-3/5 animate-pulse bg-black/10"></p>
                <p className="h-4 w-4/5 animate-pulse bg-black/10"></p>
                <p className="h-4 animate-pulse bg-black/10"></p>
                <p className="h-4 w-1/6  animate-pulse bg-black/10"></p>
            </div>
        </main>
    );
};
