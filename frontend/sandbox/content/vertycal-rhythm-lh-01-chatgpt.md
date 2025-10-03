# Вертикальный ритм

Система основанная на единице измерения `1rlh`. Она в отличие от ручной подгонки вертикальных padding'ов не pixel-perfect, зато элегантна.

- Создает не жесткий но мягкий вертикальный ритм – высота отступов и блоков кратна модулю сетки интерфейса (8px или другой), но базовые линии текстовых блоков с сеткой не совпадают,
- Держит единый «базовый шаг» = `1rlh` (высота базовой строки корневого элемента – `html`).
- Задаёт масштаб шрифтов через коэффициент `--scale`.
- Фиксирует высоту строк заголовков/текста кратно `1rlh` или множителю `1rlh`. Например, 24px и 8px.
- Даёт удобные переменные/утилиты для межблочных отступов.

## Базовые токены

```css
@layer base {
  :root {
    --font-size: 1rem; /* Размер шрифта `html` – 16px, меняем под проект */
    --line: 1.5; /* unitless → 1rem * 1.5 = 24px */

    /* Шаг вертикального ритма */
    --baseline: 1rlh; /*  = 24px при line=1.5 */

    /* Масштаб типографики (коэффициент) */
    --scale: 1.2; /* Major Third? поменяйте при желании */

    /* Шкала размеров */
    --font-size-base: var(--font-size); /* 1.000 × */
    --font-size-h3: calc(var(--font-size-base) * var(--scale)); /* 1.200 × */
    --font-size-h2: calc(var(--font-size-h3) * var(--scale)); /* 1.440 × */
    --font-size-title: calc(var(--font-size-h2) * var(--scale)); /* 1.728 × */
    --font-size--1: calc(var(--font-size-base) / var(--scale)); /* 0.833 × */

    line-height: var(--line);
  }
}
```

**Идея:** мы используем `1rlh` как единую меру ритма. Всё, что «между блоками», задаём в `rlh`, или множителе `rlh`: 24 и 8, например. Высоту строк каждого стиля фиксируем кратно `rlh` или множителю `rlh`, чтобы базовые линии сходились.

**Кстати.** Дробные font-size безопасны и даже полезны для аккуратного рендеринга. Подрежьте лишние хвосты числами через `unitPrecision` в `postcss-pxtorem` и `precision` в `postcss-calc`, а на проде — `cssnano`. Это даст аккуратный CSS без визуальных сюрпризов.

```json
"postcss-calc": {
  "precision": 4,              // ← ограничить точность
  "preserve": false            // можно сразу подставлять вычисленное значение
},
"postcss-pxtorem": {
  "rootValue": 16,
  "unitPrecision": 3,          // ← кол-во знаков после запятой
  "propList": ["*"]
}
```

```js
"cssnano": {
  "preset": "default"
}
```

## Базовые стили параграфов/списков

```css
@layer base {
  body {
    font-size: var(--font-size-base);
    /* высота строки основного текста = 1rlh → 24px по умолчанию */
    line-height: var(--baseline);
  }

  /* Межблочные интервалы — кратно 1rlh */
  p,
  ul, ol,
  blockquote, pre, table {
    margin-block: 0 var(--baseline);
  }

  /* Утилиты отступов */
  .mb-0    { margin-bottom: 0; }
  .mb-half { margin-bottom: calc(0.5 * var(--baseline)); }
  .mb-1    { margin-bottom: var(--baseline); }
  .mb-2    { margin-bottom: calc(2 * var(--baseline)); }
}
```

Здесь мы используем `line-height` как **значение с единицами** (а не unitless). Это гарантирует, что строка текста _физически_ кратна базовой сетке.

## Заголовки: размер + число «строк сетки»

**Приём:** для каждого заголовка задаём **размер шрифта** из шкалы и **высоту строки** как целое число `rlh` или значение, кратное множителю `rlh` (сколько базовых линий или строк сетки интерфейса занимает одна строка заголовка).

```css
@layer base {
  /* h1: крупный, на 3 корневые строки (3 × 24 = 72px на строку) */
  h1 {
    --rows: 3; /* кратность baseline */
    font-size: var(--font-size-title);
    line-height: calc(var(--rows) * var(--baseline));
    margin-block: 0 var(--baseline); /* межблочный шаг */
  }

  /* h2: 2 baseline-строки */
  h2 {
    --rows: 2;
    font-size: var(--font-size-h2);
    line-height: calc(var(--rows) * var(--baseline));
    margin-block: 0 var(--baseline);
  }

  /* h3: 2 baseline-строки (или 1, если компактнее) */
  h3 {
    --rows: 2;
    font-size: var(--font-size-h3);
    line-height: calc(var(--rows) * var(--baseline));
    margin-block: 0 var(--baseline);
  }
}
```

Если заголовок «дышит» слишком свободно — уменьшайте `--rows`; если «жмётся» — увеличивайте. Но поддерживайте кратность `rlh` или его множителю.

## Локальные блоки: используем `lh` внутри, `rlh` снаружи

Внутри «самодостаточного» блока (карточка, герой-секция) можно опираться на его собственный `lh` для **внутренних** отступов, сохранив `rlh` для внешних — так блок стыкуется с остальной страницей.

```css
@scope (.card) {
  :scope {
    /* Внутренность отмеряем в lh (высоте строки самой карточки) */
    padding-block: 1lh; /* ровно одна строка карточки сверху/снизу */

    /* Снаружи — шаг ритма страницы */
    margin-block: 0 var(--baseline);
  }

  header {
    margin-bottom: 0.5lh;
  }

  p {
    margin-bottom: 1lh;
  }
}
```

## Многострочные заголовки + `line-clamp`

Ограничьте высоту заголовка целым числом baseline-строк и включите обрезку:

```css
.card h3 {
  /* допустим, строка заголовка = 2 × 1rlh */
  --rows: 2;
  font-size: var(--font-size-h3);
  line-height: calc(var(--rows) * var(--baseline));

  /* максимум 2 строки: */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* ровно две строки */
  overflow: hidden;

  /* страховочный максимум по высоте — тоже кратно baseline */
  max-height: calc(2 * var(--rows) * var(--baseline));
}
```

## Адаптив: меняем только «базовую строку» и/или масштаб

**Самое приятное:** для перестройки ритма меняем лишь `--line` (`1rlh`) и/или `--scale`.

```css
@media (width >= 768px) {
  :root {
    --line: 1.625; /* базовая строка стала 26px → 1rlh = 26px */
    --scale: 1.25; /* шкала «круче» */
  }
}
```

Все отступы в `rlh` и высоты строк, кратные `rlh`, автоматически перестроятся.

## Замечания и подводные камни

- Для **`line-height`** можно использовать значения в `rlh` — например, `2rlh`. Но следите, чтобы высота строки не оставалась больше размера шрифта (иначе текст «зажмётся»). Если сомневаетесь — повышайте `--rows`.
- **`lh` vs `rlh`:** снаружи компонентов и для межблочных интервалов используйте `rlh`; внутри блока — `lh` (локальный масштаб).
- **Глобальная базовая линия** определяется только `line-height` в `html`. Меняя её, вы «двигаете» весь ритм.
- **Fallback** для полной поддержки браузерами.

  ```css
  @supports not (margin-block: 1rlh) {
    :root {
      --baseline: 24px;
    }
  }
  ```

Такой подход избавляет от ручной «подгонки» `padding-top/bottom` под сетку: вы просто выражаете все вертикальные величины **в целых долях `1rlh`** (глобально) и/или **в `lh`** (локально). Масштаб шрифта управляется одной переменной `--scale`, а «шаг сетки» — `--line`/`1rlh`.

## Высота строки в rlh

```css
/* -------------------------------------------------------------------------- */
/* #region: ROOT RHYTHM TOKENS                                                */
/* -------------------------------------------------------------------------- */

:root {
  /* Base rhythm; 1rlh = 24px */
  font-size: 16px;
  line-height: 24px;

  /* Unitless scale (num = numeric values for calculations) */
  --num-0p5: 4;
  --num-1:   8;
  --num-1p5: 12;
  --num-2:   16;
  --num-2p5: 20;
  --num-3:   24;
  --num-4:   32;
  --num-5:   40;
  --num-6:   48;
  --num-7:   56;
  --num-8:   64;

  /* Rhythm reference */
  --lh: var(--num-3);

  /* Sizing tokens (dim = dimension; pxtorem will convert these). It's it's more
     convenient than DRY with the advanced-variables plugin or
     calc(var(--num-1) * var(--px2rem)); */
  --dim-0p5: 4px;
  --dim-1:   8px;
  --dim-1p5: 12px;
  --dim-2:   16px;
  --dim-2p5: 20px;
  --dim-3:   24px;
  --dim-4:   32px;
  --dim-5:   40px;
  --dim-6:   48px;
  --dim-7:   56px;
  --dim-8:   64px;

  /* Typography scale */
  --scale: 1.2;
  --font-size-base: 17px; /* pxtorem will convert it */

  /* Fixed caption */
  --font-size-fine-print: 12px;
  --line-height-fine-print: calc(var(--num-2) / var(--lh) * 1rlh);

  /* Scale-based sizes */
  --font-size-body-sm: calc(var(--font-size-base) / var(--scale)); /* ~14px */
  --line-height-body-sm: calc(var(--num-2p5) / var(--lh) * 1rlh);

  --font-size-h3: calc(var(--font-size-base) * var(--scale)); /* ~20.4px */
  --line-height-h3: calc(var(--num-3) / var(--lh) * 1rlh);

  --font-size-h2: calc(var(--font-size-h3) * var(--scale)); /* ~24.5px */
  --line-height-h2: calc(var(--num-4) / var(--lh) * 1rlh);

  --font-size-title: calc(var(--font-size-h2) * var(--scale)); /* ~29.4px */
  --line-height-title: calc(var(--num-4) / var(--lh) * 1rlh);

  --font-size-hero: calc(var(--font-size-title) * var(--scale)); /* ~35.3px */
  --line-height-hero: calc(var(--num-6) / var(--lh) * 1rlh);

  /* Fallback for browsers without rlh support */
  @supports not (line-height: 1rlh) {
    --line-height-fine-print: calc(var(--num-2) / var(--lh));
    --line-height-body-sm: calc(var(--num-2p5) / var(--lh));
    --line-height-h3: calc(var(--num-3) / var(--lh));
    --line-height-h2: calc(var(--num-4) / var(--lh));
    --line-height-title: calc(var(--num-4) / var(--lh));
    --line-height-hero: calc(var(--num-6) / var(--lh));
  }

  @media (width >= 768px) {
    --scale: 1.414; /* augmented fourth, 1:√2 */
    --num-5: 40;

    --font-size-h3: calc(var(--font-size-base) * var(--scale));
    --line-height-h3: calc(var(--num-5) / var(--lh) * 1rlh);

    @supports not (line-height: 1rlh) {
      --line-height-h3: calc(var(--num-5) / var(--lh));
    }
  }
}

/* #endregion */
```

## Шаблон под 8-пиксельную сетку

☝️🧐 TODO: Заменить модульную шкалу и line-height решением из предыдущего раздела.

```css
/* -------------------------------------------------------------------------- */
/* #region: ROOT RHYTHM TOKENS                                                */
/* -------------------------------------------------------------------------- */

:root {
  /* База: 17/24 — фиксируем 1rlh = 24px */
  font-size: 17px;
  line-height: 24px;

  /* Ритм */
  --lh: 1rlh; /* 24px */

  /* Универсальные значения для отступов и размеров небольших элементов */
  --dim-0p5: calc(var(--lh) / 6);      /* 4px — для мелких отступов и высоты строки мелких надписей  */
  --dim-1: calc(var(--lh) / 3);         /* 8px — единица сетки интерфейса */
  --dim-1p5: calc(var(--dim-1) * 1.5); /* 12px — сетка интерфейса */
  --dim-2: calc(var(--dim-1) * 2);     /* 16px */
  --dim-2p5: calc(var(--dim-1) * 2.5); /* 20px */
  --dim-3: calc(var(--dim-1) * 3);     /* 24px = --lh */
  --dim-4: calc(var(--dim-1) * 4);     /* 32px */
  --dim-5: calc(var(--dim-1) * 5);     /* 40px */
  --dim-6: calc(var(--dim-1) * 6);     /* 48px */
  --dim-7: calc(var(--dim-1) * 7);     /* 56px */
  --dim-8: calc(var(--dim-1) * 7);     /* 64px */


  /* Шкала размеров */
  --scale: 1.2; /* малая терция, 5:6 */
  --font-size-base: 1rem; /* 17px */

  --font-size-fine-print: 12px; /* При необходимости сглаживаем шкалу */
  --line-height-fine-print: var(--dim-2);

  --font-size-body-sm: calc(var(--font-size-base) / var(--scale)); /* ~14px */
  --line-height-body-sm: var(--dim-2p5);

  --font-size-h3: calc(var(--font-size-base) * var(--scale)); /* ~20.4px */
  --line-height-h3: var(--lh);

  --font-size-h2: calc(var(--font-size-h3) * var(--scale)); /* ~24.5px */
  --line-height-h2: var(--dim-4);

  --font-size-title: calc(var(--font-size-h2) * var(--scale)); /* ~29.4px */
  --line-height-title: var(--dim-4);

  --font-size-hero: calc(var(--font-size-title) * var(--scale)); /* ~35.3px */
  --line-height-hero: var(--dim-6);

  @media (width >= 768px) {
    --scale: 1.414; /* 1:√2, увеличенная четверть */
  }
}

/* -------------------------------------------------------------------------- */
/* #region: BODY & PARAGRAPHS                                                 */
/* -------------------------------------------------------------------------- */

body {
  font-size: var(--font-size-base); /* 17px */
  line-height: var(--lh); /* 24px */
  color: var(--color-text, #111);
}

/* Межблочные интервалы — 1 строка */
p, ul, ol, blockquote, pre, table {
  margin-block: 0 var(--lh); /* отступ снизу – 24px */
}

/* Утилиты ритма */
.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: var(--dim-1); } /* 8px */
.mb-2 { margin-bottom: var(--dim-2); } /* 16px */
.mb-3 { margin-bottom: var(--lh); } /* 24px */
.mb-4 { margin-bottom: var(--dim-4); } /* 32px */

/* -------------------------------------------------------------------------- */
/* #region: HEADINGS (line-height кратна 8px)                                 */
/* -------------------------------------------------------------------------- */

/* Подход: размер шрифта — из шкалы; высота строки — целое число × 8px.*/

.hero-title {
  font-size: var(--font-size-hero);
  line-height: var(--line-height-hero);
  margin-top: var(--margin-top-hero, 0);
  margin-bottom: var(--margin-bottom-hero, var(--dim-2));
}

h1, .h1 {
  font-size: var(--font-size-title);
  line-height: var(--line-height-title);
  margin-top: var(--margin-top-title, 0);
  margin-bottom: var(--margin-bottom-title, var(--dim-2));
}

h2, .h2 {
  font-size: var(--font-size-h2);
  line-height: var(--line-height-h2);
  margin-top: var(--margin-top-h2, calc(var(--lh) * 2));
  margin-bottom: var(--margin-bottom-h2, 0);
}

h3, .h3 {
  font-size: var(--font-size-h3);
  line-height: var(--line-height-h3);
  margin-top: var(--margin-top-h3, calc(var(--lh) * 2));
  margin-bottom: var(--margin-bottom-h3, 0);
}

h4, .h4,
h5, h6 {
  font-size: var(--font-size-base);
  line-height: var(--lh);
  margin-top: var(--margin-top-h3, calc(var(--lh) * 2));
  margin-bottom: var(--margin-bottom-h3, 0);
}

/* -------------------------------------------------------------------------- */
/* #region: SMALL TYPE (кратность 4px)                                         */
/* -------------------------------------------------------------------------- */

.text-sm {
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-body-sm);
  margin-top: var(--margin-top-body-sm, 0);
  margin-bottom: var(--margin-bottom-body-sm, 0);
}

small, .text-xs {
  font-size: var(--font-size-fine-print);
  line-height: var(--line-height-fine-print);
  margin-top: var(--margin-top-fine-print, 0);
  margin-bottom: var(--margin-bottom-fine-print, 0);
}

/* -------------------------------------------------------------------------- */
/* #region: EXAMPLES                                                          */
/* -------------------------------------------------------------------------- */

/* Двухстрочный заголовок в карточке: чётко по ритму, clamp на 2 строки */
.card h3 {
  /* h3 уже имеет line-height = 24px (3×8) выше */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  /* страховка по высоте: 2 строки × 24px = 48px (кратно 8px) */
  max-height: calc(2 * 3 * var(--dim-1));
}

.card {
  padding: var(--lh);
  margin-block: 0 var(--lh);
}
```

```css
:root {
  --px2rem:  0.0625rem; /* 1/16 */

  --num-0p5: 4;
  --num-1:   8;
  --num-1p5: 12;
  --num-2:   16;
  --num-2p5: 20;
  --num-3:   24;
  --num-4:   32;
  --num-5:   40;
  --num-6:   48;
  --num-7:   56;
  --num-8:   64;

  --dim-0p5: calc(--dim-0p5 * var(--px2rem));
  --dim-1:   calc(--dim-1   * var(--px2rem));
  --dim-1p5: calc(--dim-1p5 * var(--px2rem));
  --dim-2:   calc(--dim-2   * var(--px2rem));
  --dim-2p5: calc(--dim-2p5 * var(--px2rem));
  --dim-3:   calc(--dim-3   * var(--px2rem));
  --dim-4:   calc(--dim-4   * var(--px2rem));
  --dim-5:   calc(--dim-5   * var(--px2rem));
  --dim-6:   calc(--dim-6   * var(--px2rem));
  --dim-7:   calc(--dim-7   * var(--px2rem));
  --dim-8:   calc(--dim-8   * var(--px2rem));
}
```
