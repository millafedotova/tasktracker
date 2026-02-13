/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"  // <-- все файлы в src
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
