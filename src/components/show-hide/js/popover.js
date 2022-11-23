/**
 * Close popovers on Esc
 *
 * @param {object} popover Open popover menu
 */
window.addEventListener('keydown', (event) => {
  if (event.key === 'Esc' || event.key === 'Escape') {
    document.querySelectorAll('.popover[open]').forEach((popover) => {
      popover.removeAttribute('open');
    });
  }
});
