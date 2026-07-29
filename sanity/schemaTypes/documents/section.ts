import { defineType, defineField } from 'sanity';

// Generic reusable shape covering every prose section on the page (advantage,
// platformIntro, construction, tracks, handling, amphibious, transmission,
// cargo, transport, ergonomics, maintenance, ...). `sectionId` must match the
// id used in src/content/data/copy.ts / EngineeringHub.astro anchors so the
// Astro fetch layer can key off it without changing template code.
export default defineType({
  name: 'section',
  title: 'Секция страницы',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionId',
      title: 'ID секции',
      type: 'string',
      description: 'Технический идентификатор, напр. "construction", "tracks", "amphibious"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'navLabel', title: 'Название в навигации', type: 'string' }),
    defineField({ name: 'kicker', title: 'Надстрочный ярлык', type: 'string' }),
    defineField({ name: 'title', title: 'Заголовок', type: 'string' }),
    defineField({ name: 'lead', title: 'Вводный абзац', type: 'text' }),
    defineField({
      name: 'body',
      title: 'Текст (абзацы)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'bulletLists',
      title: 'Списки пунктов',
      type: 'array',
      of: [{ type: 'bulletList' }],
    }),
    defineField({
      name: 'media',
      title: 'Изображения',
      type: 'array',
      of: [{ type: 'sectionMedia' }],
    }),
    defineField({ name: 'order', title: 'Порядок на странице', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'sectionId' },
  },
});
