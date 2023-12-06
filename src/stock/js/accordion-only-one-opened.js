// Accordion that allows only one open at a time
const summaries = document.querySelectorAll(
  'accordion.is-only-one-opened summary'
);

function closeOpenedDetails() {
  summaries.forEach((summary) => {
    const detail = summary.parentNode;
    if (detail !== this.parentNode) {
      detail.removeAttribute('open');
    }
  });
}

summaries.forEach((summary) => {
  summary.addEventListener('click', closeOpenedDetails);
});
