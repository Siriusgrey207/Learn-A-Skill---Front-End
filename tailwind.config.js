/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: "Roboto, sans-serif",
        },
        extend: {
            colors: {
                white: "#FFFFFF",
                black: "#000000",
                transparent: "transparent",

                green: "#2D6E46",
                red: "#FF6868",
                orange: "#FFA42E",

                "gray-100": "#F8F8F8",
                "gray-200": "#E0E0E0",
                "gray-300": "#595959",
                "gray-400": "#191919",
            },
            spacing: {
                spacing: "var(--spacing)",
                halfSpacing: "var(--halfSpacing)",
                containerPadding: "var(--containerPadding)",
            },
            borderRadius: {
                small: "8px",
                medium: "10px",
                large: "12px",
            },
        },
    },
    plugins: [],
};
