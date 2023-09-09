import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
          "background-hover": "hsl(var(--btn-background-hover))",
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
    },
  },
  plugins: [],
};
export default config;
