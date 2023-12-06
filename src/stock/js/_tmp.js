(() => {
  // Get adaptive menu parents
  const containers = document.querySelectorAll(
    '[data-role="overflow menu parent"]'
  );

  containers.forEach((container) => {
    const primary = container.querySelector('[data-role="visible menu"]');
    const primaryItems = container.querySelectorAll(
      '[data-role="visible menu"] > li'
    );

    createOverflowMenu(primary, primaryItems);
  });

  // Get popover items and total
  const overflow = document.getElementById('header-more-popover');
  const overflowItems = overflow?.querySelectorAll('li');

  const moreLi = primary?.querySelector('.dropdown');
})();

// v2 --------------------------------------------------------------------------

/**
 * Create an overflow menu from all items of a visible menu
 *
 * @param {HTMLElement} visibleMenu` An unordered list containing menu items
 * @param {NodeList} allItems `visibleMenu` list items
 * @param {string} moreLabel `visibleMenu` Overflow menu trigger label
 */
const createOverflowMenu = (visibleMenu, allItems, moreLabel = 'More') => {
  const template = document.createElement('template');
  template.innerHTML = `
    <li class="menu__link is-more">
      <details class="popover" data-role="popover">
        <summary class="menu__link">
          <span class="label">${moreLabel}</span>
        </summary>
        <ul class="popover__body menu">
          ${allItems.innerHTML}
        </ul>
      </details>
    </li>
  `;

  // Insert overflow menu
  visibleMenu.insertAdjacentElement(
    'beforeend',
    template.content.querySelector('.menu__link.is-more')
  );
};

/**
 * Adapt a horizontal menu, hiding elements that are not placed on the screen
 * in an overflow menu
 *
 * @param {Element} parent A menu parent element: header or smth else with
 *  data-role="overflow menu parent"
 * @param {number} parentGap The amount of gaps between the menu and its siblings
 */
const adaptHorizontalMenu = (parent, parentGap = 80) => {
  const container = document.getElementById(parent.id);
  const allItems = container.querySelectorAll('[data-role="menu"] > li');

  if (
    container &&
    window.matchMedia('(min-width: 768px) and (min-height: 415px)').matches
  ) {
    const visibleMenu = container.querySelector('[data-role="visible menu"]');

    createOverflowMenu(visibleMenu, allItems);

    const moreLi = visibleMenu?.querySelector('.menu__link.is-more');
    // ? const moreBtn = moreLi?.querySelector('summary.menu__link');
    const overflowItems = document.querySelectorAll('li');

    // reveal all items for the calculation
    allItems.forEach((item) => {
      item.classList.remove('is-hidden');
    });

    // Hide items that won't fit in the visible area
    let stopWidth = moreLi.offsetWidth; // ?
    const hiddenItems = [];

    // Get width of menu siblings: logo, user menu etc
    let siblingsWidth = 0;

    container
      .querySelectorAll(':scope > *:not([data-role="menu"])')
      .forEach((el) => {
        siblingsWidth += el.getBoundingClientRect().width;
      });

    const availableSpace =
      document.body.offsetWidth - siblingsWidth - parentGap;

    allItems.forEach((item, i) => {
      if (availableSpace >= stopWidth + item.offsetWidth) {
        stopWidth += item.offsetWidth;
      } else {
        item.classList.add('is-hidden');
        hiddenItems.push(i);
      }
    });

    // Toggle the visibility of More button and items in popover
    if (!hiddenItems.length) {
      moreLi.classList.add('is-hidden');
    } else {
      overflowItems.forEach((item, i) => {
        if (!hiddenItems.includes(i)) {
          item.classList.add('is-hidden');
        }
      });
    }
  } else {
    allItems.forEach((item) => {
      item.classList.remove('is-hidden');
    });
  }
};

const container = document.getElementById('adaptive-menu-parent');

adaptHorizontalMenu(container);
window.addEventListener('resize', adaptHorizontalMenu(container));

// v3 --------------------------------------------------------------------------

const menus = document.querySelectorAll('[data-role="adaptive menu"]');

menus.forEach((menu) => {
  const menuItems = menu.querySelectorAll(':scope > li');
  const menuWidth = menu.offsetWidth;
  let itemsWidth = 0;
  let i = menuItems.length - 1;
  let isOverflow = false;

  // Get the width of each menu element and calculate the total width
  while (i >= 0) {
    const itemWidth = menuItems[i].offsetWidth;
    if (itemsWidth + itemWidth > menuWidth) {
      isOverflow = true;
      break;
    }
    itemsWidth += itemWidth;
    i -= 1;
  }

  console.log(itemsWidth);
  console.log(menuWidth);

  // Если суммарная ширина пункто, создается новый пункт "li.is-more" с надписью "More" внутри.
  if (isOverflow) {
    const moreItem = document.createElement('li');
    moreItem.classList.add('is-more');
    const moreLink = document.createElement('a');
    moreLink.classList.add('menu__link');
    moreLink.setAttribute('href', '#');
    const moreLabel = document.createElement('span');
    moreLabel.classList.add('label');
    moreLabel.textContent = 'More';
    moreLink.appendChild(moreLabel);
    moreItem.appendChild(moreLink);

    /* Starting from the last menu item, the items are added to the overflow
    menu. The menu width and the width of all its elements are compared after
    each addition. */
    for (let j = menuItems.length - 1; j >= i; j--) {
      moreItem.insertBefore(menuItems[j], moreLink);
    }

    // Новый пункт "li.is-more" добавляется в конец меню.
    menu.appendChild(moreItem);
  }
});

/*
Код работает следующим образом:


- Все пункты, которые не помещаются в меню, начиная с последнего, перемещаются в новый пункт "li.is-more".


Если родительский элемент [data-role="overflow menu parent"] также имеет свойство display: flex, а соседние элементы a.logo и a.avatar также выравниваются по горизонтали, то для расчета доступной ширины для пунктов меню нужно учитывать ширину этих соседних элементов.

Для определения доступной ширины для пунктов меню можно использовать метод Element.getBoundingClientRect(), который возвращает объект с размерами и координатами элемента относительно окна просмотра (viewport). Например, чтобы получить доступную ширину для пунктов меню, можно вычислить ширину родительского элемента [data-role="overflow menu parent"] и вычесть из нее ширину a.logo, a.avatar и других элементов, которые занимают место на этом уровне.
*/

// v4 --------------------------------------------------------------------------

const menus = document.querySelectorAll('[data-role="adaptive menu"]');

menus.forEach((menu) => {
  // Get the list of menu items that need to be checked for overflow.
  const menuItems = menu.querySelectorAll(':scope > li');
  const containerWidth = menu.offsetWidth;
  let totalWidth = 0;
  const overflowItems = [];

  // Loop through each menu and check if the items fit within the container.
  menuItems.forEach((item) => {
    totalWidth += Math.ceil(item.getBoundingClientRect().width);

    if (totalWidth > containerWidth) {
      overflowItems.push(item);
    }
  });

  /* If the menu items do not fit, we create an dropdown menu that contains
    the overflowed items. */
  if (overflowItems.length > 0) {
    const moreItem = document.createElement('li');
    moreItem.className = 'menu__item is-more';

    // Create a details.popover…
    const details = document.createElement('details');
    details.className = 'popover';
    moreItem.appendChild(details);

    // … and a summary.menu__link.
    const summary = document.createElement('summary');
    summary.className = 'menu__link';
    summary.innerHTML = '<span class="label">More</span>';
    details.appendChild(summary);

    const popoverBody = document.createElement('ul');
    popoverBody.className = 'popover__body menu';
    details.appendChild(popoverBody);

    // Loop through each overflowed menu item and append it to the overflow ul.
    overflowItems.forEach((item) => {
      popoverBody.appendChild(item);
    });

    menu.appendChild(moreItem);
  }
});

