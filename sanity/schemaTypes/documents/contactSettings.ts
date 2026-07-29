import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactSettings',
  title: 'Контакты',
  type: 'document',
  fields: [
    defineField({ name: 'phone', title: 'Телефон (отображаемый)', type: 'string' }),
    defineField({ name: 'phoneHref', title: 'Телефон (tel: ссылка)', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'city', title: 'Город / производство', type: 'string' }),
    defineField({ name: 'telegram', title: 'Telegram', type: 'url' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp', type: 'url' }),
    defineField({ name: 'vk', title: 'VK', type: 'url' }),
  ],
});
