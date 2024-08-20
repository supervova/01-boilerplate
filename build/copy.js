// 🖼 COPY FILES WITHOUT OPTIMIZATION

import gulp from 'gulp';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { paths } from './paths.js';

const { src, dest } = gulp;

/**
 * Copies files that do not need to be optimized or built to the dist folder.
 * To handle different types of files, create copies of this function with modified paths.
 *
 * @returns {NodeJS.WritableStream} The Gulp stream.
 */
export default function copyFiles() {
  return src(paths.files.src)
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(newer(paths.files.dest))
    .pipe(dest(paths.files.dest));
}
