/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue, js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./formkit.config.js"
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.blue, // Light mode Datepicker color
        // "vtd-secondary": colors.gray, // Dark mode Datepicker color
      },
    },
  },
  plugins: [],
}

