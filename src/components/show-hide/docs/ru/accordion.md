# «Раскрывашка»

## Разметка

```pug
details.accordion
  summary Heading

  div Lorem ipsum dolor sit amet consectetur adipisicing elit.

aside.sidebar
  h2 Title
  details.accordion
    summary
      | Heading
      small Subhead in filters

    div Lorem ipsum dolor sit amet consectetur adipisicing elit.
```

## Стили

Верхний и нижний край панели `summary` выравнивается по сетке. А сама надпись — по вертикальному центру панели, без привязки к сетке.

Высота панели `summary` настраивается переменной `--summary-padding-y`.
