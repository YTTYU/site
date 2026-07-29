import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionMedia',
  title: 'Изображение',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Файл', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Альтернативный текст', type: 'string' }),
    defineField({ name: 'caption', title: 'Подпись', type: 'string' }),
  ],
});
