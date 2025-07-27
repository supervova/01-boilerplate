import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '01-boilerplate',
  description: 'Opinionated SCSS toolkit, powered by LLM assistants',

  srcDir: '.',

  srcExclude: ['**/README.md', '.vitepress/**', 'dist/**', 'node_modules/**'],

  cleanUrls: true,

  rewrites: {
    'src/theme/base/docs/index.md': 'index.md',
    'src/theme/base/docs/base.md': 'base.md',
    'src/theme/components/(.*).md': 'components/$1.md',
  },

  themeConfig: {
    nav: [
      { text: 'Quick Start', link: '/' },
      { text: 'Base Styles', link: '/base' },
    ],
  },
});
