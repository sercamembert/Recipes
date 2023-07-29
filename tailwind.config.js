/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: ["class"],
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#1A9848",
        secoundary: "#0C8346",
        dark: "#022C22",
        rose: "#E5C2C0",
        gray: "#A3A3A3",
        light: "#4ADE80",
        popular: "#22C55E",
        stepper: "#94CFAA",
        bbq: "#E79B26",
      },
      fontFamily: {
        primary: ["Work Sans", "sans-serif"],
        special: ["Lobster", "cursive"],
        secoundary: ["Merriweather", "sans-serif"],
      },
    },
  },
};
