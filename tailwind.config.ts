import type { Config } from "tailwindcss";

const config: Config = {
    future: {
        hoverOnlyWhenSupported: true,
    },
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                archivo: "Archivo",
                "clash-display": "ClashDisplay-Semibold",
            },
            colors: {
                primary: "rgb(var(--primary-rgb))",
                secondary: "rgb(var(--secondary-rgb))",
                accent: "rgb(var(--accent-rgb))",
                "accent-dark": "rgb(var(--accent-dark-rgb))",
            },
        },
    },
    plugins: [],
};
export default config;
