/*

Отладка — ни хера не работает. Попробовать скрестить код вот с таким

// создать moreItem в начале кода

// но скрыть его
moreItem.style.display = "none";

container.appendChild(moreItem);

let totalWidth = 0;

items.forEach(item => {
  totalWidth += item.offsetWidth;
});

// проверка, нужен ли элемент moreItem
if (totalWidth + moreItem.offsetWidth > container.offsetWidth) {
  moreItem.style.display = "block";
}

Потом добавить медиазапрос

if (
  window.matchMedia(
    '(min-width: 768px) and (min-height: 414px), (min-width: 1024px)'
  ).matches
) {}

*/

function handleMenuOverflow() {
  const menus = document.getElementsByClassName('js-adaptive-menu');

  menus.forEach((menu) => {
    // Get the list of menu items that need to be checked for overflow.
    const menuItems = menu.querySelectorAll(':scope > li');
    const containerWidth = menu.offsetWidth;
    let totalWidth = 0;
    const overflowItems = [];

    // Loop through each menu and check if the items fit within the container.
    menuItems.forEach((item) => {
      totalWidth += item.offsetWidth;

      if (totalWidth + moreItem.offsetWidth > containerWidth) {
        overflowItems.push(item);
      }
    });

    /* If the menu items do not fit, we need to create a new list item with
    a dropdown menu that contains the overflowed items. */
    if (overflowItems.length > 0) {
      const moreItem = document.createElement('li');
      moreItem.className = 'menu__item is-more';

      // Create a details.popover…
      const details = document.createElement('details');
      details.className = 'popover js-popover';
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
}

// Call the function once when the page is loaded
handleMenuOverflow();

// Call the function again when the window is resized
window.addEventListener('resize', handleMenuOverflow);
