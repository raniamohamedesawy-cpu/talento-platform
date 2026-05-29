import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",         // Bind to all interfaces for Docker
    port: 5173,                // Explicit port
    strictPort: true,          // Fail if port is taken
    hmr: {
      host: "localhost",
      port: 5173,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
