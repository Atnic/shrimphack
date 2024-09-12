/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "jala-600": "#0A6BBD",
        "jala-500": "#0084F3",
        "jala-trust": "#2584F3",
        "jala-insight": "#1D77DF",
        "jala-impact": "#86BBD8",
        "jala-trade": "#EF6437",
        "jala-farm": "#F6AF42",
        "jala-gray": "#385271",
        "jala-hover-bg": "#EAF1FA",
        "jala-primary": "#2284F3",
        "jala-dark-blue": "#002147",
        "jala-dark-blue-100": "#032C5A",
        "jala-light-blue": "#F3F9FC",
        "jala-farm-bg": "#FCF9F4",
        "jala-farm-bg-dark": "#302007",
        "jala-trade-bg-dark": "#FDEEE9",
        "jala-trade-bg": "#FFF6F3",
        "jala-insight-button": "#E2F0F8",
        "jala-farm-button": "#F9EFE0",
        "jala-trade-button": "#FCEFEB",
        "jala-impact-button": "#E6EEF3",
        "jala-app-light-bg": "#E8F0FF",
        "jala-app-text": "#1664D8",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
