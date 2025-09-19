/**
 * Query DOM elements by selector.
 * @param {string} selector
 * @param {boolean} [all=false]
 * @param {Document|Element} [root=document]
 * @returns {Element|NodeList|null}
 */
export const $ = (selector, all = false, root = document) =>
  all ? root.querySelectorAll(selector) : root.querySelector(selector);

/**
 * Create element with optional class and content.
 * @param {string} tag
 * @param {string|string[]} [className]
 * @param {string|Node} [content]
 * @returns {HTMLElement}
 */
export const createEl = (tag, className, content) => {
  const el = document.createElement(tag);

  if (className) {
    if (Array.isArray(className)) {
      el.classList.add(...className);
    } else {
      el.classList.add(className);
    }
  }

  if (content !== undefined && content !== null) {
    if (typeof content === 'string') {
      el.textContent = content;
    } else {
      el.append(content);
    }
  }

  return el;
};

/**
 * Set or remove attribute on element.
 * @param {Element} el
 * @param {string} attr
 * @param {string|boolean|null|undefined} value
 */
export const setAttr = (el, attr, value) => {
  if (!el) return;
  if (value === false || value === null || value === undefined) {
    el.removeAttribute(attr);
    return;
  }
  el.setAttribute(attr, String(value));
};

/**
 * Add one or more classes to an element.
 * @param {Element} el
 * @param {string|string[]} classes
 */
export const addClass = (el, classes) => {
  if (!el) return;
  if (Array.isArray(classes)) {
    el.classList.add(...classes);
  } else {
    el.classList.add(classes);
  }
};

/**
 * Remove one or more classes from an element.
 * @param {Element} el
 * @param {string|string[]} classes
 */
export const removeClass = (el, classes) => {
  if (!el) return;
  if (Array.isArray(classes)) {
    el.classList.remove(...classes);
  } else {
    el.classList.remove(classes);
  }
};

/**
 * Toggle a class on an element.
 * @param {Element} el
 * @param {string} className
 * @param {boolean} [force]
 */
export const toggleClass = (el, className, force) => {
  if (!el) return;
  el.classList.toggle(className, force);
};
