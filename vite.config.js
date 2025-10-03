// vite.config.js
import { defineConfig } from 'vite';
import path from 'node:path';
import viteImagemin from 'vite-plugin-imagemin';

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
  plugins: [
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75,
      },
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
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
