import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        red_mains: "#B85252",
        purple_mains: "#8083AE",
        yellow_secondary: "#CF9855",
        gray_light_secondary: "#808881",
        gray_dark_secondary: "#54534D",
        green_accent: "#6BDBC6",
        black_bg: "#191818",
        purple_events: "#E7D8DD",
        puprple_lightest_bg: "#E7D8DD",
        purple_lighter_additional: "#B8A4AA",
        purple_light_additional: "#9D92AB",
        btn: {
          background: "hsl(var(--btn-background))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      screens: {
        sm: "370px",
        md: "1024px",
        xl: "1440px",
      },
      fontSize: {
        display_lg: "14.813rem",
        head_1_lg: "4.5rem",
        head_2_lg: "2.125rem",
        body_ds: "1.375rem",
        caption_ds: "1rem",
        display_sm: "4.5rem",
        head_menu_sm: "2.875rem",
        head_1_sm: "2.125rem",
        head_2_sm: "1.625rem",
        head_3_sm: "1.188rem", //19px
        body_sm: "1rem",
      },
      gridTemplateColumns: {
        custom: "minmax(0, 25rem) 1fr",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
