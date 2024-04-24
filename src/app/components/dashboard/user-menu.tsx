"use client";

import SignOutButton from "@/components/auth/sign-out-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserMenu = () => {
    const user = useCurrentUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleBackdropClick = (e: Event) => {
            if (isMenuOpen && !(e.target as Element).closest("#user-menu")) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleBackdropClick);

        return () => {
            document.removeEventListener("click", handleBackdropClick);
        };
    }, [isMenuOpen]);

    return (
        <div id="user-menu" className="relative flex">
            <button className="flex sm:hidden" onClick={handleMenuToggle}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.14 21.62C17.26 21.88 16.22 22 15 22H8.99998C7.77998 22 6.73999 21.88 5.85999 21.62C6.07999 19.02 8.74998 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.58 10.58C15.58 12.56 13.98 14.17 12 14.17C10.02 14.17 8.42004 12.56 8.42004 10.58C8.42004 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <button
                className="hover:bg-accent-dark hidden cursor-pointer items-center gap-3 rounded bg-secondary px-2 shadow shadow-black/50 transition-colors duration-200 sm:flex"
                onClick={handleMenuToggle}
            >
                <span className="font-medium">Hi, {user?.name}</span>
            </button>
            <div
                className={
                    !isMenuOpen
                        ? "hidden"
                        : "absolute right-0 top-[calc(100%_+_0.25rem)] min-w-[12rem] rounded-lg border bg-accent shadow"
                }
            >
                <div className="flex flex-col">
                    {user ? (
                        <div className="flex flex-col p-2">
                            <span className="font-semibold">{user.username}</span>
                            <span className="text-xs">{user.email}</span>
                            <span className="text-xs">{user.company}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1 p-2">
                            <span className="h-4 w-full animate-pulse bg-gray-300"></span>
                            <span className="h-4 w-full animate-pulse bg-gray-300"></span>
                            <span className="h-4 w-full animate-pulse bg-gray-300"></span>
                        </div>
                    )}
                    <Link
                        href={"/dashboard/incidents"}
                        className="flex items-center gap-2 p-2 transition-colors duration-300 hover:bg-black/5 sm:hidden"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.6601 10.44L20.6801 14.62C19.8401 18.23 18.1801 19.69 15.0601 19.39C14.5601 19.35 14.0201 19.26 13.4401 19.12L11.7601 18.72C7.59006 17.73 6.30006 15.67 7.28006 11.49L8.26006 7.30001C8.46006 6.45001 8.70006 5.71001 9.00006 5.10001C10.1701 2.68001 12.1601 2.03001 15.5001 2.82001L17.1701 3.21001C21.3601 4.19001 22.6401 6.26001 21.6601 10.44Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.06 19.39C14.44 19.81 13.66 20.16 12.71 20.47L11.13 20.99C7.15998 22.27 5.06997 21.2 3.77997 17.23L2.49997 13.28C1.21997 9.30998 2.27997 7.20998 6.24997 5.92998L7.82997 5.40998C8.23997 5.27998 8.62997 5.16998 8.99997 5.09998C8.69997 5.70998 8.45997 6.44998 8.25997 7.29998L7.27997 11.49C6.29997 15.67 7.58998 17.73 11.76 18.72L13.44 19.12C14.02 19.26 14.56 19.35 15.06 19.39Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.64 8.53003L17.49 9.76003"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.66 12.4L14.56 13.14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>Incidents</span>
                    </Link>
                    <div className="flex cursor-pointer overflow-hidden rounded-b-lg p-2 transition-colors duration-300 hover:bg-[#e63025] hover:text-white">
                        <SignOutButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
