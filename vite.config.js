import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.scss'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: { assetFileNames: 'index.css' },
    },
  },
  css: {
    postcss: {
      plugins: [require('autoprefixer'), require('postcss-csso')],
    },
  },
});
