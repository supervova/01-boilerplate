// Get external content, utilities
import './components/js/modal';

// Close popovers on Esc
import initPopovers from './components/js/popover';

// Adaptive navigation with overflow menu
import './stock/js/navbar-adaptive-h';

// Toggle search form on mobiles
// import './components/js/header';

document.addEventListener('DOMContentLoaded', () => {
  initPopovers();
});
