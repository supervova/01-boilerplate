# Карусель

Разработана с помощью библиотеки [Swiper](https://swiperjs.com/)

## Установка

```sh
npm install swiper

# или

yarn add swiper
```

## Разметка

```html
<div class="carousel">
  <div>
    <div class="carousel__item">Slide 1</div>
    <div class="carousel__item">Slide 2</div>
    <div class="carousel__item">Slide 3</div>
    <!-- Add more slides as needed -->
  </div>

  <!-- Add Pagination if needed -->
  <div class="carousel__pagination"></div>

  <!-- Add Navigation if needed -->
  <button class="carousel__button is-next" type="button"></button>
  <button class="carousel__button is-prev" type="button"></button>
</div>
```

## CSS

```scss
// @import '../../../../node_modules/swiper/swiper.scss';
// @import '../../../../node_modules/swiper/modules/navigation.scss';

.carousel {
  width: 100%;
  height: 100%;
}

.carousel__item {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Инициализация

```js
// import Swiper from 'swiper';
/* По умолчанию Swiper импортируют только ядро, даже без навигации. Поэтому всю
дополнительную функциональность нужно импортировать следом */
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';

// Инициализация
const swiper = new Swiper('.carousel', {
  modules: [Navigation],
  containerModifierClass: 'is-',
  wrapperClass: 'carousel__items',
  slideClass: 'carousel__item',
  slideActiveClass: 'is-active',
  slideNextClass: 'is-next',
  slidePrevClass: 'is-prev',
  spaceBetween: 24,
  centeredSlides: true,
  speed: 400,
  loop: true,
  navigation: {
    nextEl: '.carousel__button.is-next',
    prevEl: '.carousel__button.is-prev',
  },
  slidesPerView: 'auto',

  // Другие параметры см. ниже
});
```

Для работы `swiper`, достаточно сохранить экземпляр карусели в переменную, хотя Eslint будет недоволен — `no-unused-vars`. Впрочем, переменную можно использовать для управления каруселью из JS.

```js
// Например, переключать слайды
swiper.slideNext();

// Добавлять обработчики событий
swiper.on('slideChange', () => {
  console.log('Slide changed to: ', swiper.activeIndex);
});
```

## Стили

/node_modules/swiper/

- swiper.scss - базовые
- modules/*.scss - стили модулей

В принципе, можно обойтись только собственными стилями.

## Параметры экземпляров

- **a11y.** Добавляет в разметку aria-атрибуты. Требуется модуль `Accessibility`.

    ```js
      a11y: {
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      },
    ```

- **autoplay.** Параметры автовоспроизведения.

    ```js
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    ```

- **breakpoints.** Параметры по точка остановы. Не нужно, если установлено значение `slidesPerView: 'auto'`.

    ```js
    breakpoints: {
      // >= 872 (width+gap+margin: 400*2 + 24*3)
      872: {
        slidesPerView: 2,
      },
      // >= 1296x
      1296: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // 1024px
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },

      '@0.75': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      '@1.50': {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
    ```

- **cssMode**. Включает режим, основанный на CSS Scroll Snap API. Для простых каруселей это сильно экономит ресурсы компьютера. Но практически непригоден с более-менее сложными настройками, начиная с цикла.

- **effect**.	Устанавливает эффект перехода вместо стандартного прокручивания влево-вправо:

  - [fade](https://swiperjs.com/demos#effect-fade) — стандартный фейдинг
  - [cards](https://swiperjs.com/demos#effect-cards) — стопка карточек
  - [creative](https://swiperjs.com/demos#effect-creative) — пользовательский эффект на основе стандартных трансформаций: `rotate`, `translate`, `scale`
  - [coverflow](https://swiperjs.com/demos#effect-coverflow) — старая карусель Finder/iTunes
  - [cube](https://swiperjs.com/demos#effect-cube) — куб
  - [flip](https://swiperjs.com/demos#effect-flip) — переворот

  Каждый эффект должен быть подключен как модуль — см. ниже раздел «Модули» — и каждый имеет именной параметр настройки. Например, `fadeEffect`.

- **grid.** Включает [многострочный режим](https://swiperjs.com/demos#grid).

- **hashNavigation.** Требуется модуль Hash Navigation. Они дают возможность создавать загружать страницы с открытым конкретным слайдом.

- **initialSlide**. Какой слайд станет первым по умолчанию.

- **keyboard**. Требуется модуль Keyboard. Вместе они включают навигацию с клавиатуры. Но она не особенно очевидна, така как прежде чем использовать, надо передать фокус кнопке «вперёд» или «назад». Если нужна более удобная навигация с клавиатуры, лучше использовать методы.

    ```js
    const swiper = new Swiper('.carousel', {
      modules: [Navigation],
      // Другие настройки Swiper
    });

    swiper.on("keyPress", (swiper, keyCode) => {
      switch (keyCode) {
        case 38:
          swiper.slidePrev();
          break;
        case 40:
          swiper.slideNext();
          break;
      }
    });
    ```

- **lazyPreloadPrevNext**. Количество следующих и предыдущих слайдов для предварительной загрузки. Применяется только при использовании опции lazy- загрузки.

- **mousewheel**. Требуется модуль Mousewheel Control. Вместе они включают навигацию с колесиком мышки.

- **pagination.** Индикаторы слайдов с возможностью навигации.

    ```js
    pagination: {
      el: '.carousel__pagination',
      clickable: true,
    }
    ```

- **parallax**. Включает [эффект параллакса](https://swiperjs.com/demos#parallax).

- **preventClicks**. Предотвращает случайные переходы по ссылкам во время пролистывания.

- **roundLengths**. Округляет ширину и высоту для предотвращения размазывания текстов и границ.

- **scrollbar.** Полоса прокрутки.

- **slidesPerGroup**. Определяет насколько слайдов карусель прокручивается за раз.

- **thumbs**. Настройки навигации с помощью миниатюр.

- **watchOverflow**. Скрывать кнопки «вперёд» и «назад», когда слайды в карусели заканчиваются, а цикл не включен.

Остальные параметры см. в официальной [документации](https://swiperjs.com/swiper-api#parameters)

## Методы и свойства

Переменная в которую сохраняется экземпляр карусели может называться по-разному. Здесь мы ее называется так же, как в [официальной документации](https://swiperjs.com/swiper-api#methods--properties) — `swiper`.

Некоторые свойства повторяют параметрам экземпляра (см. выше). Здесь мы их опустим.

- **swiper.activeIndex**. Индекс активного слайда. В режиме цикла это значение смещается на несколько слайдов-дубликатов, добавленных для цикла. Для получения точного индекса активного слайда в цикле следует использовать свойство `swiper.realIndex`.

- **swiper.clickedIndex**. Индекс кликнутого слайда.

- **swiper.isBeginning** / **swiper.isEnd**. `true` если карусель находится в исходном положении или прокручена до конца.

- **swiper.on**. Добавляет на экземпляр обработчики событий.

    ```js
    swiper.on("keyPress", (swiper, keyCode) => {/**/}
    ```

- **swiper.once**(event, handler). Добавляет обработчик события, который будет удален после срабатывания.

- **swiper.slideNext**(speed, runCallbacks) / **swiper.slidePrev**(speed, runCallbacks). Прокрутка вперёд / назад.

- **swiper.slideTo**(index, speed, runCallbacks). Прокрутка к определенному слайду.

## События

- `click`. Клик на элементе карусели.
- `reachEnd`. Карусель прокручена до конца.
- `slideChange`. Изменился активный слайд.
- `slideChangeTransition`, `slideChangeTransitionEnd`, `slideChangeTransitionStart`, `slideNextTransitionEnd`, `slideNextTransitionStart`, `slidePrevTransitionEnd`, `slidePrevTransitionStart`, `slideResetTransitionEnd` — события переходов.
- `toEdge` — карусель прокручена к концу или началу.

[Другие события](https://swiperjs.com/swiper-api#events)

## Модули

Подключаются в объекте экземпляра.

```js
modules: [Navigation],
```

Каждый модуль имеет [множество собственных настроек и методов](https://swiperjs.com/swiper-api#modules).

- [Navigation](https://swiperjs.com/swiper-api#navigation)
- [Pagination](https://swiperjs.com/swiper-api#pagination)
- [ScrollBar](https://swiperjs.com/swiper-api#scrollbar)
- [Autoplay](https://swiperjs.com/swiper-api#autoplay)
- [Free Mode](https://swiperjs.com/swiper-api#free-mode)
- [Grid](https://swiperjs.com/swiper-api#grid)
- [Manipulation](https://swiperjs.com/swiper-api#manipulation)
- [Parallax](https://swiperjs.com/swiper-api#parallax)
- [Lazy Loading](https://swiperjs.com/swiper-api#lazy-loading)
- [Fade Effect](https://swiperjs.com/swiper-api#fade-effect)
- [Coverflow Effect](https://swiperjs.com/swiper-api#coverflow-effect)
- [Flip Effect](https://swiperjs.com/swiper-api#flip-effect)
- [Cube Effect](https://swiperjs.com/swiper-api#cube-effect)
- [Cards Effect](https://swiperjs.com/swiper-api#cards-effect)
- [Creative Effect](https://swiperjs.com/swiper-api#creative-effect)
- [Thumbs](https://swiperjs.com/swiper-api#thumbs) — навигация с помощью миниатюр
- [Zoom](https://swiperjs.com/swiper-api#zoom) — функциональность «светового короба» — открытие увеличенного изображения из слайда
- [Keyboard Control](https://swiperjs.com/swiper-api#keyboard-control)
- [Mousewheel Control](https://swiperjs.com/swiper-api#mousewheel-control)
- [Virtual Slides](https://swiperjs.com/swiper-api#virtual-slides). Позволяет хранить в DOM только необходимое количество слайдов. Это очень полезно с точки зрения производительности, если в карусели много слайдов, особенно сос ложным макетом или изображениями.
- [Hash Navigation](https://swiperjs.com/swiper-api#hash-navigation). Позволяет создавать hash-ссылки, по котором можно загружать страницы с открытым конкретным слайдом.
- [History Navigation](https://swiperjs.com/swiper-api#history-navigation). Позволяет создавать ссылки, типа `/slide-2` по котором можно прокручивать карусель к конкретному слайду.
- [Controller](https://swiperjs.com/swiper-api#controller)
- [Accessibility](https://swiperjs.com/swiper-api#accessibility-a11y)

