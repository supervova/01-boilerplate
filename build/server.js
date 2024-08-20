// 🗄️ SERVER

import gulp from 'gulp';
import bsInstance from './browsersync.js';
import css from './styles.js';
import img from './images.js';
import js from './scripts.js';
import pug from './markup.js';
import { paths, root } from './paths.js';

const { watch, series } = gulp;

/**
 * Function to reload browser after running a task.
 * @param {Function} task - Gulp task to run before reloading.
 * @returns {Function} - Gulp series that includes the task and a reload.
 */
function watchAndReload(task) {
  return series(task, (done) => {
    bsInstance.reload();
    done();
  });
}

/**
 * Watches files for changes and runs the corresponding tasks.
 */
function watchFiles() {
  watch(paths.css.watch, watchAndReload(css));
  watch(paths.js.watch, watchAndReload(js));
  watch(paths.img.watch, watchAndReload(img));
  watch(paths.markup.watch, watchAndReload(pug));
}

/**
 * Initializes the BrowserSync server and serves the site.
 * @param {Function} done - Callback function to signal task completion.
 */
async function serve(done) {
  bsInstance.init({
    server: {
      baseDir: root.dest.site,
    },
    middleware(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    },
    port: 9000,
    notify: false,
  });
  done();
}

export { serve, watchFiles };
