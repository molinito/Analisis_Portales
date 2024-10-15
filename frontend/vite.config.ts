import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida para los archivos de producción
  },
  server: {
    proxy: {
      "/api": {
        target: "https://analisis-portales-back.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

});