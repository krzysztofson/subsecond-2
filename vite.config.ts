import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig, type Plugin } from 'vitest/config';

function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (chunk.type !== 'asset' || !fileName.endsWith('.css')) continue;
          const href = `/${fileName}`;
          const linkRe = new RegExp(
            `<link[^>]*rel="stylesheet"[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
          );
          html = html.replace(linkRe, `<style>${chunk.source}</style>`);
          delete bundle[fileName];
        }
        return html;
      },
    },
  };
}

export default defineConfig({
  plugins: [cloudflare(), inlineCss()],
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
