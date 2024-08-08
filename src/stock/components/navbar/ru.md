# Основная навигация: `.navbar` и `.header__navbar`

Список ссылок на разделы верхнего и, возможно, второго уровня. В зависимости от макетов может быть двух типов. На телефонах `.navbar` и `.header__navbar` не отличаются — в обоих случаях оформляются, как нижняя навигационная панель. Различия появляются на планшетах и ПК.

## Горизонтальный список `.header__navbar`

Остается на оси X и на больших экранах. Визуально — в «шапке» сайта, согласно разметке.

### Разметка

```pug
header.header
  //- .container is optional @include container
    can be applied to .header
  .container
    .logo
    nav.header__navbar(aria-label='Main')
      ul.menu
        //- .header__navbar .menu__link
        li: a.menu__link(href='/services')
          .label Services
        li: a.menu__link(href='/about')
          .label About

        li.header__submenu
          details.popover(data-role='popover')
            summary.menu__link
              .label More
              //- Chevron
              svg.icon
            ul.popover__body.menu
              //- .header__submenu .menu__link
              li: a.menu__link(href='/about/overview')
                .label Overview
              li: a.menu__link(href='/about/history')
                .label History
              li: a.menu__link(href='/about/team')
                .label Team

         li: a.menu__link(href='/blog')
          .label Blog
         li: a.menu__link(href='/search')
            svg.icon
            span.visually-hidden Search
         li: a.menu__link.is-account(href='/search')
            span.avatar
              img(src='/images/path/to/avatars/user-name.jpg' width='32' height='32' alt aria-hidden='true')
            span.visually-hidden Username's Account
```

## Вертикальная панель `.navbar`

На планшетах выносится в узкую боковую колонку «рельсу». На ПК развертывается до ширины 240-320px.

### Разметка

```pug
nav.navbar(aria-label='Main')
  .navbar__logo

  ul.navbar__menu.menu
    li: a.menu__link(href='#')
      svg.icon
      .label Home
    li: a.menu__link(href='#')
      svg.icon
      .label 2nd Item
    li: a.menu__link(href='#')
      svg.icon
      .label 3d Item

    //- Сделать разметку .is-more, добавление в него
      элементов скриптом. Но с Progressive enhancement

      .navbar__item:nth-child(n+5)
      Начиная с пятого
      .navbar__item:nth-child(n+6)
    li.navbar__submenu.is-more
      details.popover(data-role='popover')
        summary.menu__link
          .label More
          svg.icon

        ul.popover__body.menu
          li: a.menu__link(href='#')
            .label Overflow Menu Item
          li: a.menu__link(href='#')
            .label Overflow Menu Item
          li: a.menu__link(href='#')
            .label Overflow Menu Item
```
