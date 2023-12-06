/**
 * Add `is-pinned` class to a modal header
 */
const toggleTitleStyle = (el, root) => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    const observer = new IntersectionObserver(
      ([entry]) =>
        el.classList.toggle('is-pinned', entry.intersectionRatio < 1),
      {
        threshold: [1],
        root: document.querySelector(root),
        // Compensate for the negative inline margins of the target
        rootMargin: '0px 50px',
      }
    );

    observer.observe(el);
  }
};

/**
 * Open an external page in the modal window
 */
const getExternalContent = (event) => {
  // Link that triggered the modal
  const modalExternal = document.getElementById('modal-external');
  const container = modalExternal.querySelector('.modal__content');
  const href = event.currentTarget.getAttribute('href');

  event.preventDefault();

  fetch(href)
    .then((response) => {
      // Get page HTML as a text string
      return response.text();
    })
    .then((html) => {
      // Convert the HTML string into a document object
      const parser = new DOMParser();
      const contentSource = parser.parseFromString(html, 'text/html');

      // Get the page content and insert it in modal container
      const content = contentSource.querySelector('.content').innerHTML;
      container.insertAdjacentHTML('beforeend', content);
    });

  /* Clear the `#modal-external` content to prevent show it before new document
    has been loaded */
  modalExternal.addEventListener('close', () => {
    container.innerHTML = '';
  });
};

/**
 * Close modal
 */
const closeModal = (modal) => {
  modal.classList.add('is-closing');

  modal.addEventListener(
    'animationend',
    () => {
      modal.classList.remove('is-closing');
      modal.close();
      document.documentElement.classList.remove('has-open-modal');
    },
    { once: true }
  );
};

/**
 * Toggle modal
 */
const modalToggle = (event) => {
  const trigger = event.currentTarget;
  const isLink = trigger.hasAttribute('href');
  const win = trigger.getAttribute('data-window');
  const modal = document.getElementById(win);
  const doc = document.documentElement;

  // Open Modal
  modal.showModal();

  if (isLink) {
    getExternalContent(event);
  }

  doc.classList.add('has-open-modal');

  toggleTitleStyle(
    modal.querySelector('.modal[open] > header'),
    '.modal[open]'
  );

  /* The dialog element will handle the escape key for us
  but not wait for the end of the animation and will not remove
  the `has-open-modal` body class */
  document.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key === 'Escape' && modal.hasAttribute('open')) {
      closeModal(modal);
    }
  });

  // Close with outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
};

// Close with 'Cancel' and 'X' buttons
document.getElementsByClassName('js-close-modal').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const modal = event.currentTarget.closest('.modal');
    closeModal(modal);
  });
});

// Set listeners on modal openers
document.getElementsByClassName('js-open-modal').forEach((elem) => {
  elem.addEventListener('click', (event) => {
    modalToggle(event);
  });
});
