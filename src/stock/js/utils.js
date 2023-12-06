/* Set scrollbar width variables to calculate full bleed width to avoid
horizontal overflow. Change .is-full-bleed width to
calc(100vw - var(--scrollbar-width)) */
document.documentElement.style.setProperty(
  '--scrollbar-width',
  `${window.innerWidth - document.documentElement.clientWidth}px`
);
