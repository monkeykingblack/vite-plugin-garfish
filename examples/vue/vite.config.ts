import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import garfish from "vite-plugin-garfish";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    garfish({
      name: "vue",
      base: "http://localhost:3002",
    }),
  ],
});
