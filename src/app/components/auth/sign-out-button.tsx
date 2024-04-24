"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <button type="button" className="flex items-center gap-2" onClick={handleSignOut}>
            <span className="h-6 w-6">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.4399 14.62L19.9999 12.06L17.4399 9.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.76001 12.0601H19.93"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <span>Sign Out</span>
        </button>
    );
};

export default LogoutButton;
