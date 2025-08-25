import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      target: "vercel",
      tsr: {
        virtualRouteConfig: "src/app/routes.ts",
        routesDirectory: "./src/app",
      },
      customViteReactPlugin: true,
    }),
    tailwindcss(),
    react(),
  ],
});
