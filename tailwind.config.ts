import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#030407",
        night: "#080D16",
        electric: "#008CFF",
        glow: "#00BFFF",
        metal: "#F4F6FA",
        silver: "#AEB8C7",
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(0,140,255,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
