import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSettings',
  title: 'Hero (главный экран)',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({ name: 'kicker', title: 'Надстрочный текст', type: 'string' }),
    defineField({ name: 'model', title: 'Название модели (крупный текст)', type: 'string' }),
    defineField({ name: 'title', title: 'Заголовок', type: 'string' }),
    defineField({ name: 'titleSub', title: 'Подзаголовок', type: 'string' }),
    defineField({ name: 'poster', title: 'Постер-изображение', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'video', title: 'Видео (фон)', type: 'file', options: { accept: 'video/mp4,video/webm' } }),
  ],
});
