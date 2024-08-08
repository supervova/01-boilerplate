# Фрагменты

Краткое содержание материала — статьи, поста, вакансии, резюме. Выводятся в ленте материалов или в поисковой выдаче `snippets`.

Альтернативой является портретная карточка.

## Разметка

```pug
.snippet
  figure.snippet__img
    img(src='' alt='')
  .snippet__copy
    h2.snippet__title Sandy Sandwiches
    p.snippet__lead Lorem ipsum dolor sit amet, consectetur adipisicing elit.
```

## Списки `snippets`

Списки карточек могут размечаться, как списки `ul` или `ol`, а также, как `div(role="group")`, если сами карточки размечаются, как `article`.

```pug
ul.snippets

  li.snippet
    img(src='', width='', alt='')
    .snippet__copy
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

  li.snippet
    img(src='', width='', alt='')
    .snippet__copy
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

.snippets.is-grid(role='group')

  article.snippet
    img(src='', width='', alt='')
    .snippet__copy
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.

  article.snippet
    img(src='', width='', alt='')
    .snippet__copy
      h2 List-based media object
      p Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
```

