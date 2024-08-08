# Вкладки

## Разметка (W3C)

```pug
//- Контейнер не имеет никаких ARIA-атрибутов
section.tabs

  //- Заголовок виджета имеет ID, чтобы на него мог ссылаться .tabs__nav
  h2#section-services-title Danish Composers

  //- .tabs__nav: role='tablist' + aria-labelledby / или  aria-label, если заголовок всей группы неуместен
  .tabs__nav(role='tablist' aria-labelledby='section-services-title')

    //- Вкладка: role='tab', aria-selected, aria-controls, id — для именования панели
    button#tab-1(type='button' role='tab' aria-selected='true' aria-controls='tabpanel-1')
      span.focus Maria Ahlefeldt
    button#tab-2(type='button' role='tab' aria-selected='false' aria-controls='tabpanel-2' tabindex='-1')
      span.focus Carl Andersen

  //- Панель: id, role='tabpanel', tabindex='0', aria-labelledby
  #tabpanel-1(role='tabpanel' tabindex='0' aria-labelledby='tab-1').
    Lorem ipsum dolor sit.

  #tabpanel-2.is-hidden(role='tabpanel' tabindex='0' aria-labelledby='tab-2').
    Lorem ipsum dolor sit.
```
