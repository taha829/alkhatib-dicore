import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// removed lovable-tagger import per cleanup

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5000,
  },
  plugins: [
  react(),
  // development-only plugins can go here
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
