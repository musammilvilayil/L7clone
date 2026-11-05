import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Two builds share this config:
 *  - client  (`vite build`)                         → dist/client, with a manifest
 *  - server  (`vite build --ssr src/entry-server.tsx`) → dist/server, used only at build
 *    time by scripts/prerender.mjs to write static HTML for every route.
 */
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  define: {
    // Baked in at build time so server and client render the same year
    // (no hydration mismatch, no runtime Date call in the footer).
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    outDir: isSsrBuild ? "dist/server" : "dist/client",
    emptyOutDir: true,
    // The prerender step reads the manifest to add modulepreload + stylesheet
    // links for the exact chunks each route needs.
    manifest: !isSsrBuild,
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
}));
