import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function renderBlockingModulePlugin() {
  return {
    name: 'render-blocking-module',
    transformIndexHtml: {
      order: 'post' as const,
      handler(html: string) {
        return html.replace(
          /<script type="module"(?![^>]*\bblocking=)/g,
          '<script type="module" blocking="render"',
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), renderBlockingModulePlugin()],
  base: './',
  server: {
    port: 5183,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://designsourcebook.vercel.app',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
