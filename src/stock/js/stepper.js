(() => {
  /**
   * Update stepper value
   *
   * @param {object} event It's click on stepper button
   */
  function setStepperValue(event) {
    const button = event.target;
    const input = button.closest('.stepper').querySelector('.stepper__value');
    const min = input.getAttribute('min');
    const max = input.getAttribute('max');
    const step = input.getAttribute('step');
    const val = input.getAttribute('value');
    const calcStep = button.classList.contains('is-increment')
      ? step * 1
      : step * -1;
    const newValue = parseInt(val, 10) + calcStep;

    if (newValue >= min && newValue <= max) {
      input.setAttribute('value', newValue);
    }
  }

  // Event listeners
  const buttons = document.querySelectorAll('.stepper__button');

  buttons.forEach((button) => {
    button.addEventListener('click', setStepperValue);
  });
})();
