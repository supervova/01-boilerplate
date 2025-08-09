import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig(({ command }) => {
  // Build the library
  if (command === 'build') {
    return {
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/main.scss'),
          formats: ['es', 'cjs'],
        },
        rollupOptions: {
          output: { assetFileNames: 'main.css' },
        },
      },
    };
  }

  // 2.  Dev. server: root = example/
  return {
    root: path.resolve(__dirname, 'example'),
    server: {
      open: true,
      port: 5173,
    },
    resolve: {
      alias: {
        // make `import '../src/...'` works from example/
        '@src': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: { charset: false }, // removes @charset from each HMR injection
      },
    },
  };
});
