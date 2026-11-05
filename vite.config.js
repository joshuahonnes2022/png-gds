import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes every asset path relative, so the built site works from
// any XAMPP folder (e.g. http://localhost/pngds/) without changing config.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 800, // docs site bundles react-dom/server to generate HTML snippets
  },
});
