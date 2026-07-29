// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  image: {
    // AVIF/WebP responsive generation via astro:assets (sharp)
    domains: [],
  },
  prefetch: true,
});
