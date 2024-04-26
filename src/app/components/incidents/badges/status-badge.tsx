import { IncidentStatus } from "@/types/incident";

interface Props {
    status: IncidentStatus;
}

export default function StatusBadge({ status }: Props) {
    if (status === IncidentStatus.IN_PROGRESS) {
        return (
            <div className="flex w-fit items-center gap-2 rounded bg-[#e8c600] px-2 text-sm text-white">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#ca8e1b]"></span>
                <span>In Progress</span>
            </div>
        );
    }

    if (status === IncidentStatus.PAUSED) {
        return (
            <div className="flex w-fit items-center gap-2 rounded bg-[#28456c] px-2 text-sm text-white">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#2e7cd1]"></span>
                <span>Paused</span>
            </div>
        );
    }

    if (status === IncidentStatus.CLOSED) {
        return (
            <div className="flex w-fit items-center gap-2 rounded bg-[#2b593f] px-2 text-sm text-white">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#2d9964]"></span>
                <span>Closed</span>
            </div>
        );
    }

    return (
        <div className="flex w-fit items-center gap-2 rounded bg-black/30 px-2 text-sm text-white">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#9b9b9b]"></span>
            <span>Not Started</span>
        </div>
    );
}
