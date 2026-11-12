// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Cambia esto por el dominio real: lo usan la imagen OG y la URL canónica
  site: 'https://holymochi.example',
  vite: { plugins: [tailwindcss()] },
});
