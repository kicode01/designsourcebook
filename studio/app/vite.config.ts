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
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      preserveEntrySignatures: 'exports-only',
      input: {
        main: 'index.html',
        'easter-eggs': 'src/easter-eggs/catalogBridge.tsx',
      },
      output: {
        entryFileNames: (chunkInfo) =>
          chunkInfo.name === 'easter-eggs' ? 'assets/easter-eggs.js' : 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
