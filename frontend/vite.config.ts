import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      injectRegister: "auto",      // 👈 Add this
      registerType: "autoUpdate",

      devOptions: {
        enabled: true,             // 👈 Add this
      },

      manifest: {
        name: "KarmYog",
        short_name: "KarmYog",

        description:
          "Build discipline through consistent Karm. Focus on the action, not the outcome.",

        theme_color: "#2563EB",
        background_color: "#ffffff",

        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});