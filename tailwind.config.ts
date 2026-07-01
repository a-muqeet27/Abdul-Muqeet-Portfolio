import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00d4ff",
        secondary: "#00f5ff",
        accent: "#00ff88",
        "dark-bg": "#0a0a0f",
        "dark-card": "#1a1a2e",
        "dark-card-hover": "#252540",
        "light-bg": "#0f0f1a",
        "text-light": "#ffffff",
        "text-dark": "#e0e0e0",
        "text-gray": "#a0a0b0",
      },
      backgroundImage: {
        gradient: "linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #0066ff 100%)",
        "gradient-alt": "linear-gradient(135deg, #00ff88 0%, #00cc66 100%)",
        "home-gradient": "linear-gradient(135deg, #001122 0%, #003366 50%, #0066cc 100%)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Segoe UI", "Tahoma", "sans-serif"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        smooth: "450ms",
        slower: "750ms",
      },
      boxShadow: {
        glow: "0 0 24px rgba(0, 212, 255, 0.25)",
        card: "0 10px 30px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 15s ease infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.05)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
