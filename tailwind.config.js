/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bright-yellow': '#fdf1cd',
        'sweet-pink': '#d46f93',
        'dark-purple': '#805690'
      },
    }
  },
  plugins: [],
}
