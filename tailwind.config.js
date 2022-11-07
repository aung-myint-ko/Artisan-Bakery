/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "560px",

      md: "768px",

      lg: "980px",
    },
    extend: {
      screens: {
        xl: "1200px",
      },
    },
  },
  plugins: [],
};
