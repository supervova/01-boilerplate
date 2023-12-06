# Шаблон разметки

## Общие принципы

Стремимся к тому, чтобы все макеты укладывались в одну схему: `header + main>.content + footer`. И ни «шапка», ни «подвал», ни область основного содержания не менялись в зависимости от раздела. Никакой дополнительной разметки, никаких специальных классов (за исключением классов `body`).

Для растягивания разделов страницы на всю ширину экрана — внутри ограниченного по ширине `main` — используем технику `margin-left` + `translate`. См. /components/blocks/section.scss:.is-full-bleed.

Для растягивания разделов страницы до средней ширины используем технику отрицательных боковых `margin`, в том числе — с процентными значениями.

## Семантические теги предпочтительней aria-атрибутов

Стараться использовать семантические теги — `nav`, `footer` etc. — а не атрибуты `role`. В частности, не нужны атрибуты [`role='menubar|menu|menuitem'`](https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html){:target="_blank"} — ни для `nav`,ни для вложенных `ul`, `li` и `a`.

### Шпаргалка для тех случаев, когда aria-разметка всё-таки необходима

- role='alert'
- role='region' для раздела, размеченного `div`'ом, а не `section`
- role='listbox' / role='option' — для структур, содержащих скрытые
  элементы: каруселей, выпадающих меню, имитирующих `select`

  ```pug
  ul.filter(role='listbox')
    li.filter_item
      a.filter_option(href='?s=feat', role='option', tabindex='-1', aria-selected='true')
      | Featured
  ```
- `role='none'` или `role='presentation'` — для дочерних элементов, не выполняющих функциональную роль. Например, `ul[role='menu']>li[role='none']>a[role='list-item']`
- `role='combobox'` + `aria-autocomplete='list|both'` + `aria-owns='list-id'` + `aria-expanded='false'` - для комбобоксов
- `role='button'` для a-элементов, выполняющих функции кнопок
- `role='navigation|menu'` и `role='menuitem'`, если используется `ul`, не вложенный в `nav`. Роль меню или навигации назначается родительскому элементу — например, `ul`. А роль `menuitem` — интерактивным элементам меню: li (если обрабатываются клики на них), `a` или `button`.
- `role='tree'`, `role='group'` и `role='treeitem'` — для древовидной навигации, аккордеонов.

Интерактивные элементы — модальные / диалоговые окна, выпадающие меню, всплывающие подсказки (tooltip'ы) помечаются aria-атрибутами для того, чтобы их понимали пользователи экранных считывающих устройств.

### Самые популярные aria-атрибуты

- `aria-hidden='true'`. Помечаются иконки, др. декоративные графические элементы, лишние надписи (например, адаптивные варианты).
- `aria-label` и `aria-labelledby`. Помечаются «обёртки» виджетов
- `aria-controls`. Помечаются кнопки управления виджетом. В значении указывается ID виджета: `button(aria-controls='my-dropdown')` … `nav#my-dropdown`
- `aria-haspopup`. Помечаются кнопки управления выпадающими меню и панелями (диалоговые окна к этой категории не относятся): `button(aria-haspopup='true', aria-controls='my-dropdown')`
- `aria-expanded`. Помечаются кнопки управления скрываемыми виджетами — например, выпадающими меню. В значении указывается состояние виджета: `false` или `true`. W3C рекомендует использовать вместе с `aria-haspopup`, хотя Bootstrap и Saleforce игнорируют: `button(aria-controls='my-dropdown', aria-expanded='false')`.

[Подробнее](https://www.w3.org/WAI/ARIA/apg/example-index/){:target="_blank"}.

Для аналитики и скриптов можно добавлять пользовательские атрибуты: `data-analytics-region`, `data-anim-scroll-group`, `data-state` и т.п.

## Сниппеты

`\((.*?)\)` ➜ `[$1]` - заменить круглые скобки pug'а на квадратные emmet'а.

### Запрет индексирования

```html
<!-- noindex-->
Официальная техника Яндекса
<!-- /noindex-->

<!-- googleoff: all-->
Такой синтаксис запрета индексации Googl'ом использует Apple. Но не знаю,
работают ли техника, или это рудимент из прошлого
<!-- googleon: all-->
```

В ссылку можно добавить атрибут `rel="nofollow"`: `a(href='url' rel='nofollow') label`.


## Собственно, шаблон

```pug
doctype html
html(lang='{{ page.lang }}' prefix='og: http://ogp.me/ns#')
head
  meta(charset='utf-8')
  meta(name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover')
  title {{ site.title }}
  meta(name='description' content='{{ site.description }}')
  meta(property='og:title' content='{{ site.title }}')
  meta(property='og:description' content='{{ site.description }}')
  meta(property='og:image' content='{{ page.image }}')
  meta(property='og:url' content='{{ page.link }}')
  meta(property='og:locale' content='{{ page.lang }}')
  meta(property='og:site_name' content='{{ site.name }}')
  meta(property='og:type' content='website')
  meta(name='twitter:card' content='summary_large_image')
  //- meta(name='twitter:creator' content='{{ site.author.twitter }}')
  //- Vladimir Nikishin, www.super-mark.ru
  meta(name='author' content='{{ site.author.summary }}')
  //- link(rel='author' href='{{ site.theme.link }}/humans.txt')

  //- Referrer Policy
  meta(name='referrer' content='origin')
  meta(name='apple-mobile-web-app-title' content='{{ site.short_name }}')

  //- Если favicon.ico хранится не в корне проекта
  link(rel='icon' href='{{ site.icons.ico }}' sizes='any')
  link(rel='icon' href='{{ site.icons.svg }}' type='image/svg+xml')
  link(rel='apple-touch-icon' href='{{ site.icons.apple_touch }}')
  link(rel='manifest' href='/manifest.json')
  //- На телефонах с челкой и островком лучше смотрится не фирменный цвет,
    а цвет «шапки». Если «шапки» нет, тогда цвет фона.
  meta(name='theme-color' content='{{ site.background }}')

  link(rel='canonical' href='{{ page.link }}')
  link(rel='alternate' href='{{ post.hreflang-ru }}' hreflang='ru')
  link(rel='alternate' href='{{ post.hreflang-en }}' hreflang='en')
  link(rel='sitemap' href='/sitemap.xml' type='application/xml')
  link(rel='alternate' href='/feed.xml' type='application/rss+xml' title='{{ site.rss_title }}')
  link(rel='preconnect' href='https://fonts.googleapis.com/')
  link(rel='stylesheet' href='https://fonts.googleapis.com/css2?family={{ site.fonts }}&display=swap')
  link(rel='stylesheet' href='{{ site.styles }}')

  script(type='application/ld+json').
    {
      "@context": "http://schema.org",
      "@type": "Product",
      "@id": "https://www.apple.com/ipad-air/#product",
      "manufacturer": {
        "@id": "https://www.apple.com/#organization"
      },
      "brand": {
        "@id": "https://www.apple.com/ipad/#brand"
      },
      "name": "iPad Air",
      "description": "The new iPad Air features an all-screen design, 10.9-inch Liquid Retina display, A14 Bionic, support for accessories, and choice of five finishes.",
      "url": "https://www.apple.com/ipad-air/",
      "mainEntityOfPage": "https://www.apple.com/ipad-air/",
      "image": "https://www.apple.com/v/ipad-air/j/images/meta/ipad-air_overview__gfldx5mj3tiu_og.png",
    "potentialAction": {
      "@type": "BuyAction",
      "seller": {
        "@id": "https://www.apple.com/#organization"
      },
      "url": ["https://www.apple.com/us/shop/goto/buy_ipad/ipad_air"]
    }
  }

  script(type='application/ld+json').
    {
      "@context": "http://schema.org",
      "@id": "https://www.apple.com/#organization",
      "@type": "Organization",
      "name": "Apple",
      "url": "https://www.apple.com/",
      "logo": "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202009231639",
      "subOrganization": {
      "@type": "Organization",
      "name": "Apple Support",
      "url": "https://support.apple.com",
      "@id": "https://support.apple.com/#organization"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-692-7753",
        "contactType": "sales",
        "areaServed": "US"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-275-2273",
        "contactType": "technical support",
        "areaServed": "US",
        "availableLanguage": ["EN", "ES"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-275-2273",
        "contactType": "customer support",
        "areaServed": "US",
        "availableLanguage": ["EN", "ES"]
      }
    ],
    "sameAs": [
      "http://www.wikidata.org/entity/Q312",
      "https://www.youtube.com/user/Apple",
      "https://www.linkedin.com/company/apple",
      "https://www.facebook.com/Apple",
      "https://www.twitter.com/Apple"
    ]
    }

body
  //- Тем элементам, которые вызываются из JS, добавляются ID-атрибуты.
    E.g. #global-search
  header.header
    a.logo(href='/' aria-label='Главная страница веб-сайта - {{ site.name }}')
      svg.logo

    //- Главное меню. В макете типа «приложение» может быть вынесено из «шапки»
      и верстаться вертикально на планшетах и ПК. В таких случаях записываем
      стили в классе `navbar`.
    nav.header__navbar(aria-label='Main')
      ul
        //- Хотя ссылки можно собирать и без UL'ов — просто набор ссылок в nav-
        //- обёртке — я предпочитаю использовать маркированные списки, потому
        //- что навигация в такой разметке приемлемо смотрится даже без стилей.
        //- А вложенные конструкции без списков вообще невозможны
        li
          a.header__navbar-link(href='/first-section')
            .label First Section
        li
          a.header__navbar-link(href='/second-section')
            .label Second Section

        //- Другие пункты меню

        li.header__search-toggle(href='/search' role='button' aria-label='Search my-site.com')
          svg.icon(aria-hidden='true')

        //- Пункты меню группы авторизации и аккаунта:
          li.a.header__navbar-link.is-(account|sign-in|sign-up|cart)

      //- Поиск
      form.search(action='/search' role='search' method='get')
        input(type='search' autocomplete='off' placeholder='Search...')
        button.btn(type='submit' aria-label='Search')
          svg.icon(aria-hidden='true')
        button.search__reset(type='reset' aria-label='Clear Search')
          svg.icon(aria-hidden='true')
        button.search__cancel(type='button' aria-label='Cancel Search')
          svg.icon(aria-hidden='true')

  //- Навигация по разделу
  nav.local-nav(aria-label='Local Navigation')
    ul
      li
        a.local-nav__link(href='/first-subsection') First Subsection
        //- Другие пункты меню

  //- MAIN
  main
    div.content
      section.hero
        .container
          .grid
            //- Одна или несколько колонок
            .col-*
              //- a.hero__eyebrow
              p.hero__eyebrow
              h1.hero__title Lorem ipsum dolor sit
              p.hero__summary
              .hero__cta
                a.btn.is-primary(href='/first-page') Label
                a.btn(href='/second-page') Label

              //- Вместо picture можно использовать figure, комбинацию этих тегов
                или «голый» img
              picture.hero__image
                img

      section.section.is-features
        .container.grid
            //- Одна или несколько колонок
            .col
              h2.section__title
              //- Содeржание: параграфы, списки, изображения (img, figure, picure)

  //- FOOTER
  footer.footer
    nav.footer__nav.container
      ul.menu
        li.footer__copyright Copyright &copy; 2020 {{ site.name }} All rights reserved.
        li: a.menu__link(href='/legal/privacy') Privacy Policy
        li: a.menu__link(href='/legal/terms') Terms of Use
        li: a.menu__link(href='/shop/help/sales-refunds') Sales and Refunds
        li: a.menu__link(href='/sitemap') Site Map

  script(src='{{ site.scripts }}')
```
