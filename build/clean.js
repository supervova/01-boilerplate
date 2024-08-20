// 🧹 CLEAN UP

/* eslint-disable no-console */
import { deleteAsync } from 'del';
import { root } from './paths.js';

/**
 * Cleans the build directories for the site, excluding assets.
 *
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
export function cleanPages() {
  return deleteAsync([
    `${root.dest.site}/**/*`,
    `!${root.dest.site}/assets`,
    `!${root.dest.site}/CNAME`,
    `!${root.dest.site}/favicon.ico`,
    `!${root.dest.site}/manifest.json`,
    `!${root.dest.site}/robots.txt`,
  ]);
}

/**
 * Cleans the assets directories (CSS, JS, and images).
 *
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
export function cleanAssets() {
  return deleteAsync([
    `${root.dest.site}/assets/**/*`,
    `!${root.dest.site}/assets/fonts/**/*`,
    `!${root.dest.site}/assets/fonts`,
  ]);
}

/**
 * Cleans the source CSS files.
 *
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
export function cleanSrc() {
  return deleteAsync([`${root.src}/**/*.css`]);
}
