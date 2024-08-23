import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "",
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: true },
      includeAssets: ["favicon.ico", "icon-512x512.png"],
      manifest: {
        short_name: "HTML playground",
        name: "HTML, CSS & JS playground",
        start_url: "/",
        display: "standalone",
        background_color: "#989898",
        theme_color: "#3f51b5",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            handler: "NetworkFirst",
            urlPattern: new RegExp(
              "^https://html-css-js-simple-playground.netlify.app/(?!.*-).*\\.[^-]+$"
            ),
            options: {
              cacheName: "main-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    assetsDir: "",
    outDir: "build",
    rollupOptions: {
      output: {
        assetFileNames: "[name].[ext]",
        chunkFileNames: "[name].[ext]",
      },
    },
  },
});
