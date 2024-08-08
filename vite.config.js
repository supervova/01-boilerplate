import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';
import viteImagemin from 'vite-plugin-imagemin';
import path from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
      },
    },
  },
  plugins: [
    pugPlugin(),
    viteImagemin({
      gifsicle: { optimizationLevel: 3, interlaced: true },
      mozjpeg: { quality: 85 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
      },
    }),
  ],
  server: {
    port: 9000,
    open: true,
  },
});
