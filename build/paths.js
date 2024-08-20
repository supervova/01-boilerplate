// 👉 PATHS

const root = {
  src: './src',
  tmp: './src/assets',
  dest: {
    site: './dist',
    assets: './dist/assets',
  },
};

const srcBase = root.src;
const destAssets = root.dest.assets;

const paths = {
  css: {
    src: {
      main: `${srcBase}/main.scss`,
    },
    watch: `${srcBase}/**/*.scss`,
    tmp: `${root.tmp}/css`,
    dest: `${destAssets}/css`,
  },

  markup: {
    src: {
      pug: [
        `${srcBase}/pages/**/*.pug`,
        `!${srcBase}/pages/**/_*.pug`,
        `!${srcBase}/pages/base/*.pug`,
        `!${srcBase}/pages/notes/*.pug`,
      ],
      twig: ['./twig/static/**/*.twig'],
      toMin: `${root.dest.site}/**/*.html`,
    },
    watch: `${srcBase}/**/*.pug`,
    dest: root.dest.site,
  },

  img: {
    src: {
      graphics: [
        `${srcBase}/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
        `!${srcBase}/components/icon/sprite/**/*`,
        `!${srcBase}/components/icon/svg-bg/**/*`,
        `!${srcBase}/assets/img/**/*`,
      ],
      content: `${srcBase}/assets/img/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
    },
    watch: [
      `${srcBase}/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
      `!${srcBase}/components/icon/sprite/**/*`,
    ],
    dest: `${destAssets}/img`,
  },

  js: {
    src: {
      main: `${srcBase}/main.js`,
      standAlone: [`${srcBase}/scripts/*.js`],
    },
    watch: `${srcBase}/**/*.js`,
    dest: `${destAssets}/js`,
  },

  sprite: {
    src: {
      main: `${srcBase}/components/icon/sprite/*.svg`,
    },
    dest: `${srcBase}/components/icon`,
  },

  files: {
    src: [
      `${srcBase}/**/*.+(mp4|ogg|ogv|webm)`,
      `${srcBase}/**/*.zip`,
      `${srcBase}/assets/**/!(img)/**/*`,
      `!${srcBase}/assets/img/**/*`,
    ],
    dest: destAssets,
  },
};

export { root, paths };
