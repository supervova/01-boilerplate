# Pricing Table

```pug
form
  fieldset.grid.is-plans
    .plan
      label.plan__radio(tabindex='0')
        input(name='plan' type='radio')
        span.sr-only Basic plan - $0 per month, 1 team member, 100 GB per month, 1 concurrent build
      header.plan__header(aria-hidden='true')
        h3.plan__type Basic
        span.plan__price
          | $0
          small
            | /
            abbr(title='month') mo
      ul.plan__body(aria-hidden='true')
        li 1 team member
        li 100 GB/mo
        li 1 concurrent build
    //- Other plans
  button(type='submit') Sign Up
```
