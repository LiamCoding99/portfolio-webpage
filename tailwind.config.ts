import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0d0f14",
        surface: "#141820",
        elevated: "#1a2030",
        "accent-cyan": "#00f5c4",
        "accent-magenta": "#ff2d9b",
        "accent-gold": "#f5c400",
        "text-primary": "#e8eaf0",
        "text-muted": "#6b7280",
        "border-dim": "#1e2535",
        "border-glow": "#00f5c430",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        mono: ["JetBrains Mono", "Share Tech Mono", "monospace"],
      },
      animation: {
        glitch: "glitch 3s infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
        typewriter: "typewriter 0.1s steps(1) forwards",
        "scan-line": "scanLine 8s linear infinite",
        "float-up": "floatUp 0.6s ease-out forwards",
      },
      keyframes: {
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)", filter: "none", clipPath: "none" },
          "91%": {
            transform: "translate(-2px, 1px)",
            filter: "drop-shadow(2px 0 #ff2d9b)",
            clipPath: "polygon(0 15%, 100% 15%, 100% 40%, 0 40%)",
          },
          "93%": {
            transform: "translate(2px, -1px)",
            filter: "drop-shadow(-2px 0 #00f5c4)",
            clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
          },
          "95%": { transform: "translate(0)", filter: "none", clipPath: "none" },
          "96%": {
            transform: "translate(3px, 0)",
            filter: "drop-shadow(-3px 0 #ff2d9b)",
            clipPath: "polygon(0 5%, 100% 5%, 100% 20%, 0 20%)",
          },
          "98%": { transform: "translate(0)", filter: "none", clipPath: "none" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px #00f5c440, 0 0 20px #00f5c420" },
          "50%": { boxShadow: "0 0 20px #00f5c480, 0 0 40px #00f5c440" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
