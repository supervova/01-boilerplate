# Hero

It's full width banner, which can optionally cover the full height of the page as well.

Hero component can include a title, a description, an illustration and an action button.

```pug
//- Use header, section or div(role='region')
header.hero
  .hero__content
    h1.hero__title Lorem ipsum
    p.hero__subtitle Dolor, sit amet
    a.button(href='#') Primary Button
```

## ✅  When to use

- To catch user’s attention.
- Usually the first thing user sees, making it a great place to explain what the page is about and to display a call-to-action.
- To highlight insurance plan details and primary actions.

## 🛑  When not to use

When you need to display long chunks of text.

## Default and modifiers

**Default hero** component uses dark background with negative text on top. Most commonly used in our self service portal.

## Additional considerations

- The height of the hero is determined by the amount of text within it.
- When using “image” variation of Hero the required image size is 768x1024px for phones and 1920x1080px for larger screens (16:9 ratio).
- When using images in Hero, try to always keep the image file size below 250Kb.

Additional docs: [The Component Gallery](https://component.gallery/components/hero/) (excluded Bulma and Duet), [Material Design](https://material.io/design/communication/imagery.html#hero-images)
