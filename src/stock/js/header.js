import throttle from './throttle.js';

(() => {
  /**
   * ---------------------------------------------------------------------------
   * TOGGLE HEADER STICKY CLASS BASED ON SCROLL POSITION
   * ---------------------------------------------------------------------------
   */
  let scrollPos = window.scrollY;
  const header = document.getElementById('header');
  const pointOfChange = 57;

  const addClassOnScroll = () => header.classList.add('is-sticky');
  const removeClassOnScroll = () => header.classList.remove('is-sticky');

  function toggleHeaderSticky() {
    scrollPos = window.scrollY;

    if (scrollPos >= pointOfChange) {
      addClassOnScroll();
    } else {
      removeClassOnScroll();
    }
  }

  window.addEventListener('scroll', throttle(toggleHeaderSticky, 1000));
})();
