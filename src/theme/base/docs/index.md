# 01-boilerplate <Badge type="tip" text="v0.1.0" />

<p style="font-size: 120%">An Anti-Tailwind CSS framework, powered by LLM assistants</p>

## Быстрый старт

```sh
npm i 01-boilerplate
```

```html
<link rel="stylesheet" href="node_modules/01-boilerplate/dist/main.css">
```

## Характеристики

- Sass, PostCSS, [PurgeCSS](purge-css.md) и [NextJS/Vite/Gulp](../../more/chore/gulp-vite-npm-scripts.md)
- CSS-переменные
- Class-light. стиль именования [`.comp-child-mod`](comp-modifier-vs-has-is.md)
- [@scope](base/scope.md) и [@layer](base/cascade-layers.md)
- [`:is`, `:has`, `:where`](base/use-new-features-for-cleaner-css.md)
- [`text-box-trim`, `text-box-edge`](type/text-box-vertical-rhythm.md), `lh`, `rlh`
- [`image-set()`, `field-sizing: content`, `:user-invalid`, `transition-behavior: allow-discrete`](20s-new-features.md) и пр. полезные штучки
- пользовательские медиазапросы и новый синтаксис диапазонов
- отказ от [Tailwind](tailwind/01-tailwind-vs-custom-framework.md), [CSS-модулей](../react/02-styling/02-css-modules.md), [БЭМ](base/cascade-layers-instead-bem.md) и пр. «изоляционистских» подходов
- рефакторинг с Gemini/Claude.

- HTML `dialog`, `details`, `datalist`, `[type='date']`
- Prompt-to-Snippets Collection

## Структура

```text
├─ 01-boilerplate/
│  └─ example/                      # 1
│     ├─ index.html
│     └─ main.js
├─ src/
│  └─ theme/                        # 2
│     ├─ base/                      # 3
│     │  ├─ abstracts/              # 4
│     │  ├─ docs/
│     │  ├─ fonts/
│     │  ├─ _doc.scss               # 5
│     │  ├─ _fonts.scss
│     │  ├─ _print.scss
│     │  ├─ _reset.scss
│     │  ├─ _vars-dark.scss
│     │  ├─ _vars-light.scss
│     │  └─ _vars.scss
│     ├─ components/                # 6
│     │  ├─ button/
│     │  ├─ card/
│     │  ├─ content/
│     │  │  ├─ _copy.scss
│     │  │  ├─ _headings.scss
│     │  │  ├─ _media.scss
│     │  │  └─ _table.scss
│     │  ├─ footer/
│     │  ├─ form/
│     │  │  ├─ _checkbox-radio.scss
│     │  │  ├─ _input.scss
│     │  │  ├─ _label.scss
│     │  │  ├─ _select.scss
│     │  │  ├─ _textarea.scss
│     │  │  └─ _validation.scss
│     │  ├─ header/                 # 7
│     │  ├─ icon/
│     │  ├─ layout/
│     │  │  ├─ _containers.scss
│     │  │  └─ _grid.scss
│     │  ├─ menu/
│     │  ├─ modal/
│     │  ├─ navbar/
│     │  └─ popover/
│     ├─ pages/                     # 8
│     ├─ utils/                     # 9
│     ├─ vendor/                    # 10
│     └─ main.scss                  # 11
├─ package.json                     # 12
└─ vite.config.js
                                    # 13
```

1. Страница-пример со всеми компонентами (Vite)
2. Так как исходные файлы предполагают не только стили, все что связано с интерфейсом изолировано в папке `theme`.
3. В моей структуре я группирую файлы не по типам а по уровням абстракции, поэтому в base, components и pages собираются вместе стили, скрипты, разметка, графика, справочные материалы, истории Storybook и тесты. Вместе с тем, стили можно держать в корневых каталогах `base` и `utils` — оформление, как правило, чаще всего правят.
4. Примеси, функции, пользовательские селекторы и медиазапросы
5. Стили `html` и `body`.
6. Разметка, стили, скрипты, изображения, тесты и Storybook-истории  компонентов

```txt
my-component/
├─ _my-comp.scss
├─ my-comp.js
├─ my-comp.md
├─ my-comp.png
├─ my-comp.stories.tsx
├─ my-comp.test.tsx
└─ my-comp.twig
```

7. «Шапка» может включать либо поле поиска с меню пользователя, либо горизонтальную панель основной навигации `.header-nav`, либо то и другое
8. Разметка, стили, скрипты и изображения страниц
9. Вспомогательные классы.
10. Папка для стилей, разметки и скриптов сторонних разработчиков.
11. Точка входа: собирает все стили.
12. package.json, кроме всего прочего, содержит настройки Eslint, Stylelint, Prettier, PostCSS.
13. В корне также находятся стандартные служебные файлы: CHANGELOG.md, CONTRIBUTING.md, LICENSE.

## LSD (Layer-Scope-DOM) — селекторы

- Использовать `@scope` и [postcss-scoped](https://github.com/simon-engledew/postcss-scoped?utm_source=chatgpt.com).
- Внутри `@scope` — теги, если, не предполагаются различные модификации элемента, и классы типа `comp-child-mod`, если предполагаются.

```scss
@scope (article) to (.comments) {
  h2 {
    --font-size: var(--font-size-h1);
  }
}

@scope (.comments) {
  // h2 оставляем со значениями по умолчанию
  .avatar {
    width: var(--size-4);
  }
}

@scope (.accordion) {
  summary {
    --font-size: var(--font-size-display);
  }
  .accordion-body {
    padding: vad(--size-3);
  }
}

@scope (.navbar) {
  ul {
    list-style: none;
  }
  li {
    padding: 0;
  }
  a {
    text-decoration: none;
  }
}

@scope (.btn-primary) {
  :scope {
    --button-bg: var(--color-brand-primary);
    --btn-padding-x: var(--size-2p5);
  }

  > span {
    font-size: var(--font-size-body-lg);
    font-weight: var(--font-weight-headings);
  }
}
```

Для модификаторов используем CSS-свойства и циклы `@each`.

```scss
// components/Button/_button.scss

.btn {
  --btn-bg: var(--color-ink-fill);
  --btn-color: var(--color-ink-2ry);
  --btn-font-weight: 500;
  --btn-height: var(--size-6);
  --btn-padding-x: var(--size-2p5);
  --btn-padding-y: 0;
  --btn-radius: var(--border-radius-base);

  background-color: var(--btn-bg);
  border-radius: var(--btn-radius);
  color: var(--btn-color);
  display: inline-flex;
  align-items: center;
  gap: var(--size-1);
  justify-content: center;
  font-weight: var(--btn-font-weight);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  text-decoration: none;
  transition: background-color var(--duration-50) var(--duration-50);
  height: var(--btn-height);

  &:hover {
    background-color: var(
      --btn-bg-hover,
      color-mix(in oklch, var(--btn-bg) 95%, hsl(var(--h) var(--s) 99%))
    );
  }
}

$btn-variants: (
  'primary': (
    '--btn-bg': var(--color-brand-primary),
    '--btn-color': var(--color-ink-text-inverse),
    '--btn-bg-hover': var(--color-brand-primary-600),
  ),
  'secondary': (
    '--btn-bg': var(--color-bg-brand),
    '--btn-color': var(--color-ink-2ry),
    '--btn-bg-hover': color-mix(
        in oklch,
        var(--color-bg-brand) 95%,
        hsl(var(--h) var(--s) 99%)
      ),
  ),
  'link': (
    '--btn-bg': transparent,
    '--btn-color': var(--color-ink-link),
    '--btn-bg-hover': transparent,
  ),
  'icon': (
    '--btn-padding-x': 0,
    'width': var(--btn-height),
  ),
);

@each $name, $styles in $btn-variants {
  .btn-#{$name} {
    @each $prop, $value in $styles {
      #{$prop}: #{$value};
    }
  }
}
```

## Совместимость с браузерами предыдущих поколений

Don't use cascade layers or @scope if you care about the Safari 15.3-

```scss
/*
@use 'config';

@use 'base/reset';
@use 'base/animation';
etc ...
*/
```
