// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Dominio público: lo usan la imagen OG y la URL canónica
  site: 'https://holy-mochi.vercel.app',
  vite: { plugins: [tailwindcss()] },
});
