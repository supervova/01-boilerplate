import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
import {
  $,
  createEl,
  setAttr,
  addClass,
  removeClass,
  toggleClass,
} from './dom-utils.js';

const originalDocument = globalThis.document;

const createStubElement = (tag) => {
  const attributes = new Map();
  const classes = new Set();
  const children = [];

  return {
    tagName: tag.toUpperCase(),
    textContent: '',
    dataset: {},
    classList: {
      add: (...tokens) => {
        tokens.forEach((token) => classes.add(token));
      },
      remove: (...tokens) => {
        tokens.forEach((token) => classes.delete(token));
      },
      toggle: (token, force) => {
        if (force === undefined) {
          if (classes.has(token)) {
            classes.delete(token);
            return false;
          }
          classes.add(token);
          return true;
        }
        if (force) {
          classes.add(token);
          return true;
        }
        classes.delete(token);
        return false;
      },
      contains: (token) => classes.has(token),
    },
    setAttribute: (name, value) => {
      attributes.set(name, String(value));
    },
    removeAttribute: (name) => {
      attributes.delete(name);
    },
    getAttribute: (name) => attributes.get(name) ?? null,
    hasAttribute: (name) => attributes.has(name),
    append: (node) => {
      children.push(node);
    },
    _attrs: attributes,
    _classes: classes,
    _children: children,
  };
};

describe('dom-utils', () => {
  afterAll(() => {
    globalThis.document = originalDocument;
  });

  beforeEach(() => {
    const stubDocument = {
      querySelector: vi.fn(),
      querySelectorAll: vi.fn(),
      createElement: vi.fn((tag) => createStubElement(tag)),
    };

    const button = createStubElement('button');
    button.dataset.role = 'action';
    const hint = createStubElement('span');
    hint.textContent = 'Hint';

    stubDocument.querySelector.mockReturnValue(button);
    stubDocument.querySelectorAll.mockReturnValue([hint]);

    globalThis.document = stubDocument;
  });

  it('selects a single element by default', () => {
    const button = $('.btn');
    expect(button?.dataset.role).toBe('action');
    expect(document.querySelector).toHaveBeenCalledWith('.btn');
  });

  it('selects all matching elements when all=true', () => {
    const result = $('.hint', true);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(document.querySelectorAll).toHaveBeenCalledWith('.hint');
  });

  it('creates elements with classes and text', () => {
    const el = createEl('div', ['alpha', 'beta'], 'Hello');
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('alpha')).toBe(true);
    expect(el.classList.contains('beta')).toBe(true);
    expect(el.textContent).toBe('Hello');
  });

  it('sets and removes attributes via setAttr', () => {
    const el = createEl('button');
    setAttr(el, 'data-state', 'active');
    expect(el.getAttribute('data-state')).toBe('active');

    setAttr(el, 'data-state', null);
    expect(el.hasAttribute('data-state')).toBe(false);
  });

  it('adds, removes and toggles classes', () => {
    const el = createEl('button');
    addClass(el, ['primary', 'large']);
    expect(el.classList.contains('primary')).toBe(true);
    expect(el.classList.contains('large')).toBe(true);

    removeClass(el, 'large');
    expect(el.classList.contains('large')).toBe(false);

    toggleClass(el, 'hidden', true);
    expect(el.classList.contains('hidden')).toBe(true);

    toggleClass(el, 'hidden');
    expect(el.classList.contains('hidden')).toBe(false);
  });
});
