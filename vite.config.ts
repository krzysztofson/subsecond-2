import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [cloudflare()],
  server: {
    port: 5173,
  },
  build: {
    target: 'es2022',
  },
  // Vitest config
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/test-setup.ts'],
  },
});
