// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://holymochi.example',
  vite: { plugins: [tailwindcss()] },
});
