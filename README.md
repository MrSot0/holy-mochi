# Holy Mochi

Landing de Holy Mochi: mochis dulces y picantes con retos.
Astro + Tailwind CSS 4 + TypeScript. El sistema de diseño está en [`DESIGN.md`](DESIGN.md).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + build estático en dist/
```

## Dónde se edita el contenido

- `src/data/site.ts`: ciudad, Instagram, hashtag, premio e historia.
- `src/data/menu.ts`: sabores, precios, retos y preguntas frecuentes.
- `src/data/mochis.ts`: el dibujo de cada mochi de sabor.
- `src/scripts/acompanante.ts`: los comentarios de la mascota.
- `npm run og`: regenera la imagen para redes (`public/og.png`).
- `astro.config.mjs`: dominio público en `site` (https://holy-mochi.vercel.app).

Todo lo que aparece entre `[CORCHETES]` es un dato pendiente.
