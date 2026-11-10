import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    // React 16 has no "exports" map, so let Vite resolve react-pdf's imports.
    server: { deps: { inline: ['react-pdf'] } },
  },
});
