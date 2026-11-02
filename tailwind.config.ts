import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1440px" } },
    extend: {
      colors: {
        ink: "#0A0705",
        coal: "#120D0A",
        ash: "#1D1611",
        bone: "#F6EFE7",
        smoke: "#A89C90",
        ember: "#FF5B1F",
        flame: "#FF8A1F",
        gold: "#FFC24B",
        crimson: "#E3261C",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-hero": ["clamp(2.6rem, 1.4rem + 6vw, 6.4rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "fluid-h2": ["clamp(2rem, 1.3rem + 3.2vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "fluid-h3": ["clamp(1.35rem, 1.1rem + 1vw, 1.9rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "fluid-lead": ["clamp(1rem, 0.94rem + 0.35vw, 1.2rem)", { lineHeight: "1.6" }],
      },
      borderRadius: { "4xl": "2rem" },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,138,31,.35), 0 10px 40px -8px rgba(255,91,31,.55)",
        "glow-lg": "0 0 0 1px rgba(255,194,75,.5), 0 20px 70px -10px rgba(255,91,31,.75)",
      },
      transitionTimingFunction: { out: "cubic-bezier(.16,1,.3,1)" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        flicker: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".75" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        flicker: "flicker 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
