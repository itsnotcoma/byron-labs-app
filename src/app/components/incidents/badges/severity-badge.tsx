import { IncidentSeverity } from "@/types/incident";

interface SeverityBadgeProps {
    severity: IncidentSeverity;
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
    if (severity === IncidentSeverity.LOW) {
        return <span className="w-fit rounded bg-[#bfbfbf] px-2 text-sm text-white">Low</span>;
    }

    if (severity === IncidentSeverity.MEDIUM) {
        return <span className="w-fit rounded bg-[#f9b602] px-2 text-sm text-white">Medium</span>;
    }

    return <span className="w-fit rounded bg-[#e63025] px-2 text-sm text-white">High</span>;
}
