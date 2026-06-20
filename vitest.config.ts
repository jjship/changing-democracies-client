import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    include: ["**/__tests__/**/*.test.{ts,tsx}"],
    deps: {
      optimizer: {
        web: {
          include: ["next"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "app/components"),
      "@/types": path.resolve(__dirname, "types"),
      "@/supabase": path.resolve(__dirname, "supabase"),
      "@/auth": path.resolve(__dirname, "app/auth"),
      "@/utils": path.resolve(__dirname, "utils"),
      "@/ui": path.resolve(__dirname, "app/components/ui"),
      "@/translation": path.resolve(__dirname, "app/[lang]/context"),
      "@/app": path.resolve(__dirname, "app"),
      "@": path.resolve(__dirname),
    },
  },
});
