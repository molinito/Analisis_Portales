import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida para los archivos de producción
  },
  server: {
    proxy: {
      "/api": "http://localhost:3005", // Solo en desarrollo
    },
  },
});
