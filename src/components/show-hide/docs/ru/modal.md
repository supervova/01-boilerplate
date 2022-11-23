# Модальное окно и элемент `dialog`

HTML-элемент `dialog` — технология, которая может быть использована не только для модальных окон, но и для выдвижных панелей и «тостов». Поддерживается [более, чем 90% браузеров](https://caniuse.com/?search=dialog).

## Разметка

```pug
//- Простой открытый диалог
dialog(open) This is an open dialog window

//- Модальное окно с развитой структурой и кнопка,
    его открывающая
button(type='button' data-action='open modal' data-target='my-dialog' aria-haspopup='true').
  Open the dialog window

dialog#my-dialog
  section
    header
      h2 Hello! I'm a modal dialog...
    div
      p
        label(for='form-my-input') Label
        input#form-my-input(name='name' type='text' autofocus placeholder='Label')
      p Lorem ipsum dolor sit amet consectetur adipisicing elit.
  footer.buttons
    button(type='reset' data-action='close') Cancel
    button(type='submit') Submit

//- Немодальное окно. Для его закрытия используется кнопка ❌, а не "Cancel".
dialog#my-dialog
  section
    header
      h2 Hello! I'm nonmodal dialog
      button(type='button' data-action='close' aria-label='Закрыть')
        svg.icon(aria-hidden='true' focusable='false')
          use(href='/path/to/theme/base/graphics/sprite.svg#icon-x-mark')
    div
      p Lorem ipsum dolor sit amet consectetur adipisicing elit.
```

## Методы

Элемент имеет встроенные методы.

- `show`. Открыть абсолютно позиционированный немодальный диалог. Метод подходит для панелей и «тостов».
- `showModal`. Открыть модальный диалог в фиксированной позиции. Метод подходит для модальных окон.
- `close`. Закрыть диалог.

```javascript
const dialog = document.querySelector('dialog');

dialog.show();
dialog.showModal();
dialog.close();
```

Элемент закрывается также при нажатии клавиши Esc — и не нужно устанавливать обработчик события `keypress`.

## Затемнение

Элемент `dialog` содрежит псевдодемент `backdrop` — затемнение. Цвет затемнения можно менять.

```css
dialog::backdrop {
  background: hsl(240 100% 90% / .64);
}
```

## Множество открытых окон

Диалогов, в том числе открытых, на странице может быть несколько. Они занимают слои интерфейса, согласно положению в коде или значению `z-index`. Если верхнее окно являятся модальным, остальные под ним остаются заблокированными, как и остальные элементы интерфейса.

## Автофокус

При открытии элемента `dialog` браузер передаёт фокус первому интерактивному элементу окна. При закрытии — возвращает «открывашке».

Если нужно установить фокус не на первый интерактивный элемент в `dialog`'е, можно использовать атрибут `autofocus`. Однако на странице не может быть больше одного элемента с `autofocus`'ом.

```html
<button type="submit" autofocus>Submit</button>
```

## Скрипты

```javascript
const toggler = document.querySelectorAll('[data-toggle-modal]');
const closers = document.querySelectorAll('[data-close]');

if (toggler) {
  toggler.forEach((element) => {
    const target = element.getAttribute('data-toggle-modal');
    const targets = document.querySelectorAll(target);

    element.addEventListener('click', () => {
      targets.forEach((e) => {
        e.showModal();
      });
    });
  });

  closers.forEach((element) => {
    element.addEventListener('click', () => {
      const dialog = element.closest('dialog');
      dialog.close();
    });
  });
}
```

```js
// Scott O'Hara
```

### Доступность, aria-атрибуты

`dialog` нуждается только в двух `aria`-атрибутах:

- `aria-labelledby` или `aria-label`
- `aria-modal='true'` — указывает на то, что взаимодействие с интерфейсом под активным окном невозможно. Значение не зависит от того, открыто окно или нет.

⚠️ `dialog`'у не следует назначать атрибут `tabindex`.

```pug
dialog#dialog-sample(aria-labelledby='dialog-sample-title' aria-modal='true')
  h2#dialog-sample-title.dialog-title
    Съешь же ещё этих мягких французских булок да выпей чаю

  p Lorem ipsum dolor sit amet consectetur adipisicing elit.
```

## Интеграция с формой

[Согласно MDN](https://developer.mozilla.org/ru/docs/Web/HTML/Element/dialog), форму можно интегрировать с диалогом с помощью `method="dialog"`. После отправки такой формы, диалог закрывается. Но [в спецификации формы](https://html.spec.whatwg.org/multipage/forms.html#the-form-element) метода `dialog` нет. Соответственно, валидатор W3C ругается на его использование.

```pug
dialog
  form(method='dialog')
    label(for='favAnimal') Favorite animal:
    select#favAnimal
      option Brine shrimp
      option Red panda
      option Spider monkey
    footer.buttons
      button#cancel(type='reset') Cancel
      button(type='submit') Confirm
```

- [Having an open dialog](https://www.scottohara.me/blog/2019/03/05/open-dialog.html)
- [How to Implement and Style the Dialog Element](https://tympanus.net/codrops/2021/10/06/how-to-implement-and-style-the-dialog-element/)
- [Пример из 'HTML can do that?'](https://codepen.io/ananyaneogi/pen/QXMdbb)

