/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        white: "#f4f4f4",
        accent: "#60d6ff",
        shades: "#101820",
        bright: "#fee715",
      },
      backgroundColor: {
        accent: "#60d6ff",
        shades: "#101820",
        tailwindColorDark: "#0e1729",
        tailwindColorGray: "#1d293a",
        bright: "#fee715",
      },
      height: {
        h46_875: "765px",
      },
      maxHeight: {
        fullscreen: "980px",
      },
    },
  },
  plugins: [],
};
