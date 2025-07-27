# Всплывающие панели

## Разметка

```pug
//- Menu (dropdown)
details.popover(data-role='popover')
  summary

  ul.popover__body.menu
    li: a.menu__link(href='') Menu Item
    li: a.menu__link(href='') Menu Item
    li: a.menu__link(href='') Menu Item

//- Tiny form
details.popover(data-role='popover')
  summary Toggle

  div.popover__body
    p
      label(for='popover-title') Event Title
      input#popover-title(name='title' type='text')
    p
      label(for='popover-files') Attaching files…
      input#popover-files(type='file' multiple)
    footer.buttons
      button(type='reset') Cancel
      button(type='button') Delete
      button(type='button') OK

//- Hint
details.popover(data-role='popover')
  summary Toggle

  div.popover__body
    h3 Lorem ipsum dolor sit amet
    p Consectetur adipisicing elit. Beatae reiciendis atque nobis, non laboriosam labore sapiente cumque architecto itaque, sunt cum, in fugit voluptas doloremque sint explicabo vero similique incidunt.
```

Для тех панелей, которые предполагают менять поведение в зависимости от экрана, предусмотрена разметка другими тегами. В скрипте `popover.js` есть соответствующая логика.

```pug
.popover([data-role='popover'])
  h3(data-role='popover-summary') Еще
  .popover__body.
    Содержание
```

## Доступность

У большинства семантических HTML-тегов есть встроенные роли по умолчанию. В том числе у пары, используемой для «раскрывашек».

- `details` выполняет роль `group`.
- `summary` — `button`.

Дополнительные `aria`-атрибуты — включая `aria-hidden` — не нужны. Хотя Github использует в своих выпадающих меню `summary(aria-haspopup='menu')`.

Для разметки `div'ами` и пр. скрипт добавляет нужные атрибуты и меняет их значение.
