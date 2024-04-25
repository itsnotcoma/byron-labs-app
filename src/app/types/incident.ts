import { type User } from "./auth";
import { type PaginationQuery } from "./pagination";

export enum IncidentSeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export enum IncidentStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    PAUSED = "paused",
    CLOSED = "closed",
}

export interface IncidentDTO {
    id: string;
    title: string;
    description: string;
    severity: IncidentSeverity;
    reporter: User;
    status: IncidentStatus;
    date: string;
    created_at: string;
    updated_at: string;
}

export interface IncidentRes extends PaginationQuery {
    data: IncidentDTO[];
    total: number;
}
