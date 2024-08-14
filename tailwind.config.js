/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        zoomIn: {
          "0%": { opacity: 0, transform: "scale(0.5,0.5)" },
          "100%": { opacity: 1, transform: "scale(1,1)" },
        },
        zoomOut: {
          "0%": { opacity: 0, transform: "scale(1,1)" },
          "100%": { opacity: 1, transform: "scale(0,0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease ",
        zoomIn: "zoomIn 0.3s ease",
        zoomOut: "zoomOut 0.3s ease",
      },
    },
  },
  plugins: [],
};
