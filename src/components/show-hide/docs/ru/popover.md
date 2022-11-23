# Всплывающие панели

Скрытые и показываемые по клику пользователя немодальные панели. Которые могут содержать поля ввода, кнопки, короткий текст или меню.

Закрываются по клику за пределами панели или по нажатию <kbd>Esc</kbd>.

## Разметка

```pug
//- Menu (dropdown)
details.popover
  summary(aria-haspopup='dialog' role='button') Toggle

  div(role='dialog')
    ul(role='menu')
      li(role='none')
        a(role='menuitem' href='') Menu Item
      li(role='none')
        a(role='menuitem' href='') Menu Item
      li(role='none')
        a(role='menuitem' href='') Menu Item
      li(role='none')

//- Tiny form
details.popover
  summary(aria-haspopup='dialog' role='button') Toggle

  div(role='dialog')
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
details.popover
  summary(aria-haspopup='dialog' role='button') Toggle

  div(role='dialog')
    h3 Lorem ipsum dolor sit amet
    p Consectetur adipisicing elit. Beatae reiciendis atque nobis, non laboriosam labore sapiente cumque architecto itaque, sunt cum, in fugit voluptas doloremque sint explicabo vero similique incidunt.
```
