// vite.config.js
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig(() => ({
  // Dev server: root = example/
  root: path.resolve(__dirname, 'example'),
  server: {
    open: true,
    port: 5173,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'frontend'),
      '@frontend': path.resolve(__dirname, 'frontend'),
    },
  },
  css: {
    devSourcemap: true,
  },
  test: {
    environment: 'node',
    globals: true,
    root: __dirname,
    include: ['frontend/**/*.test.{js,ts,jsx,tsx}'],
  },
}));
