# Использование PurgeCSS

## Vite

Vite «под капотом» использует PostCSS. Постпроцессор можно настроить в файле `vite.config.js` через опцию `css.postcss`.

### 1. Установите плагин

```sh
npm i -D postcss @fullhuman/postcss-purgecss
```

### 2. Настройте `vite.config.js`

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
  plugins: [
    react(),
    // Другие плагины Vite...
  ],
  css: {
    postcss: {
      plugins: [
        // Другие плагины PostCSS, если они есть...

        // Добавляем PurgeCSS только для продакшн-сборки
        ...(process.env.NODE_ENV === 'production' ? [
          purgecss({
            // Указываем все файлы, где могут быть использованы CSS-классы
            content: [
              './index.html',
              './src/**/*.{js,ts,jsx,tsx}', // Включаем все JS/TS/JSX файлы в папке src
            ],
            // Очень важно для React!
            // Добавьте сюда классы, которые генерируются динамически
            // или приходят из библиотек, чтобы PurgeCSS их не удалил.
            safelist: {
              // Например, если вы используете классы с определенным паттерном
              // deep: [/--active$/]
              // Или классы из библиотеки компонентов (пример для Ant Design)
              // deep: [/ant-/]
            },
            variables: true, // Сохраняет CSS-переменные
          }),
        ] : []),
      ],
    },
  },
});
```

### Не забывайте простые правила

- PurgeCSS не работает на dev-сервере — только в процессе prod-сборки (vite build).
- Настройка `safelist`. Если ваше приложение генерирует CSS-классы динамически (например, в зависимости от пропсов или состояний), необходимо добавить их в `safelist` в конфигурации плагина, чтобы PurgeCSS их не удалил.
- Указание путей: Для корректной работы важно правильно указать пути к файлам, где используются ваши стили (content или paths в конфигурации), чтобы плагин мог их проанализировать.
