import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'bulletList',
  title: 'Список пунктов',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок списка', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Пункты',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
