import { defineType, defineField } from 'sanity';

// Covers the "positioning" section: the 3 competitor categories plus the
// highlighted Jagger card, each with its own bullet list.
export default defineType({
  name: 'comparisonCategory',
  title: 'Категория сравнения (позиционирование)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Заголовок категории', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'isJagger', title: 'Это карточка Jagger (выделенная)?', type: 'boolean', initialValue: false }),
    defineField({ name: 'subtitle', title: 'Подзаголовок', type: 'string' }),
    defineField({
      name: 'bullets',
      title: 'Пункты',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'order', title: 'Порядок', type: 'number' }),
  ],
});
