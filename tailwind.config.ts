import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b0b0b",
        foreground: "#ffffff",
        accent: "#F44A22"
      }
    }
  },
  plugins: []
};

export default config;
