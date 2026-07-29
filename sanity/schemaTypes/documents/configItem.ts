import { defineType, defineField } from 'sanity';

// Covers both the body-style switcher in "Варианты исполнения" (single /
// double / box cab) and the attachment cards in "Дополнительное
// оборудование" (drilling rig, tent cover, ...) — same shape, different group.
export default defineType({
  name: 'configItem',
  title: 'Вариант исполнения / навесное оборудование',
  type: 'document',
  fields: [
    defineField({
      name: 'group',
      title: 'Группа',
      type: 'string',
      options: { list: [{ title: 'Варианты исполнения', value: 'platform' }, { title: 'Доп. оборудование', value: 'equipment' }] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'key', title: 'Ключ (техн.)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'label', title: 'Название', type: 'string' }),
    defineField({ name: 'image', title: 'Изображение', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Порядок', type: 'number' }),
  ],
});
