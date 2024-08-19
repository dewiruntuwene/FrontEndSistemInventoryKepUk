import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createProxyMiddleware } from "http-proxy-middleware";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@components": "/src/components",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://inventoryfkep-46301.portmap.io:46301",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
