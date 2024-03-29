/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js, jsx, ts, tsx}",
    "./src/screens/**.{js, jsx, ts, tsx}",
    "./src/features/**/**.{js, jsx, ts, tsx}"
  ],
  theme: {
    colors: {
      "primary": "#9f1239",
      "secondary": "#f7f4ed",
      "error": "#f20707"
    },
    extend: {},
  },
  plugins: [],
}

