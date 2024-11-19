/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '64': '16rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-line-clamp'),
  ],
};
