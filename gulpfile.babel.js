import gulp from 'gulp';
import cssTasks from './build/styles.js';
import imgTasks from './build/images.js';
import jsTasks, { copyJs } from './build/scripts.js';
import spriteTask from './build/sprite.js';
import { cleanAssets, cleanSrc, cleanPages } from './build/clean.js';
import copyFiles from './build/copy.js';
import markupTask from './build/markup.js';
import { serve, watchFiles } from './build/server.js';

const { series, parallel } = gulp;

// Define the main build process
const build = series(
  cleanPages,
  cleanSrc,
  markupTask,
  spriteTask,
  imgTasks,
  copyFiles,
  copyJs,
  parallel(cssTasks, jsTasks)
);

// Define the development process
const dev = series(build, serve, watchFiles);

// Named exports for individual tasks
export {
  copyFiles as copy,
  cleanAssets,
  cleanSrc,
  cleanPages,
  spriteTask as sprite,
  imgTasks as img,
  markupTask as pug,
  cssTasks as css,
  jsTasks as js,
  watchFiles as w,
  build,
  dev,
};

// Set the default task to dev
export default dev;
