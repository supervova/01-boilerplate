// 🖼 IMAGES

import gulp from 'gulp';
import newer from 'gulp-newer';
import size from 'gulp-size';
import imagemin from 'gulp-imagemin';
import imageminGIF from 'imagemin-gifsicle';
import imageminJPG from 'imagemin-mozjpeg';
import imageminPNG from 'imagemin-pngquant';
import imageminSVG from 'imagemin-svgo';
import { paths } from './paths.js';

const { src, dest, parallel } = gulp;

/**
 * Minifies images with various optimizations.
 * @param {string} source - Source directory for images.
 * @param {string} subtitle - Subtitle used for logging purposes.
 * @returns {NodeJS.WritableStream} The Gulp stream.
 */
function minifyImages(source, subtitle) {
  return src(source, { encoding: false })
    .pipe(newer(paths.img.dest))
    .pipe(
      imagemin(
        [
          imageminGIF({ interlaced: true, optimizationLevel: 3 }),
          imageminJPG({ quality: 85 }),
          imageminPNG(),
          imageminSVG({
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
              {
                name: 'cleanupIds',
                params: {
                  remove: false,
                  minify: false,
                  preserve: [],
                  preservePrefixes: [],
                  force: false,
                },
              },
            ],
          }),
        ],
        { verbose: true }
      )
    )
    .pipe(dest(paths.img.dest))
    .pipe(size({ title: `images: ${subtitle}` }));
}

/**
 * Task for processing graphics images.
 * @returns {NodeJS.WritableStream} The Gulp stream.
 */
export function imgGraphics() {
  return minifyImages(paths.img.src.graphics, 'graphics');
}

/**
 * Task for processing content images.
 * @returns {NodeJS.WritableStream} The Gulp stream.
 */
export function imgContent() {
  return minifyImages(paths.img.src.content, 'content');
}

// Parallel task for image processing
const img = parallel(imgGraphics, imgContent);

export default img;
