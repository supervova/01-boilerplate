# Base markup

Use this folder for the base page markup: the `head` section, the shared `body` layout, mixins, macros, and template variables. For example:

```njk
{# src/app/base/markup/base.njk #}
{% import "base/markup/config.njk" as config %}

{% set lang = page.lang if page and page.lang is defined else config.site.lang %}
{% set bodyClasses = page.bodyClasses if page and page.bodyClasses is defined else '' %}

<!DOCTYPE html>
<html lang="{{ lang }}" prefix="og: http://ogp.me/ns#">
  <head>
    {% block head %}
      {% include "base/markup/head.njk" %}
    {% endblock %}
  </head>
  <body class="{{ bodyClasses }}">
    {% block bodyPrefix %}
      {# Uncomment if needed #}
      {# {% include "components/alert/alert.njk" %} #}
    {% endblock %}

    {% block header %}
      {% include "components/header/header.njk" %}
    {% endblock %}

    {# CONTENT -------------------------------------------------------------- #}
    {% block content %}
    {% endblock %}

    {% block footer %}
      {% include "components/footer/footer.njk" %}
    {% endblock %}

    {% block bodySuffix %}
      {% include "base/markup/body-suffix.njk" %}
    {% endblock %}
  </body>
</html>
```
