import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig, type Plugin } from 'vitest/config';

import { GA_ID, OPENAI_PIXEL_ID } from './src/config';

/**
 * Inject the OpenAI Measurement Pixel (right after <meta charset>, so early
 * events aren't lost) and GA4 (deferred to idle, end of <body>) into every HTML page.
 * Pixel debug logging is on for localhost or with `?oaiq_debug=1`.
 */
function injectTracking(): Plugin {
  const pixel = `<script>
      (function (w, d, s, u) {
        if (w.oaiq) return;
        var q = function () { q.q.push(arguments); };
        q.q = [];
        w.oaiq = q;
        var js = d.createElement(s);
        js.async = true;
        js.src = u;
        var f = d.getElementsByTagName(s)[0];
        f.parentNode.insertBefore(js, f);
      })(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");
      oaiq("init", {
        pixelId: "${OPENAI_PIXEL_ID}",
        debug: location.hostname === "localhost" || /[?&]oaiq_debug=1(&|$)/.test(location.search)
      });
    </script>`;

  const ga = `<script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "${GA_ID}");
      (function () {
        function loadGA() {
          var s = document.createElement("script");
          s.src = "https://www.googletagmanager.com/gtag/js?id=${GA_ID}";
          s.async = true;
          document.head.appendChild(s);
        }
        if ("requestIdleCallback" in window) {
          requestIdleCallback(loadGA, { timeout: 3000 });
        } else {
          setTimeout(loadGA, 2500);
        }
      })();
    </script>`;

  return {
    name: 'inject-tracking',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace(/(<meta charset="[^"]*" \/>)/i, `$1\n    ${pixel}`)
          .replace(/<\/body>/, `    ${ga}\n  </body>`);
      },
    },
  };
}

function inlineCss(): Plugin {
  // CSS chunks are shared between pages, so only drop them once every page
  // has been transformed.
  const inlined = new Set<string>();
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
          if (!linkRe.test(html)) continue;
          html = html.replace(linkRe, `<style>${chunk.source}</style>`);
          inlined.add(fileName);
        }
        return html;
      },
    },
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        inlined.forEach((fileName) => delete bundle[fileName]);
      },
    },
  };
}

export default defineConfig({
  plugins: [cloudflare(), injectTracking(), inlineCss()],
  server: {
    port: 5173,
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: 'index.html',
        revenueReview: 'revenue-review.html',
      },
    },
  },
  // Vitest config
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/test-setup.ts'],
  },
});
