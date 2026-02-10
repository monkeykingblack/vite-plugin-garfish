import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import garfish from "vite-plugin-garfish-mf";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    garfish({
      base: "http://localhost:3001",
    }),
  ],
  build: {
    minify: false,
    rollupOptions: {
      preserveEntrySignatures: "exports-only",
    },
  },
});
