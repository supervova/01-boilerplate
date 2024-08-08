# Плавающие label'ы

Подписи к полям ввода в стиле в Material Design. В исходном положении занимают место «заглушек» (placeholder'ов), а когда поле заполняется, поднимаются на строку выше.

## Разметка для решения на «голом» CSS

```pug
p.input
  //-
    Input needs to have a placeholder in order to use :placeholder-shown pseudo class in Safari.
    We then hide it using CSS.

  label(for='input-name') Name
  input#input-name(autocomplete='off' type='text' placeholder='Name')
  button.btn.is-icon(aria-label='Clear input')
    svg()

p.input
  label(for='input-email') Email
  input#input-email(autocomplete='off' type='email' placeholder='Email')
  button.btn.is-icon(aria-label='Clear input')
    svg()
```

## Разметка для решения на CSS + JS
