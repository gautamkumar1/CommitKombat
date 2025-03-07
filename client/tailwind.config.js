import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0070F3",
          50: "#E6F0FE",
          100: "#CCE0FD",
          200: "#99C2FB",
          300: "#66A3F9",
          400: "#3385F7",
          500: "#0070F3",
          600: "#0059C2",
          700: "#004392",
          800: "#002C61",
          900: "#001631",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
