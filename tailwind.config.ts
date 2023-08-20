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
