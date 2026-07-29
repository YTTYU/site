# Sanity — подключение (когда будете готовы)

Сейчас сайт не подключён к Sanity: весь текст лежит в `src/content/data/copy.ts`
и `src/content/data/contacts.ts`, а схемы здесь уже описывают ту же структуру
— так что перевод на реальный CMS-бэкенд не потребует переписывать вёрстку.

## Шаги подключения

1. Создайте проект на [sanity.io](https://www.sanity.io/) (бесплатный план
   достаточен для старта):
   ```bash
   npx sanity login
   npx sanity init
   ```
   При инициализации укажите этот же репозиторий (или создайте отдельную папку
   для Studio — `sanity.config.ts` и `sanity/schemaTypes` уже готовы в корне
   проекта `site/`).

2. Пропишите переменные окружения в `.env` (не коммитить в git):
   ```
   SANITY_PROJECT_ID=ваш_project_id
   SANITY_DATASET=production
   ```

3. Запустите Studio локально, чтобы наполнить контент:
   ```bash
   npx sanity dev
   ```
   Откроется на `http://localhost:3333` — там создаются документы `section`,
   `comparisonCategory`, `configItem`, `heroSettings`, `contactSettings`.

4. В коде: замените импорты из `src/content/data/copy.ts` на вызовы
   `getSection('...')` из `src/lib/sanity.ts` (см. комментарий в файле —
   `isSanityConfigured` включится автоматически, как только появится
   `SANITY_PROJECT_ID`).

5. Изображения — поле `image` в Sanity возвращает ссылку на CDN Sanity;
   можно передавать её напрямую в `astro:assets` `<Image>` как remote-источник
   (см. `image.domains` в `astro.config.mjs` — туда нужно будет добавить
   `cdn.sanity.io`).

## Соответствие схем и текущего контента

| Sanity-документ       | Сейчас в коде                                                        |
| ---------------------- | --------------------------------------------------------------------- |
| `heroSettings`         | `src/content/data/copy.ts` → `hero`                                  |
| `section`               | `advantage`, `platformIntro`, `construction`, `tracks`, `handling`, `amphibious`, `transmission`, `cargo`, `transport`, `ergonomics`, `maintenance` |
| `comparisonCategory`   | `positioning.categories` + `positioning.jagger`                      |
| `configItem`           | `platformVariants.variants` + `equipment.attachments`                |
| `contactSettings`      | `src/content/data/contacts.ts`                                       |
