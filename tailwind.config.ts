import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      red_mains: "#B85252",
      purple_mains: "#8083AE",
      yellow_secondary: "#CF9855",
      gray_light_secondary: "#808881",
      gray_dark_secondary: "#54534D",
      green_accent: "#6BDBC6",
      black_bg: "#191818",
      puprple_lightest_bg: "#D2C3C8",
      purple_lighter_additional: "#B8A4AA",
      purple_light_additional: "#9D92AB",
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
      head_3_sm: "1.188rem",
      body_sm: "1rem",
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
