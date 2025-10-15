import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  root: "src",
  plugins: [
    eslint({
      include: ["src/**/*.js", "src/**/*.ts"],
      exclude: ["node_modules/**"],
    }),
  ],
  server: {
    port: 5173,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
