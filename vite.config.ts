import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },  server: {
    port: 8080,
    host: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://dark-math-horizon-backend.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
