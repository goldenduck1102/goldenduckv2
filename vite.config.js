import { defineConfig } from 'vite';
import { renderComponents } from './src/components.mjs';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY?.split('/')[0];

function pagesAssetPaths(html) {
  const normalized = html.replace(/(["'\s,])\/assets\//g, '$1./assets/');
  if (!repository) return normalized;
  return normalized.replace(
    /(<meta\b[^>]*property="og:image"[^>]*content=")\.\/assets\//g,
    `$1https://${owner}.github.io/${repository}/assets/`,
  );
}

export default defineConfig({
  base: repository ? `/${repository}/` : '/',
  plugins: [{
    name: 'orchestars-shared-components',
    transformIndexHtml: { order: 'pre', handler: (html) => pagesAssetPaths(renderComponents(html)) },
    configureServer(server) {
      server.watcher.add(new URL('./src/components.mjs', import.meta.url).pathname);
    },
    async handleHotUpdate(context) {
      if (context.file.endsWith('/src/components.mjs')) {
        // Restart reloads the imported render functions as well as the browser.
        await context.server.restart();
        return [];
      }
    },
  }],
});
