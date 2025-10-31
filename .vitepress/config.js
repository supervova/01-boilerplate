import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'old-skull',
  description: 'Opinionated SCSS toolkit, powered by LLM assistants',

  srcDir: '.',

  srcExclude: ['**/README.md', '.vitepress/**', 'dist/**', 'node_modules/**'],

  cleanUrls: true,

  rewrites: {
    'src/front/readme.md': 'index.md',
    'src/front/base/base.md': 'base.md',
    'src/front/components/(.*).md': 'components/$1.md',
  },

  themeConfig: {
    nav: [
      { text: 'Quick Start', link: '/' },
      { text: 'Base Styles', link: '/base' },
    ],
  },

  vite: {
    postcss: {},
  },
});
