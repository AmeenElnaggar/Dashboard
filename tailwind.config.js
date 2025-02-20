module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000", // اللون العادي
          dark: "#fff", // اللون لما يكون dark mode
        },
        textColor: {
          DEFAULT: "#29465B", // اللون العادي
          dark: "#fff",
        },
        background: {
          DEFAULT: "#fff",
          dark: "#0f1629",
        },
        backgroundBody: {
          DEFAULT: "#f9fafb",
          dark: "#020517",
        },
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
