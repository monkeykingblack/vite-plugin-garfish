import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import garfish from "vite-plugin-garfish-mf";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    garfish({
      base: "http://localhost:3002",
    }),
  ],
  build: {
    minify: false,
  },
});
