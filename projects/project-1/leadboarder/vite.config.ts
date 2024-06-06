import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueDevTools from "vite-plugin-vue-devtools";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: ["tailwind-config.cjs", "node_modules/**"],
    },
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    viteCommonjs(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "tailwind-config": path.resolve(__dirname, "./tailwind.config.cjs"),
    },
  },
});
