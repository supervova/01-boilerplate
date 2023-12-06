(() => {
  /**
   * Update filter subtitles
   * @param {object} event
   */
  const updateFilterSubtitles = (event) => {
    const accordion = event.target.closest('.accordion');

    if (!accordion.hasAttribute('open')) {
      return;
    }

    const subtitle = accordion.querySelector('.accordion__header small');

    // Clear subtitle first
    subtitle.textContent = '';

    // Array for
    const selected = [];

    accordion
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        // Get label string
        selected.push(
          checkbox
            .closest('.input.has-option')
            .querySelector('.input__option-label').textContent
        );
      });

    // Update subtitle
    if (selected.length > 0) {
      subtitle.textContent = selected.join(', ');
    }
  };

  // Event listener
  const openFilterHeaders = document.querySelectorAll(
    '.filter .accordion .accordion__header'
  );

  openFilterHeaders.forEach((header) => {
    header.addEventListener('click', (event) => {
      updateFilterSubtitles(event);
    });
  });

  // ---------------------------------------------------------------------------

  const input = document.getElementById('modal-skills-filter');

  /**
   * Filter list of skills
   */
  const filterList = () => {
    const filter = input.value.toUpperCase();
    const list = document.getElementById('modal-skills-list');
    const li = list.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < li.length; i++) {
      const a = li[i].querySelector('.input__option-label');
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  };

  // Event listener
  input.addEventListener('input', filterList);
})();
