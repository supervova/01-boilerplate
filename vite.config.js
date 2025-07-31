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
      css: {
        postcss: {
          'postcss-preset-env': {
            stage: 2,
            features: {
              'cascade-layers': false,
              'custom-media-queries': true,
              'custom-properties': false,
              'custom-selectors': true,
              'has-pseudo-class': true,
              'image-set-function': true,
              'is-pseudo-class': false,
              'logical-properties-and-values': false,
              'media-query-ranges': true,
              'nesting-rules': true,
              'unset-value': true,
            },
            autoprefixer: {
              cascade: false,
            },
          },
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
