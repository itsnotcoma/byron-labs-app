import UserMenu from "./user-menu";

const DashboardHeader = () => {
    return (
        <header className="flex w-full items-center justify-between gap-4 bg-accent px-5 py-2">
            <span className="font-clash-display text-xl font-semibold">CyberHQ</span>
            <div className="flex items-center gap-4">
                <span className="italic">Search</span>
                <UserMenu />
            </div>
        </header>
    );
};

export default DashboardHeader;
