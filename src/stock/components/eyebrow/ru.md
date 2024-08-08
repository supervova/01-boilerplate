# Надзаголовок

## Markup

Use (p|a).eyebrow, h1-h2, and p.subtitle within header or hgroup.

⚠️ Don't use additional semantic information via ARIA (`aria-roledescription`) as it may well end up being unwanted noise for users.

⚠️ role="doc-subtitle" is not supported by most screen readers

```pug
hgroup(role='group')
  p.eyebrow Chapter 2
  h1 The Battle
  p.subtitle Once more unto the breach
```

```pug
header.hero
  a.hero__eyebrow(href='/chapter-2') Chapter 2
  h1.hero__title The Battle
  p.hero__subtitle Once more unto the breach
```
