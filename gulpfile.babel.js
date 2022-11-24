/*
TASKS:
clean
img
js
css
twig
sprite
logos
s
gulp
*/

/**
 * -----------------------------------------------------------------------------
 * 🧩 PLUGINS AND PATHS
 * -----------------------------------------------------------------------------
 */
// #region
// The last gulp method is the lastRun
import { src, dest, watch, series, parallel } from 'gulp';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import size from 'gulp-size';
// import sourcemaps from 'gulp-sourcemaps';
import yargs from 'yargs';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import inlineSvg from 'postcss-inline-svg';
import futureFetures from 'postcss-preset-env';
import combineMq from 'postcss-sort-media-queries';
import px2rem from 'postcss-pxtorem';
import uncss from 'postcss-uncss';

import imagemin from 'gulp-imagemin';
import imageminGIF from 'imagemin-gifsicle';
import imageminJPG from 'imagemin-mozjpeg';
import imageminPNG from 'imagemin-pngquant';
import imageminSVG from 'imagemin-svgo';

import svgSprite from 'gulp-svg-sprite';
import webpack from 'webpack-stream';

import shell from 'shelljs';
import del from 'del';
import browserSync from 'browser-sync';

const PRODUCTION = yargs.argv.p;
const sass = gulpSass(dartSass);
const server = browserSync.create();

// https://webpack.js.org/configuration/output/#outputlibrary
const projectLib = 'boilerplate01';

// Paths
const root = {
  src: './src',
  dest: './_site',
};

const paths = {
  css: {
    src: {
      main: `${root.src}/style.scss`,
    },
    watch: `${root.src}/**/*.scss`,
    tmp: `${root.src}/css`,
    dest: `${root.dest}/assets/css`,
  },

  docs: {
    src: ['./docs/**/*.+(html|md)', './CNAME'],
  },

  img: {
    src: {
      graphics: [
        `${root.src}/**/*.+(jpg|jpeg|png|svg|gif|webp|ico)`,
        `!${root.src}/base/graphics/sprite/**/*`,
        `!${root.src}/img/**/*`,
        `!${root.src}/base/graphics/*.+(png|ico)`,
        `!${root.src}/base/graphics/icon.svg`,
      ],
      content: `${root.src}/img/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
    },
    watch: [
      `${root.src}/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
      `!${root.src}/base/graphics/sprite/**/*`,
    ],
    dest: `${root.dest}/assets/img`,
  },

  js: {
    src: {
      main: `${root.src}/main.js`,
    },
    watch: [`${root.src}/**/*.js`],
    dest: `${root.dest}/assets/js`,
  },

  sprite: {
    src: {
      main: [`${root.src}/base/graphics/sprite/*.svg`],
    },
    dest: `${root.src}/base/graphics`,
  },
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🧪 JEKYLL
 * -----------------------------------------------------------------------------
 */
// #region

// eslint-disable Missing JSDoc comment.

// Error: no acceptor (port is in use or requires root privileges)'
// We need to stop the local server, see what processes are running
// on the 4000th port ...
// $ lsof -i tcp:4000
// And then terminate unnecessary processes by specifying the PID
// $ kill -9 <PID>

const jekyllBuild = (done) => {
  let command;

  if (PRODUCTION) {
    command = shell.exec('JEKYLL_ENV=production bundle exec jekyll build');
    done();
  }

  if (!PRODUCTION) {
    command = shell.exec('bundle exec jekyll build --config _config.yml');
    // command = child.spawn('bundle', ['exec', 'jekyll', 'build', '--config', '_config.yml,_config.dev.yml'], { stdio: 'inherit' });
    done();
  }
  return command;
};

const jekyllServe = (done) => {
  shell.exec(
    'bundle exec jekyll serve --incremental --watch --drafts --trace --config _config.yml'
  );
  done();
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🎨 STYLES
 * -----------------------------------------------------------------------------
 */
// #region

// Common styles function
const cssTasks = (source, subtitle, destination, unCssHtml) =>
  src(source)
    .pipe(changed(destination))
    // .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(
      sass({
        precision: 4,
        includePaths: ['.'],
      }).on('error', sass.logError)
    )
    .pipe(postcss([inlineSvg()]))
    .pipe(
      postcss([
        futureFetures({
          stage: 2,
          features: {
            'cascade-layers': false,
            'custom-media-queries': true,
            'custom-properties': false,
            'has-pseudo-class': true,
            'image-set-function': true,
            'logical-properties-and-values': false,
            'media-query-ranges': true,
            'nesting-rules': true,
            'unset-value': true,
          },
        }),
      ])
    )
    .pipe(
      postcss([
        autoprefixer({ cascade: false }),
        combineMq(),
        px2rem({
          propList: [
            'font',
            'font-size',
            'letter-spacing',
            'padding',
            'padding-top',
            'padding-bottom',
          ],
        }),
      ])
    )

    // .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(paths.css.tmp))
    .pipe(
      gulpif(
        PRODUCTION,
        gulpif(
          unCssHtml,
          postcss([
            uncss({
              html: unCssHtml,
              ignore: [
                /* eslint-disable max-len */
                // Bootstrap
                /\w\.fade/,
                /\.collapse?(ing)?/,
                /\.carousel(-[a-zA-Z]+)?/,
                /\.modal(-[a-zA-Z]+)?/,

                // Custom
                /\.[hs]laquo-[a-z0-9]+/,
                /\.[mp][btlrx]-(((sm|md|lg|xl|xxl)-)*?)[0-9s]+/,
                /\.form__control\.is-textarea\.is-touched/,
                /\.form__control\.is-touched/,
                /\.mx-(.*?)auto+/,
                /\.vk/,
                /\w\.(has-been-validated|has-spinner|is-active|is-on|is-open|is-pressed|is-touched)/,
                /iframe/,
                /* eslint-enable max-len */
              ],
            }),
          ])
        )
      )
    )
    .pipe(
      gulpif(
        PRODUCTION,
        postcss([cssnano({ reduceIdents: { keyframes: false } })])
      )
    )
    .pipe(size({ title: `styles: ${subtitle}` }))
    .pipe(dest(destination))
    .pipe(server.stream());

// Main
const css = (done) => {
  cssTasks(
    paths.css.src.main,
    'main', // subtitle
    paths.css.dest,
    ['./docs/html-ipsum.html'] // unCssHtml
  );
  done();
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 💾 SCRIPTS
 * -----------------------------------------------------------------------------
 */
// #region
const js = () => {
  return src(paths.js.src.main)
    .pipe(changed(paths.js.dest))
    .pipe(
      webpack({
        entry: paths.js.src.main,
        mode: PRODUCTION ? 'production' : 'development',
        devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
          filename: '[name].js',
          library: projectLib,
        },
      })
    )
    .pipe(size({ title: 'scripts' }))
    .pipe(dest(paths.js.dest));
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🖼 IMAGES
 * -----------------------------------------------------------------------------
 */
// #region

// Common images function
const imgTasks = (source, subtitle, destination) =>
  src(source)
    .pipe(changed(paths.img.dest))
    .pipe(
      gulpif(
        PRODUCTION,
        imagemin(
          [
            imageminGIF({
              interlaced: true,
              optimizationLevel: 3,
            }),
            imageminJPG({ quality: 85 }),
            imageminPNG([0.85, 0.9]),
            imageminSVG({
              plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
            }),
          ],
          { verbose: true }
        )
      )
    )
    .pipe(dest(destination))
    .pipe(size({ title: `images: ${subtitle}` }));

// Components
const imgGraphics = (done) => {
  imgTasks(
    paths.img.src.graphics,
    'graphics', // subtitle
    paths.img.dest
  );
  done();
};

// Graphics
const imgContent = (done) => {
  imgTasks(
    paths.img.src.content,
    'content', // subtitle
    paths.img.dest
  );
  done();
};

// OPTIMIZE
const img = parallel(imgGraphics, imgContent);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * ❤️ SVG SPRITE
 * -----------------------------------------------------------------------------
 */
// #region

const svgTasks = (source, name, destination) => {
  return src(source)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: '.', // Output in the same directory
            sprite: name, // Sprite path and name
            prefix: '.', // Prefix for CSS selectors
            dimensions: '', // Suffix for dimension CSS selectors
          },
        },
        svg: {
          xmlDeclaration: false, // strip out the XML attribute
          doctypeDeclaration: false, // don't include the !DOCTYPE declaration
          namespaceClassnames: false, // keep the source class names untouched
        },
      })
    )
    .pipe(dest(destination));
};

const sprite = (done) => {
  svgTasks(
    paths.sprite.src.main,
    'sprite.svg', // sprite name
    paths.sprite.dest
  );
  done();
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🛠 UTILITIES
 * -----------------------------------------------------------------------------
 */
// #region
const clean = () => {
  return del([`${root.dest}/**/*`]);
};

const copyDocs = () => {
  return src(paths.docs.src).pipe(changed(root.dest)).pipe(dest(root.dest));
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📶 SERVER
 * -----------------------------------------------------------------------------
 */
// #region
const reload = (done) => {
  server.reload();
  done();
};

const watchFiles = () => {
  watch(paths.css.watch, css);
  watch(paths.js.watch, series(js, reload));
  watch(paths.img.watch, series(img, reload));
  watch(paths.docs.src, series(copyDocs, reload));
};

const serve = series(
  clean,
  copyDocs,
  sprite,
  jekyllBuild,
  parallel(css, js, img),
  jekyllServe
);

/* Use Browsersync for testing on mobile devices. Use html paths instead
extension-free permalinks */
const browserSyncStart = (done) => {
  server.init({
    server: {
      baseDir: root.dest,
    },
    middleware(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    },
    port: 9000,
    notify: false,
  });
  done();
};

const serveBrowserSync = series(
  copyDocs,
  sprite,
  parallel(css, js, img),
  browserSyncStart,
  watchFiles
);

// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🏗 BUILD
 * -----------------------------------------------------------------------------
 */
// #region
const build = series(
  clean,
  jekyllBuild,
  sprite,
  parallel(css, js, img, copyDocs)
);

// #endregion

/**
 * -----------------------------------------------------------------------------
 * ☑️ TASKS
 * -----------------------------------------------------------------------------
 */

// Add-ons
exports.bs = serveBrowserSync;
exports.clean = clean;
exports.docs = copyDocs;
exports.j = jekyllBuild;
exports.jks = jekyllServe;

// Base
exports.img = img;
exports.js = js;
exports.css = css;
exports.sprite = sprite;
exports.w = watchFiles;
exports.default = build;
exports.s = serve;
