// 📰 MARKUP

import gulp from 'gulp';
import pug2html from 'gulp-pug';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { root, paths } from './paths.js';
import bsInstance from './browsersync.js';

const { src, dest } = gulp;

const pug = () => {
  return src(paths.markup.src.pug)
    .pipe(
      plumber({
        errorHandler: notify.onError('Pug Error: <%= error.message %>'),
      })
    )
    .pipe(
      pug2html({
        doctype: 'html',
        pretty: true,
        basedir: root.src,
      })
    )
    .pipe(dest(paths.markup.dest))
    .pipe(bsInstance.stream());
};

export default pug;
