// 💙 SVG SPRITE

/* eslint-disable no-console */
import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import { paths } from './paths.js';

const { src, dest } = gulp;

/**
 * Generates SVG sprite from individual SVG files.
 * @param {string} source - Source directory or file path for SVG files.
 * @param {string} name - Name of the generated SVG sprite.
 * @param {string} destination - Destination directory for the generated sprite.
 * @returns {Stream} The Gulp stream.
 */
function generateSvgSprite(source, name, destination) {
  return src(source)
    .pipe(
      plumber({
        errorHandler: (err) => {
          console.error('Error generating SVG sprite:', err.message);
          this.emit('end');
        },
      })
    )
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
}

/**
 * Task for generating SVG sprite.
 * @returns {Stream} The Gulp stream.
 */
const sprite = () => {
  return generateSvgSprite(
    paths.sprite.src.main,
    'sprite.svg', // sprite name
    paths.sprite.dest
  );
};

export default sprite;
