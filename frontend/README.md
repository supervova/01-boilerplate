# 01-boilerplate <Badge type="tip" text="v0.1.0" />

<p style="font-size: 120%">A Tailwind-free CSS framework, powered by LLM assistants</p>

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
- [`image-set()`, `field-sizing: content`, `:user-invalid`, `transition-behavior: allow-discrete`](20s-new-features.md) и пр. полезные штучки
- пользовательские медиазапросы и новый синтаксис диапазонов
- отказ от [Tailwind](tailwind/01-tailwind-vs-custom-framework.md), [CSS-модулей](../react/02-styling/02-css-modules.md), [БЭМ](base/cascade-layers-instead-bem.md) и пр. «изоляционистских» подходов
- рефакторинг с Gemini/Claude.

- HTML `dialog`, `details`, `datalist`, `[type='date']`
- Prompt-to-Snippets Collection

## Структура

```text
01-boilerplate/
├─ docs/                            # 1
├─ example/                         # 2
│   ├─ index.html
│   └─ main.js
├─ frontend/                        # 3
│  ├─ components/                   # 4
│  │  ├─ button/
│  │  ├─ card/
│  │  ├─ content/
│  │  │  ├─ _copy.scss
│  │  │  ├─ _headings.scss
│  │  │  ├─ _media.scss
│  │  │  └─ _table.scss
│  │  ├─ footer/
│  │  ├─ form/
│  │  │  ├─ _checkbox-radio.scss
│  │  │  ├─ _input.scss
│  │  │  ├─ _label.scss
│  │  │  ├─ _select.scss
│  │  │  ├─ _textarea.scss
│  │  │  └─ _validation.scss
│  │  ├─ header/                    # 5
│  │  ├─ hero/
│  │  ├─ icon/
│  │  ├─ layout/
│  │  │  ├─ _containers.scss
│  │  │  ├─ _grid.scss
│  │  │  └─ _row.scss
│  │  ├─ menu/
│  │  ├─ modal/
│  │  ├─ navbar/
│  │  └─ popover/
│  ├─ data/                         # 6
│  ├─ lib/                          # 7
│  ├─ pages/                        # 8
│  ├─ theme/                        # 9
│  │  ├─ abstracts/                 # 10
│  │  ├─ fonts/
│  │  ├─ utils/
│  │  ├─ _fonts.scss
│  │  ├─ _doc.scss
│  │  ├─ _fonts.scss
│  │  ├─ _reset.scss
│  │  ├─ _vars-dark.scss
│  │  ├─ _vars-light.scss
│  │  └─ _vars.scss
│  ├─ vendors/                      # 11
│  └─ main.scss                     # 12
├─ public/                          # 13
├─ scripts/                         # 14
├─ package.json                     # 15
└─ vite.config.js
                                    # 16
```

1. Документация проекта: общие темы – requirements, how-to, adr, TODO.md и т.п. Документация компонентов, страниц, базовых стилей записывается в README.md соответствующих папок.
2. Страница-пример со всеми компонентами (Vite).
3. Вместо папки `src` я использую `frontend`, чтобы, если нужно, можно было добавлять в проект код бэкенда, не смешивая его с UI в общем каталоге. Впрочем, если у вас такого конфликта нет, можете переименовать `frontend` в `src`, если так привычнее.
4. Разметка, стили, скрипты, изображения, тесты и Storybook-истории  компонентов.

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

5. «Шапка» может включать либо поле поиска с меню пользователя, либо горизонтальную панель основной навигации `.header-nav`, либо то и другое
6. Данные, передаваемые в интерфейс: содержание; надписи, ссылки и изображения в компонентах; фикстуры и т.п.
7. Утилиты, функции, типы, API-хелперы собственной разработки.
8. Разметка, стили, скрипты и изображения страниц. В NextJS-проектах и аналогах переименовать в `app` и следовать правилам фреймвормка для этой папки.
9. Базовые стили. Если хочется, можно, конечно, переименовать в `styles`. Но при feature-based подходе стили попадают также в папки `components` и `pages`/`app`, поэтому логичнее выбрать не обобщающее название.
10. Примеси, функции, пользовательские селекторы и медиазапросы.
11. Папка для библиотек, стилей, разметки и скриптов сторонних разработчиков.
12. Точка входа: собирает все стили.
13. Статические файлы: фавиконки, манифесты, robots.txt, sitemap.xml.
14. Папка для скриптов автоматизации: генераторов, линтеров, сборки, миграции, утилит, one-off задач.
15. package.json, кроме всего прочего, содержит настройки Eslint, Stylelint, Prettier, PostCSS.
16. В корне также находятся стандартные служебные файлы: CHANGELOG.md, CONTRIBUTING.md, LICENSE.

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
    font-size: var(--font-size-body-base);
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
