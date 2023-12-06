// Close popover with an outside click
(() => {
  // Convert a NodeList to an Array for using `some` method
  // const popovers = [...document.querySelectorAll('[data-role="popover"]')];
  const popovers = [...document.getElementsByClassName('js-popover')];

  document.addEventListener('click', (event) => {
    if (!popovers.some((el) => el.contains(event.target))) {
      popovers.forEach((el) => el.removeAttribute('open'));
    } else {
      popovers.forEach((el) =>
        !el.contains(event.target) ? el.removeAttribute('open') : ''
      );
    }
  });
})();

// Close popovers with Esc
window.addEventListener('keydown', (event) => {
  if (event.key === 'Esc' || event.key === 'Escape') {
    document.querySelector('.js-popover[open]')?.removeAttribute('open');
  }
});
