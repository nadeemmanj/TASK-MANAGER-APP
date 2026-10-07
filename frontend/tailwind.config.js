/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2F6FA",
        ink: "#0F2A43",
        panel: "#132C46",
        primary: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
          light: "#DBEAFE",
        },
        teal: {
          DEFAULT: "#0D9488",
          dark: "#0F766E",
          light: "#CCFBF1",
        },
        navy: {
          DEFAULT: "#1E3A5F",
          dark: "#152A46",
        },
        slate: {
          DEFAULT: "#5B6B7C",
          light: "#94A3B8",
        },
        line: "#D9E2EC",
        danger: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
      },
    },
  },
  plugins: [],
};
