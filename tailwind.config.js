module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff5722", // اللون العادي
          dark: "#007bff", // اللون لما يكون dark mode
        },
        background: {
          DEFAULT: "#f5f5f5",
          dark: "#656422",
        },
        text: {
          DEFAULT: "#333",
          dark: "#fff",
        },
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
