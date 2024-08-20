// 🤖 SCRIPTS

import gulp from 'gulp';
import newer from 'gulp-newer';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import { createGulpEsbuild } from 'gulp-esbuild';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { paths } from './paths.js';
import bsInstance from './browsersync.js';

const { src, dest } = gulp;
const gulpEsbuild = createGulpEsbuild();
const { argv } = yargs(hideBin(process.argv));
const PRODUCTION = argv.p;

function handleError(title) {
  return plumber({
    errorHandler: notify.onError({
      title,
      message: '<%= error.message %>',
    }),
  });
}

export default function js() {
  return src(paths.js.src.main)
    .pipe(handleError('JS Compile Error'))
    .pipe(
      gulpEsbuild({
        outfile: 'main.js',
        bundle: true,
        minify: PRODUCTION, // Минимизация при использовании флага --p
      }).on('error', (err) => {
        console.error('Error in esbuild:', err.message);
        this.emit('end');
      })
    )
    .pipe(dest(paths.js.dest))
    .pipe(bsInstance.stream());
}

/**
 * Copies standalone JavaScript files to the destination directory.
 *
 * This function handles errors, checks for newer files,
 * and streams the result to the destination directory.
 *
 * @returns {Stream} The Gulp stream.
 */
export function copyJs() {
  return src(paths.js.src.standAlone)
    .pipe(handleError('Copy JS Error'))
    .pipe(newer(paths.js.dest))
    .pipe(dest(paths.js.dest));
}
