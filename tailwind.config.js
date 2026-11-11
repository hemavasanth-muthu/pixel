/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg: "#09090b",
          surface: "#111115",
          card: "#16161c",
          border: "#23232c",
          gold: "#F5B726",
          goldLight: "#FED40E",
          goldDark: "#C48E11",
          goldMuted: "rgba(245, 183, 38, 0.15)",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(245, 183, 38, 0.25)',
        'gold-sm': '0 0 12px rgba(245, 183, 38, 0.3)',
      }
    },
  },
  plugins: [],
}

