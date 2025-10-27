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
  // base: "./",
  base: "/rsschool-shorttrack/coffee-house/",
  build: {
    outDir: "../dist/coffee-house",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/index.html",
        menu: "src/menu.html",
        cart: "src/cart.html",
      },
    },
  },
});
