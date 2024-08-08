# Поле числового ввода — stepper

## Разметка

```pug
.stepper
  //-  Minus button
  button.stepper__button.is-decrement.button(type='button') –
  //- Input
  input.stepper__value(type='number' min='1' max='100' step='1' value='1' readonly)
  //-  Plus button
  button.stepper__button.is-increment.button(type='button') +
```
