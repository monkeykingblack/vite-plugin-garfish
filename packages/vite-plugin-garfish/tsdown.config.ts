import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/index.ts",
  outDir: "dist",
  external: ["vite"],
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
});
