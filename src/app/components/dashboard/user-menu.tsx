"use client";

import SignOutButton from "@/components/auth/sign-out-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const UserMenu = () => {
    const user = useCurrentUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        // close on backdrop click
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
                    <div className="flex flex-col p-2">
                        <span className="font-semibold">{user?.username}</span>
                        <span className="text-xs">{user?.email}</span>
                        <span className="text-xs">{user?.company}</span>
                    </div>
                    <div className="flex cursor-pointer overflow-hidden rounded-b-lg p-2 hover:bg-black/5">
                        <SignOutButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
