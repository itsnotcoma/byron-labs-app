import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        template: "%s | CyberHQ",
        default: "CyberHQ",
    },
    description:
        "Simplify cybersecurity incident reporting with CyberHQ. Our Next.js and FastAPI-powered platform ensures swift incident documentation and response. Join now for streamlined security management.",
    keywords: [
        "cybersecurity incident reporting",
        "Next.js",
        "FastAPI",
        "web application",
        "incident management",
        "digital security",
        "simplified reporting",
        "cybersecurity hub",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
