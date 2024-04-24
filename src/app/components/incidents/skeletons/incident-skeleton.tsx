const IncidentSkeleton = () => {
    return (
        <div className="flex h-40 w-full flex-col gap-2 bg-accent p-2 shadow-lg sm:w-80">
            <span className="flex h-7 w-3/5 flex-1 animate-pulse bg-gray-300"></span>
            <span className="flex h-5 w-14 animate-pulse bg-gray-300"></span>
            <span className="flex h-4 w-full animate-pulse bg-gray-300"></span>
            <span className="flex h-4 w-2/5 animate-pulse bg-gray-300"></span>
            <span className="flex h-4 w-3/5 animate-pulse bg-gray-300"></span>
        </div>
    );
};

export default IncidentSkeleton;
