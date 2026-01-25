/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_layouts/**/*.html", "./index.md", "./*.html", "./*.md"],
  theme: {
    extend: {
      colors: {
        olive: {
          50: "#f7f7f0",
          100: "#eeeed9",
          200: "#ddddb8",
          300: "#c8c88e",
          400: "#b4b46a",
          500: "#a3a354",
          600: "#8b8b43",
          700: "#6f6f37",
          800: "#5d5d31",
          900: "#51512d",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
