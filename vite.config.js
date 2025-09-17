import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@api": "/src/api",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@styles": "/src/styles",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@constants": "/src/constants",
      "@schemas": "/src/schemas",
      "@config": "/src/config",
      "@contexts": "/src/contexts"
    },
  },
});
