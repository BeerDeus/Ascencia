import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  base: './', // chemins relatifs : marche dans Capacitor ET sous /preview/
  plugins: [svelte()],
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  // Le jeu est compilé dans dist/jouer/ ; tools/build-site.mjs ajoute la vitrine à la racine de dist/.
  build: { outDir: 'dist/jouer', emptyOutDir: true, target: 'es2020', assetsInlineLimit: 0, chunkSizeWarningLimit: 600 },
  server: { host: true },
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
});
