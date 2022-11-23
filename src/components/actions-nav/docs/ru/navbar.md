# Основная навигация

## Разметка

```pug
nav.navbar(aria-label='Main')
  ul#main-menu(role='menubar')
    li(role='none')
      a(href='/Lorem' role='menuitem') Menu item
    li(role='none')
      details.popover
        summary(aria-haspopup='menu' role='button') Menu item has submenu

        //- Popover menu
        div(role='dialog')
          ul(role='menu')
            li(role='none')
              a(role='menuitem' href='') Submenu Item
            li(role='none')
              a(role='menuitem' href='') Submenu Item
            li(role='none')
              a(role='menuitem' href='') Submenu Item
            li(role='none')
```
