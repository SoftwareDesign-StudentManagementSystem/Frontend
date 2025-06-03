import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.svg"],

  plugins: [
    react(),
    istanbul({
      include: "src/**/*.{js,ts,jsx,tsx}",
      exclude: ["node_modules", "tests/"],
      extension: [".ts", ".tsx"],
      cypress: false, // Playwright 사용 시 false
      requireEnv: true,
    }),
  ],
});
