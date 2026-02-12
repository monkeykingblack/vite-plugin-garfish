import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import garfish from "vite-plugin-garfish-mf";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      reactRefreshHost: "http://localhost:3001",
    }),
    garfish({
      base: "http://localhost:3001",
      sandbox: true,
      esModule: true,
    }),
  ],
  build: {
    minify: false,
  },
});
