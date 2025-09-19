import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    hmr: {
      port: 7001,
      path: "/hmr",
    },
  },
  // test: {
  //   globals: true,
  //   setupFiles: ["./src/tests/setup.ts"],
  //   environment: "jsdom",
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
