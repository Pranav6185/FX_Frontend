import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#16697a",
          foreground: "#ffffff",
          100: "#041518",
          200: "#092a30",
          300: "#0d3f48",
          400: "#125361",
          500: "#16697a",
          600: "#229eb7",
          700: "#45c4dd",
          800: "#83d7e8",
          900: "#c1ebf4",
        },
        secondary: {
          DEFAULT: "#ebebeb",
          foreground: "#2f2f2f",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#c0c0c0",
          foreground: "#4d4d4d",
        },
        accent: {
          DEFAULT: "#3a6ea5",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ebebeb",
          foreground: "#2f2f2f",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#2f2f2f",
        },
        sidebar: {
          DEFAULT: "#ebebeb",
          foreground: "#2f2f2f",
          primary: "#ff6700",
          "primary-foreground": "#ffffff",
          accent: "#c0c0c0",
          "accent-foreground": "#2f2f2f",
          border: "#cccccc",
          ring: "#004e98",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        xs: "2px", // ✅ Added for glassmorphism blur effect
      },
      keyframes: {
         wiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(6px)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
