# Карусель

## Простой вариант на чистом JS — три карточки в окне просмотра

[Simple Carousel with Vanilla JS](https://medium.com/@magyarn/simple-carousel-with-vanilla-js-3dd10a143ff2)

## CSS-only варианты

- [CodePen: Christian Schaefer](https://codepen.io/Schepp/pen/WNbQByE)
- [CSS Tricks #1](https://css-tricks.com/css-only-carousel/)
- [CSS Tricks How to](https://css-tricks.com/how-to-make-a-css-only-carousel/)

```pug
section.carousel(aria-label='Gallery')
  ul.carousel__viewport
    li#carousel__slide1.carousel__slide(tabindex='0')
      .carousel__slide Content
      a.carousel__next(href='#carousel__slide2') Next
    li#carousel__slide2.carousel__slide(tabindex='0')
      .carousel__slide Content
      a.carousel__prev(href='#carousel__slide1') Previous
  aside.carousel__navigation
    ul.carousel__navigation-list
      li.carousel__navigation-item
        a.carousel__navigation-button(href='#carousel__slide1') Go to slide 1
      li.carousel__navigation-item
        a.carousel__navigation-button(href='#carousel__slide2') Go to slide 2

```

## Простейший цикличный вариант — \_trivision.scss

Если в проекте используется сложная карусель, нет смысла добавлять этот вариант. Но эта примесь станет хорошей альтернативой для простых проектов.

1. Set a `position: relative` for the parent element. It is optional to use
   the `trivision` class.
2. Then use mixins to create the required styles for children. Examples:

```scss
@media (--phone) {
  .page.is-home .has-kpi .row {
    position: relative;
  }
  .page.is-home .has-kpi {
    @include trivision-slides(4, '.col-md-3');
  }
}
```
