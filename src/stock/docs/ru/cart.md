# Корзина

## Разметка

Корзина, совмещенная с формой заказа

```pug
.cart
  ul.cart__items
    li.cart__item
      .cart__image
      .cart__hgroup
        a(href='#modal-product-slug' data-dismiss='modal' data-toggle='modal')
          h3.cart__title
            //- Price
            small
        .cart__actions
          .cart__stepper.stepper
          a.cart__remove(href='javascript:void(0)' role='button') удалить

  form.order(action='/')
    fieldset
      legend.sr-only Контактная информация

      .input
        label(for='order-full-name') * Ваше имя и фамилия:
        input#order-full-name.input__control(name='name' type='text' required)

      .input
        label(for='order-email') * Ваш email:
        input#order-email.input__control(name='email' inputmode='email' type='email' required)

      .input
        label(for='order-phone') * Ваш телефон:
        input#order-phone.input__control(name='phone' type='tel' inputmode='tel' required placeholder='Например, +7 (916) 123-45-67')

      .input
        label(for='order-address') * Ваш адрес:
        input#order-address.input__control(name='address' type='text' required placeholder='Например, Москва, пр-т Вернадского 26 кв. 404')

      .input
        label(for='order-order-comment') Комментарий к заказу:
        textarea#order-order-comment.input__control(name='comment')

      label.input.has-option
        input.input__option(name='personal-data' type='checkbox')
        | Я согласен на обработку персональных данных

    fieldset
      legend Доставка

      .input__options
        label.input.has-option
          input.input__option(name='delivery' type='radio' value='Самовызов' checked)
          | Самовызов: Москва,  Адмирала Корнилова, вл. 5 (только будни)

        label.input.has-option
          input.input__option(name='delivery' type='radio' value='постамат')
          | Доставка по Москве через постаматы — ориентировочно 300 ₽

        label.input.has-option
          input.input__option(name='delivery' type='radio' value='Москва')
          | Москва в пределах МКАД — 300 ₽

        label.input.has-option
          input.input__option(name='delivery' type='radio' value='Новая Москва')
          | Москва за МКАД — 400 ₽

        label.input.has-option
          input.input__option(name='delivery' type='radio' value='А107')
          | МО, в пределах А107 — 450 ₽

        label.input.has-option
          input.input__option(name='delivery' type='radio' value='А108')
          | МО, в пределах А108 — 550 ₽

        label.input.has-option
          input.input__option(name='delivery' type='radio' value='А108')
          | Другие города — 550 ₽ (уточняйте стоимость при подтверждении заказа)
```
