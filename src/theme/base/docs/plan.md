# Cайт _Project

## Структура проекта

```txt
dist/
docs/
public/
  manifest.json
src/
  assets/
    css/
    fonts/
    img/
    scss/
      abstracts/
      form/
      pages/
      _avatar.scss
      # etc
      main.scss

  templates/
    base/
      base.twig
      body-suffix.twig
      macros.twig
    components/
      header.twig
      # etc
    index.twig

gulpfile.js
package.json
```

## План разметки первой страницы

```pug
header.e-header
  nav.e-navbar
  form(role="search")
main.e-main

  header.e-hero
    .e-container

  //- ETC

  aside.e-cta
    h2.e-cta__title
    .e-cta__desc
    a.e-cta__link
footer.e-footer
  .e-footer__copyright
    ul.e-footer__links
      li
        a(href='#') Контакты
      //- еtс

  details.e-popover.e-footer__languages
    summary Русский
    ul.e-popover__body
      li
        a(href='#') English
      //- еtс
```
