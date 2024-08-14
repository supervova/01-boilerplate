# 01-boilerplate

ChatGPT baked framework

- Class-light
- HTML `dialog`, `details`, `datalist`, `[type='date']`
- Cascading Layers
- PostCSS
- Snippets Collection
- 'Behasis' Naming Convention: `block__element` + `has-`/`is-` modifiers

2024 CSS Framework | MVP & Snippets Collection: Modern CSS with Sass & PostCSS.

## TODO: Настроить сборку с 11ty — проконсультироваться с ChatGPT по отдельным вопросам

## TODO: Неспешный рефакторинг

- [ ] Временно добавить все компоненты и сниппеты (включая `stock`) в main.scss и добиться нормальной сборки.

- [ ] Вытащить проект в изолированное окружение. Установить пакеты согласно npm-скриптам. Затем запустить все npm-скриптам и доустановить все недостающие. Скопировать `dependecies` и `devDependecies` в package.json.

- [ ] navbar — добавить script переноса пунктов меню в «выпадашку» «Ещё» при уменьшении высоты панели

- [ ] По мере надобности перетаскивать компоненты из `raw`. При переносе стилей из `init` чистить их с помощью ChatGPT:

  «У меня есть вот такой файл стилей { название компонента }. Я хочу из него сделать заготовку для личного CSS-фреймворка. Убери стили, которые очевидно связаны с конкретным дизайн-макетом и оставь те, которые можно использовать в любом проекте. Если нужно, проведи рефакторинг».

- [ ] Селекторы:

  - Там где можно обойтись тегом, обходиться тегом. Особенно — там где элементов может быть много. Например `li` и `a` в меню. Там где надо разделить элементы разного уровня или порядкового номера, использовать `:where()` и псевдо-классы потомков.
  - Там где теги могут быть разные, добавлять в селектор основной тег с родительским селектором и класс. Например: `.modal article, .modal__base`.
  - Там, где можно, использовать парные селекторы `родитель-потомок`. Там, где это затруднительно, использовать БЭМ.

  ```scss
  .main h1 {}
  .main h2 {}

  /* поскольку модификаторы допускаются у разных
  элементов, лучше и здесь придерживаться «правила
  двух» добавлять класс-обозначение элемента */
  .main /*h2*/.h2.is-highlighted {}
  .main p {}
  .main ol {}

  .navbar ul {}
  .navbar a {}
  .navbar .submenu-item {}

  .card.is-default .title {}
  .card.is-default img {}

  // @scope. Поддержка браузерами летом 2024 - 82%
  // https://github.com/simon-engledew/postcss-scoped
  @scope (.btn.is-primary) {
    :scope {
      background-color: var(--color-brand-primary);
      padding: $size-1p5 $size-1p5;
    }

    > span {
      font-size: var(--font-size-big);
      font-weight: $font-weight-headings;
    }
  }
  ```

## Совместимость с браузерами предыдущих поколений

Don't use cascade layers if you care about the Safari 15.3-

```scss
/*
@use 'config';

@use 'base/reset';
@use 'base/animation';
etc ...
*/
```

## Aрхив

### Настроить сборку с Vite — проконсультироваться с ChatGPT по отдельным вопросам

1. **Очистка директорий (clean.js)**: Для этого можно использовать npm скрипты и `rimraf`.

2. **Копирование файлов (copy.js)**: Используйте Vite плагин для копирования файлов.

3. **Оптимизация изображений (images.js)**: Используйте `vite-plugin-imagemin`.

4. **Сборка Pug шаблонов (pug.js)**: Используйте `vite-plugin-pug`.

5. **Сборка и оптимизация стилей из SCSS (styles.js)**: Vite поддерживает SCSS из коробки.

6. **Сборка и оптимизация JS (scripts.js)**: Vite поддерживает ES-модули и оптимизацию JavaScript.

7. **Локальный сервер (server.js)**: Vite имеет встроенный сервер для разработки.

8. **Сборка SVG-спрайта (sprite.js)**: Используйте отдельные инструменты или скрипты для генерации SVG-спрайтов.

Этот план предоставляет базовую структуру для миграции с Gulp на Vite, сохраняя основную функциональность сборки и оптимизации проекта.


### Запустить сборку

- @babel/core
- @babel/preset-env
- browser-sync
- eslint
- eslint-config-airbnb
- eslint-config-prettier
- eslint-plugin-import
- eslint-plugin-prettier
- imagemin
- imagemin-mozjpeg
- imagemin-pngquant
- imagemin-svgo
- postcss
- postcss-preset-env
- prettier
- prettier-eslint
- rimraf
- sass
- stylelint
- stylelint-config-recommended-scss
- stylelint-config-standard
- stylelint-prettier
- svg-sprite
- webpack

### Для стандартной сборки

- @fullhuman/postcss-purgecss
- cssnano
- gulp
- gulp-changed
- gulp-if
- gulp-imagemin
- gulp-postcss
- gulp-sass
- gulp-size
- gulp-sourcemaps
- gulp-svg-sprite
- postcss-easing-gradients
- postcss-inline-svg
- webpack-stream
- yargs

### Для MVP

- @babel/cli
- babel-loader
- clean-css-cli
- cpy-cli
- npm-run-all
- onchange
- postcss-cli
- webpack-cli

### Дополнительно

- concurrently // Параллельный запуск команд оболочки, использую для Jekyll-сайтов
- prettier-plugin-twig-melody
- shelljs // Выполнение команд оболочки из JS, использую для Jekyll-сайтов
- ttf2woff2

### Дополнительные npm-скрипты

1) Шрифты.

    ```json
    "fonts": "cpy 'src/fonts/*' a/fonts",
    ```

2) `imagemin` не может оптимизировать картинки, сохраняя файловую структуру, поэтому для организации оптимизированных картинок надо применять по одному npm-скрипту на каждую папку:

    ```json
    "img:optimize:root": "imagemin $(find src/img -maxdepth 1 -type f) --out-dir a/img --plugin=mozjpeg --plugin-options=mozjpeg.quality=85 --plugin=pngquant --plugin-options=pngquant.quality=[0.85, 0.9] --plugin=svgo --plugin-options='{\"plugins\": [{\"removeViewBox\": false}, {\"cleanupIDs\": false}]}' --plugin.giflossy.lossy=85",

    "img:optimize:icons": "imagemin src/img/icons --out-dir a/img/icons --plugin=mozjpeg --plugin-options=mozjpeg.quality=85 --plugin=pngquant --plugin-options=pngquant.quality=[0.85, 0.9] --plugin=svgo --plugin-options='{\"plugins\": [{\"removeViewBox\": false}, {\"cleanupIDs\": false}]}' --plugin.giflossy.lossy=85",

    "img:optimize": "npm-run-all img:optimize:root img:optimize:icons --silent",
    ```

    Сборка документации — те же скрипты, что и для сборки основного проекта. В названия команд добавлять приставку `:docs`. Например,

    ```json
    "build:docs": "npm-run-all --parallel build:docs:css build:docs:js build:docs:html --silent",
    ```

3) JavaScript.

    - [ ] Создать файл конфигурации Webpack (webpack.config.js) в корне проекта и определить в нем ваши точки входа и выходной файл бандла.

    ```js
    import path from 'path';

    export default {
      entry: {
        main: './src/index.js',
        vendor: './src/vendor.js',
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        ],
      },
    };
    ```

    - [ ] npm-скрипт

    ```js
    "build:js": "webpack --config webpack.config.js"
    ```

### MVP веб-сайта

- `npm start`
- Если понадобится больше разметки, используем сниппет +html.
- Дополнительные стили см. в 01-boilerplate.
