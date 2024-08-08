(() => {
  const listViewOptions = document.getElementById('list-view-options');

  /**
   * Change popover labels
   */
  function changePopoverLabel(event) {
    const selectedOption = event.target;
    const popoverToggle = selectedOption
      .closest('[data-role="popover"]')
      .querySelector('[data-toggle="popover"]');
    popoverToggle.innerHTML = selectedOption.textContent;
  }

  listViewOptions?.addEventListener('click', (event) => {
    if (event.target.matches('[data-role="list-view-option"]')) {
      changePopoverLabel(event);
    }
  });
})();
