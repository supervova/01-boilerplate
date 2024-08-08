# Рейтинг

## Read only

```pug
figure.rating(style=`--rating: ${rating};`)
  span.rating__points
  figcaption.rating__count(title=`${count} голосов`) 233
```

## Кликабельный

```pug
.rating.is-input
  button.rating__point ☆
  button.rating__point ☆
  button.rating__point ☆
  button.rating__point ☆
  button.rating__point ★
```

Рейтинг в дизайн-системах:

- [UI Guidelines](https://www.uiguideline.com/components/rating)
- [Microsoft Fluent](https://developer.microsoft.com/en-us/fluentui#/controls/web/rating)
- [Adobe Spectrum](https://opensource.adobe.com/spectrum-css/rating.html)
- [Cedar of Recreational Equipment, Inc. (REI)](https://rei.github.io/rei-cedar-docs/components/rating/)
- [Attlassian](https://atlaskit.atlassian.com/packages/design-system/rating)
