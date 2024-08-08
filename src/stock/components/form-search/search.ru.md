# Форма поиска

## Разметка

```pug
form(action='/search' role='search')
  label.visually-hidden(for='search-input') Search articles
  input#search-input(name='q' type='search' autocomplete='off' placeholder='Search…')
  button(type='submit' aria-label='Submit search')
```

`type="search"` нужно тестировать на разных устройствах. На планшетах и телефонах, как минимум, Safari переорпеделяет пользовательские стили и поэтому некоторые сайты — сами же apple.com, например — избегают этого значения.

```scss
input[type=search] {
  // Браузеры переопределяют следующие свойства
  background: red; // background-color: white;
  border: 5px solid black;  // border: 2px inset;
  font-family: Georgia; // -webkit-small-control;
  line-height: 48px; // игнорируется
  padding: 30px; // padding: 1px;
  height: 48px; // игнорируется

  // Следующие стили применимы
  color: red;
  cursor: pointer;
  display: block;
  letter-spacing: 4px;
  text-align: right;
  text-shadow: 0 0 2px black;
  word-spacing: 20px;
  width: 100%;
}
```

А normalize.css предлагает сохранить `type=search`, но в стилях использовать `-webkit-appearance: textfield;`.


