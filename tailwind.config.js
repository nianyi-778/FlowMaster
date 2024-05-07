/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["LXGW WenKai Screen", 'Graphik', 'sans-serif', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}

