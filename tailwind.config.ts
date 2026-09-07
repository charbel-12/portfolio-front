import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0E17",
        surface: "#111726",
        surface2: "#161D2E",
        line: "#212A3C",
        ink: "#E9EDF4",
        muted: "#8A93A8",
        signal: "#2DD4BF",
        signalDim: "#1B6E63",
        pulse: "#F5A623",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
      },
      keyframes: {
        bar: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(45,212,191,0.5)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 0 6px rgba(45,212,191,0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInScale: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        subtleFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 40px" },
        },
      },
      animation: {
        bar1: "bar 1.1s ease-in-out infinite",
        bar2: "bar 1.3s ease-in-out infinite 0.15s",
        bar3: "bar 0.9s ease-in-out infinite 0.3s",
        bar4: "bar 1.4s ease-in-out infinite 0.05s",
        bar5: "bar 1.0s ease-in-out infinite 0.25s",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fadeInScale: "fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideInLeft: "slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideInRight: "slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        subtleFloat: "subtleFloat 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
