import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), Components({})],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
