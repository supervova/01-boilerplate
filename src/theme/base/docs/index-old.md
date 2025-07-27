---
title: 01-boilerplate - Class-light CSS Framework
permalink: /
layout: page
---

<article tabindex="0">
  <h1>Ola Roy</h1>
</article>

<div class="buttons">
  <a href="/src/views/wip/2-html-ipsum.html" data-action="open modal" data-window="modal-external">
    Внешняя ссылка
  </a>

  <button type="button" data-action="open modal" data-window="modal-default">
    Стандартный
  </button>

  <button type="button" data-action="open modal" data-window="modal-brief">
    Мало содержания
  </button>

  <button type="button" data-action="open modal" data-window="modal-lg">
    LG
  </button>

  <button type="button" data-action="open modal" data-window="modal-sm">
    SM
  </button>

  <button type="button" data-action="open modal" data-window="modal-headerless">
    Headerless
  </button>

  <button type="button" data-action="open modal" data-window="modal-footerless">
    Footerless
  </button>

  <button type="button" data-action="open modal" data-window="modal-just-body">
    Just body
  </button>
</div>

<dialog class="modal" id="modal-default">
  <header>
    <h2 class="modal__title">Съешь же ещё этих мягких французских булок да выпей чаю</h2>
  </header>
  <div class="modal__body">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sapiente libero itaque officiis minus illo sit magnam, deserunt, ea quos hic consectetur? Placeat porro unde quasi ducimus accusantium incidunt! Totam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, placeat atque perferendis distinctio quisquam aperiam! Porro perferendis facere voluptatum vel mollitia facilis illo. Recusandae minus, at error illum doloribus neque!</p>
    <p>Non nam cupiditate nobis placeat, maxime, architecto omnis odio labore ab aut officiis iure, dolore est cumque quasi magni maiores! Amet magnam voluptatibus voluptatem tempore quisquam consectetur illo consequuntur corporis.</p>
    <p>Qui, dolor, perspiciatis voluptas quisquam iste expedita suscipit accusantium cupiditate ducimus recusandae a eveniet quas minus beatae! Doloribus hic, in enim dolor facere voluptatibus ut odit rem, dicta eligendi quaerat!</p>
    <p>Odio quos ad, sunt cupiditate blanditiis perferendis aut enim at reiciendis consectetur, molestias quo tenetur dignissimos odit officia accusantium nostrum, quis distinctio eveniet? Aliquam voluptatem maiores suscipit quae nam quidem!</p>
    <p>Similique iure quia, eligendi nostrum unde beatae, quod et, officiis fugit ipsa amet error qui magni ipsum nihil ducimus sunt quam deserunt. A est, pariatur ex corporis eaque quia laborum?</p>
    <p>Quidem rem beatae officia aliquid, id delectus provident consequatur ut deleniti ad perferendis necessitatibus minus expedita, quos enim harum laborum, impedit in iste doloribus. Consequatur, aut. Accusantium similique quis ab.</p>
    <p>Suscipit quas quo quisquam fuga, aut consectetur incidunt nihil quam, repellat pariatur debitis praesentium deleniti illum? Deserunt nam error ab amet nisi non eius necessitatibus illum sapiente. Hic, assumenda officia! Развязка</p>
    <p>Конец.</p>
  </div>
  <footer>
    <button type="button" data-action="close">
      <span>Отмена</span>
    </button>
    <button type="submit">
      <svg class="icon tablet:d-none" aria-hidden="true" focusable="false">
        <use href="/assets/img/base/graphics/sprite.svg#icon-checkmark"></use>
      </svg>
      <span class="d-none tablet:d-inline">Submit</span>
    </button>
  </footer>
</dialog>

<dialog class="modal" id="modal-brief">
  <header>
    <h2 class="modal__title">Съешь же ещё этих мягких французских булок да выпей чаю</h2>
  </header>
  <div class="modal__body">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sapiente libero itaque officiis minus illo sit magnam, deserunt, ea quos hic consectetur? Placeat porro unde quasi ducimus accusantium incidunt! Totam!</p>
  </div>
  <footer>
    <button type="button" data-action="close">
      <span>Отмена</span>
    </button>
    <button type="submit">
      <svg class="icon tablet:d-none" aria-hidden="true" focusable="false">
        <use href="/assets/img/base/graphics/sprite.svg#icon-checkmark"></use>
      </svg>
      <span class="d-none tablet:d-inline">Submit</span>
    </button>
  </footer>
</dialog>

<dialog class="modal is-lg" id="modal-lg">
  <header>
    <h2 class="modal__title">Съешь же ещё этих мягких французских булок да выпей чаю</h2>
  </header>
  <div class="modal__body">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sapiente libero itaque officiis minus illo sit magnam, deserunt, ea quos hic consectetur? Placeat porro unde quasi ducimus accusantium incidunt! Totam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, placeat atque perferendis distinctio quisquam aperiam! Porro perferendis facere voluptatum vel mollitia facilis illo. Recusandae minus, at error illum doloribus neque!</p>
    <p>Non nam cupiditate nobis placeat, maxime, architecto omnis odio labore ab aut officiis iure, dolore est cumque quasi magni maiores! Amet magnam voluptatibus voluptatem tempore quisquam consectetur illo consequuntur corporis.</p>
    <p>Qui, dolor, perspiciatis voluptas quisquam iste expedita suscipit accusantium cupiditate ducimus recusandae a eveniet quas minus beatae! Doloribus hic, in enim dolor facere voluptatibus ut odit rem, dicta eligendi quaerat!</p>
    <p>Odio quos ad, sunt cupiditate blanditiis perferendis aut enim at reiciendis consectetur, molestias quo tenetur dignissimos odit officia accusantium nostrum, quis distinctio eveniet? Aliquam voluptatem maiores suscipit quae nam quidem!</p>
    <p>Similique iure quia, eligendi nostrum unde beatae, quod et, officiis fugit ipsa amet error qui magni ipsum nihil ducimus sunt quam deserunt. A est, pariatur ex corporis eaque quia laborum?</p>
    <p>Quidem rem beatae officia aliquid, id delectus provident consequatur ut deleniti ad perferendis necessitatibus minus expedita, quos enim harum laborum, impedit in iste doloribus. Consequatur, aut. Accusantium similique quis ab.</p>
    <p>Suscipit quas quo quisquam fuga, aut consectetur incidunt nihil quam, repellat pariatur debitis praesentium deleniti illum? Deserunt nam error ab amet nisi non eius necessitatibus illum sapiente. Hic, assumenda officia! Развязка</p>
    <p>Конец.</p>
  </div>
  <footer>
    <button type="button" data-action="close">
      <span>Отмена</span>
    </button>
    <button type="submit">
      <svg class="icon tablet:d-none" aria-hidden="true" focusable="false">
        <use href="/assets/img/base/graphics/sprite.svg#icon-checkmark"></use>
      </svg>
      <span class="d-none tablet:d-inline">Submit</span>
    </button>
  </footer>
</dialog>

<dialog class="modal is-sm" id="modal-sm">
  <header>
    <h2 class="modal__title">Съешь же ещё этих мягких французских булок да выпей чаю</h2>
  </header>
  <div class="modal__body">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sapiente libero itaque officiis minus illo sit magnam, deserunt, ea quos hic consectetur? Placeat porro unde quasi ducimus accusantium incidunt! Totam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, placeat atque perferendis distinctio quisquam aperiam! Porro perferendis facere voluptatum vel mollitia facilis illo. Recusandae minus, at error illum doloribus neque!</p>
    <p>Non nam cupiditate nobis placeat, maxime, architecto omnis odio labore ab aut officiis iure, dolore est cumque quasi magni maiores! Amet magnam voluptatibus voluptatem tempore quisquam consectetur illo consequuntur corporis.</p>
    <p>Qui, dolor, perspiciatis voluptas quisquam iste expedita suscipit accusantium cupiditate ducimus recusandae a eveniet quas minus beatae! Doloribus hic, in enim dolor facere voluptatibus ut odit rem, dicta eligendi quaerat!</p>
    <p>Odio quos ad, sunt cupiditate blanditiis perferendis aut enim at reiciendis consectetur, molestias quo tenetur dignissimos odit officia accusantium nostrum, quis distinctio eveniet? Aliquam voluptatem maiores suscipit quae nam quidem!</p>
    <p>Similique iure quia, eligendi nostrum unde beatae, quod et, officiis fugit ipsa amet error qui magni ipsum nihil ducimus sunt quam deserunt. A est, pariatur ex corporis eaque quia laborum?</p>
    <p>Quidem rem beatae officia aliquid, id delectus provident consequatur ut deleniti ad perferendis necessitatibus minus expedita, quos enim harum laborum, impedit in iste doloribus. Consequatur, aut. Accusantium similique quis ab.</p>
    <p>Suscipit quas quo quisquam fuga, aut consectetur incidunt nihil quam, repellat pariatur debitis praesentium deleniti illum? Deserunt nam error ab amet nisi non eius necessitatibus illum sapiente. Hic, assumenda officia! Развязка</p>
    <p>Конец.</p>
  </div>
  <footer>
    <button type="button" data-action="close">
      <span>Отмена</span>
    </button>
    <button type="submit" autofocus>
      <svg class="icon tablet:d-none" aria-hidden="true" focusable="false">
        <use href="/assets/img/base/graphics/sprite.svg#icon-checkmark"></use>
      </svg>
      <span class="d-none tablet:d-inline">Submit</span>
    </button>
  </footer>
</dialog>

<dialog class="modal is-lg" id="modal-external">
  <button class="modal__close" type="button" data-action="close" aria-label="Close">
    <svg class="icon" aria-hidden="true" focusable="false">
      <use href="/assets/img/base/graphics/sprite.svg#icon-x-mark"></use>
    </svg>
  </button>
  <div class="modal__content">
  </div>
</dialog>

<dialog class="modal" id="modal-headerless">
  <div class="modal__body">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sapiente libero itaque officiis minus illo sit magnam, deserunt, ea quos hic consectetur? Placeat porro unde quasi ducimus accusantium incidunt! Totam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, placeat atque perferendis distinctio quisquam aperiam! Porro perferendis facere voluptatum vel mollitia facilis illo. Recusandae minus, at error illum doloribus neque!</p>
    <p>Non nam cupiditate nobis placeat, maxime, architecto omnis odio labore ab aut officiis iure, dolore est cumque quasi magni maiores! Amet magnam voluptatibus voluptatem tempore quisquam consectetur illo consequuntur corporis.</p>
    <p>Qui, dolor, perspiciatis voluptas quisquam iste expedita suscipit accusantium cupiditate ducimus recusandae a eveniet quas minus beatae! Doloribus hic, in enim dolor facere voluptatibus ut odit rem, dicta eligendi quaerat!</p>
    <p>Odio quos ad, sunt cupiditate blanditiis perferendis aut enim at reiciendis consectetur, molestias quo tenetur dignissimos odit officia accusantium nostrum, quis distinctio eveniet? Aliquam voluptatem maiores suscipit quae nam quidem!</p>
    <p>Similique iure quia, eligendi nostrum unde beatae, quod et, officiis fugit ipsa amet error qui magni ipsum nihil ducimus sunt quam deserunt. A est, pariatur ex corporis eaque quia laborum?</p>
    <p>Quidem rem beatae officia aliquid, id delectus provident consequatur ut deleniti ad perferendis necessitatibus minus expedita, quos enim harum laborum, impedit in iste doloribus. Consequatur, aut. Accusantium similique quis ab.</p>
    <p>Suscipit quas quo quisquam fuga, aut consectetur incidunt nihil quam, repellat pariatur debitis praesentium deleniti illum? Deserunt nam error ab amet nisi non eius necessitatibus illum sapiente. Hic, assumenda officia! Развязка</p>
    <p>Конец.</p>
  </div>
  <footer>
    <button type="button" data-action="close">
      <span>Отмена</span>
    </button>
    <button type="submit">
      <svg class="icon tablet:d-none" aria-hidden="true" focusable="false">
        <use href="/assets/img/base/graphics/sprite.svg#icon-checkmark"></use>
      </svg>
      <span class="d-none tablet:d-inline">Submit</span>
    </button>
  </footer>
</dialog>

<dialog class="modal" id="modal-footerless">
  <button class="modal__close" type="button" data-action="close" aria-label="Close">
    <svg class="icon" aria-hidden="true" focusable="false">
      <use href="/assets/img/base/graphics/sprite.svg#icon-x-mark"></use>
    </svg>
  </button>
  <header>
    <h2 class="modal__title">Съешь же ещё этих мягких французских булок да выпей чаю</h2>
  </header>
  <div class="modal__body">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sapiente libero itaque officiis minus illo sit magnam, deserunt, ea quos hic consectetur? Placeat porro unde quasi ducimus accusantium incidunt! Totam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, placeat atque perferendis distinctio quisquam aperiam! Porro perferendis facere voluptatum vel mollitia facilis illo. Recusandae minus, at error illum doloribus neque!</p>
    <p>Non nam cupiditate nobis placeat, maxime, architecto omnis odio labore ab aut officiis iure, dolore est cumque quasi magni maiores! Amet magnam voluptatibus voluptatem tempore quisquam consectetur illo consequuntur corporis.</p>
    <p>Qui, dolor, perspiciatis voluptas quisquam iste expedita suscipit accusantium cupiditate ducimus recusandae a eveniet quas minus beatae! Doloribus hic, in enim dolor facere voluptatibus ut odit rem, dicta eligendi quaerat!</p>
    <p>Odio quos ad, sunt cupiditate blanditiis perferendis aut enim at reiciendis consectetur, molestias quo tenetur dignissimos odit officia accusantium nostrum, quis distinctio eveniet? Aliquam voluptatem maiores suscipit quae nam quidem!</p>
    <p>Similique iure quia, eligendi nostrum unde beatae, quod et, officiis fugit ipsa amet error qui magni ipsum nihil ducimus sunt quam deserunt. A est, pariatur ex corporis eaque quia laborum?</p>
    <p>Quidem rem beatae officia aliquid, id delectus provident consequatur ut deleniti ad perferendis necessitatibus minus expedita, quos enim harum laborum, impedit in iste doloribus. Consequatur, aut. Accusantium similique quis ab.</p>
    <p>Suscipit quas quo quisquam fuga, aut consectetur incidunt nihil quam, repellat pariatur debitis praesentium deleniti illum? Deserunt nam error ab amet nisi non eius necessitatibus illum sapiente. Hic, assumenda officia! Развязка</p>
    <p>Конец.</p>
  </div>
</dialog>

<dialog class="modal" id="modal-just-body">
  <div class="modal__body">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, sapiente libero itaque officiis minus illo sit magnam, deserunt, ea quos hic consectetur? Placeat porro unde quasi ducimus accusantium incidunt! Totam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, placeat atque perferendis distinctio quisquam aperiam! Porro perferendis facere voluptatum vel mollitia facilis illo. Recusandae minus, at error illum doloribus neque!</p>
    <p>Non nam cupiditate nobis placeat, maxime, architecto omnis odio labore ab aut officiis iure, dolore est cumque quasi magni maiores! Amet magnam voluptatibus voluptatem tempore quisquam consectetur illo consequuntur corporis.</p>
    <p>Qui, dolor, perspiciatis voluptas quisquam iste expedita suscipit accusantium cupiditate ducimus recusandae a eveniet quas minus beatae! Doloribus hic, in enim dolor facere voluptatibus ut odit rem, dicta eligendi quaerat!</p>
    <p>Odio quos ad, sunt cupiditate blanditiis perferendis aut enim at reiciendis consectetur, molestias quo tenetur dignissimos odit officia accusantium nostrum, quis distinctio eveniet? Aliquam voluptatem maiores suscipit quae nam quidem!</p>
    <p>Similique iure quia, eligendi nostrum unde beatae, quod et, officiis fugit ipsa amet error qui magni ipsum nihil ducimus sunt quam deserunt. A est, pariatur ex corporis eaque quia laborum?</p>
    <p>Quidem rem beatae officia aliquid, id delectus provident consequatur ut deleniti ad perferendis necessitatibus minus expedita, quos enim harum laborum, impedit in iste doloribus. Consequatur, aut. Accusantium similique quis ab.</p>
    <p>Suscipit quas quo quisquam fuga, aut consectetur incidunt nihil quam, repellat pariatur debitis praesentium deleniti illum? Deserunt nam error ab amet nisi non eius necessitatibus illum sapiente. Hic, assumenda officia! Развязка</p>
    <p>Конец.</p>
  </div>
</dialog>
