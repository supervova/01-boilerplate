# Примиси и переменные

## Медиазапрос для портретных планшетов

Высота экрана [некоторых телефонов](https://gs.statcounter.com/screen-resolution-stats/mobile/worldwide/#monthly-202106-202206-bar) превышает 768px — ширину экрана iPad'а: 780×360, 800×360, 812×375, 844×390, 851×393, 869×412, 873×393, 892×412, 896×414, 915×412.

Поэтому на таких телефонах в альбомной ориентации к сайтам будут применяться стили записанные в стандартном, основанном на `min-width` планшетном медиазапросе.

Чтобы этого избежать, мы добавили в планшетный медиазапрос дополнительное условие.

```css
@custom-media --tablet
  screen and (min-width: 768px),
  (not (pointer: coarse) and (orientation: landscape));
```

## Light theme

Light theme (default) can be forced with the `data-theme="light"` attributes and the `[data-theme='dark']` selectors.

### Dark theme

```scss
@mixin dark-theme {
  color-scheme: dark;

  // The saturation and lightness reduced a relative 20%.
  --s: 64%;

  --color-brand-default: hsl(var(--h), var(--s), 44%);

  --color-background-base: hsl(var(--h) 10% 10%);
  --color-background-2ry: hsl(var(--h) 10% 15%);
  --color-background-z3: hsl(var(--h) 5%  20%);
  --color-background-z5: hsl(var(--h) 5% 25%);

  --color-ink-text: hsl(var(--h) 15% 85%);
  --color-ink-2ry: hsl(var(--h) 5% 65%);

  --color-ink-shadow: var(--h) 50% 3%;

  // Etc
}
```

#### Уровень настроек системы (автоматический режим)

```scss
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    @include dark-theme;
  }
}
```

#### Уровень сайта/приложения

Включается в пользовательском атрибуте `data-theme`.

```scss

[data-theme='light'],
:root:not([data-theme='dark']) {/* светлая тема */}

[data-theme='dark'] {
  @include dark-theme;
}
```

Допускаются и вложенные темы.

```pug
html(data-theme='light')
  section(data-theme='dark')
    .component(data-theme='light')
```
