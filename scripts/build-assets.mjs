/* eslint-disable no-console */
import { glob } from 'glob';
import path from 'node:path';
import fs from 'fs-extra';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import SVGSpriter from 'svg-sprite';

const projectRoot = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  '..'
);

const imageminPlugins = [
  imageminMozjpeg({ quality: 75 }),
  imageminPngquant({ quality: [0.65, 0.8], speed: 4 }),
  imageminGifsicle({ optimizationLevel: 3 }),
  imageminSvgo({
    plugins: [
      { name: 'removeViewBox', active: false },
      { name: 'removeEmptyAttrs', active: false },
    ],
  }),
];

async function processImages(sourceGlob, destDir, baseDir) {
  const files = await glob(sourceGlob, {
    cwd: projectRoot,
    absolute: true,
    ignore: '**/sprite/**',
  });

  const processingPromises = files.map(async (file) => {
    const relativePath = path.relative(baseDir, file);
    const destPath = path.join(projectRoot, destDir, relativePath);
    await fs.ensureDir(path.dirname(destPath));

    const buffer = await fs.readFile(file);
    try {
      const optimizedBuffer = await imagemin.buffer(buffer, {
        plugins: imageminPlugins,
      });
      await fs.writeFile(destPath, optimizedBuffer);
      console.log(
        `Optimized and copied: ${path.relative(projectRoot, destPath)}`
      );
    } catch (error) {
      console.error(
        `Could not optimize ${file}. Copying as is. Error: ${error.message}`
      );
      await fs.copyFile(file, destPath);
    }
  });

  await Promise.all(processingPromises);
}

async function createSprite() {
  const spriteDestDir = path.join(projectRoot, 'public/assets/icons');
  await fs.ensureDir(spriteDestDir);

  const spriter = new SVGSpriter({
    dest: spriteDestDir,
    mode: {
      symbol: {
        sprite: 'sprite.svg',
        dest: '.',
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
    shape: {
      id: {
        generator: (name) => path.basename(name, '.svg'),
      },
    },
  });

  const spriteSourceDir = path.join(
    projectRoot,
    'frontend/components/icon/sprite'
  );
  const svgFiles = await glob('**/*.svg', {
    cwd: spriteSourceDir,
    absolute: true,
  });

  if (svgFiles.length === 0) {
    console.log('No SVGs found for sprite, skipping sprite creation.');
    return;
  }

  const fileContents = await Promise.all(
    svgFiles.map((file) => fs.readFile(file, 'utf-8'))
  );
  svgFiles.forEach((file, index) => {
    spriter.add(file, path.basename(file), fileContents[index]);
  });

  const { result } = await spriter.compileAsync();
  const writePromises = Object.values(result).flatMap((mode) =>
    Object.values(mode).map(async (resource) => {
      await fs.writeFile(resource.path, resource.contents);
      console.log(
        `SVG Sprite created: ${path.relative(projectRoot, resource.path)}`
      );
    })
  );

  await Promise.all(writePromises);
}

async function main() {
  console.log('Starting asset processing...');

  // Clean previous assets
  await fs.remove(path.join(projectRoot, 'public/assets'));

  // 1. Process framework images from components and pages
  await processImages(
    'frontend/{components,pages}/**/*.+(png|jpg|jpeg|gif|svg|webp)',
    'public/assets/img',
    path.join(projectRoot, 'frontend')
  );

  // 2. Process manifest icons (from icon folder, excluding sprite subdir)
  await processImages(
    'frontend/components/icon/*.+(png|jpg|jpeg|gif|svg|webp)',
    'public/assets/icons',
    path.join(projectRoot, 'frontend/components/icon')
  );

  // 3. Create SVG sprite
  await createSprite();

  console.log('Asset processing complete.');
}

main().catch(console.error);
