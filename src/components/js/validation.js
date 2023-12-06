/**
 * -----------------------------------------------------------------------------
 * FORM VALIDATION
 * -----------------------------------------------------------------------------
 * Add the novalidate attribute to the <form>.
 */

/* TODO:
- make validateForms(form){} function and call it to avoid double checking and
the nested forEach()'es
- set and remove aria-invalid='true' */

(() => {
  const forms = document.querySelector('[novalidate]');

  if (forms) {
    forms.forEach((form) => {
      const inputs = form.querySelectorAll(':required, [pattern]');
      const button = form.querySelector('[type="submit"]');

      /**
       * Add and remove .has-error to multi-inputs rows
       * @param {object} el is checked input
       */
      const checkRow = (el) => {
        const row = el.closest('.grid');
        if (row) {
          if (!el.checkValidity()) {
            row.classList.add('has-error');
          } else {
            row.classList.remove('has-error');
          }
        }
      };

      // Add and remove validation classes on blur
      inputs.forEach((input) => {
        input.addEventListener('blur', () => {
          // add .is-touched on input
          input.classList.add('is-touched');

          // SERVER-SIDE: remove the class added at the server validation stage
          // input.classList.remove('is-invalid');

          checkRow(input);

          // SERVER-SIDE: remove validation class after fix attempt
          // const errorRow = input.closest('input.has-error');

          // if (errorRow) {
          //   errorRow.classList.remove('has-error');
          // }
        });
      });

      // Disabling form submissions if there are invalid fields
      form.addEventListener(
        'submit',
        (event) => {
          // Prevent invalid form submission
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            button.classList.add('has-spinner');
            button.disabled = true;
          }

          // Use it to check required fields on submit
          form.classList.add('has-been-validated');
        },
        false
      );
    });
  }
})();
