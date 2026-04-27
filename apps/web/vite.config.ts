import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // icon: true,
        titleProp: true,
        exportType: "default",
        memo: true,
        ref: true,
      },
      include: "**/*.svg",
      exclude: "",
    }),
  ],
});
