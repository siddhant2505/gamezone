/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: "jit",
    purge: ["./pages/**/*.js", "./components/**/*.js"],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          // Light mode colors
          "light-primary": "#DDFFF7",
          "light-secondary": "#EF6461",
          "light-accent": "#4ECDC4",
          "light-text": "#0A2E36",
          // Dark mode colors
          "dark-primary": "#44318d",
          "dark-secondary": "#cdbeff",
          "dark-accent": "#d04084",
          "dark-text": "#E8E9EB",
        },
      },
    },
    variants: {},
    plugins: [],
  };
  