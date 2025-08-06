/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      colors: {
        border: "rgb(var(--color-border))",
        input: "rgb(var(--color-input))",
        ring: "rgb(var(--color-ring))",
        background: "rgb(var(--color-background))",
        foreground: "rgb(var(--color-foreground))",
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          foreground: "rgb(var(--color-primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary))",
          foreground: "rgb(var(--color-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive))",
          foreground: "rgb(var(--color-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted))",
          foreground: "rgb(var(--color-muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent))",
          foreground: "rgb(var(--color-accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--color-popover))",
          foreground: "rgb(var(--color-popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--color-card))",
          foreground: "rgb(var(--color-card-foreground))",
        },
        sidebar: {
          DEFAULT: "rgb(var(--color-sidebar))",
          foreground: "rgb(var(--color-sidebar-foreground))",
          primary: "rgb(var(--color-sidebar-primary))",
          "primary-foreground": "rgb(var(--color-sidebar-primary-foreground))",
          accent: "rgb(var(--color-sidebar-accent))",
          "accent-foreground": "rgb(var(--color-sidebar-accent-foreground))",
          border: "rgb(var(--color-sidebar-border))",
          ring: "rgb(var(--color-sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
        serif: ["var(--font-roboto-serif)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}