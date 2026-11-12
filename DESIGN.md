# Holy Mochi · DESIGN.md

Mochis dulces y picantes con retos. Tono: juguetón, descarado, japonés-pop.
Todo es blando, con contorno grueso y sombra dura, como si se pudiera apretar.
No hay modo oscuro: la marca vive en bloques de color plano (el fondo "Sésamo"
ya hace de sección oscura).

## Color

| Token        | Valor     | Rol |
|--------------|-----------|-----|
| `arroz`      | `#FFF8F0` | Fondo principal, texto sobre fondos oscuros |
| `sesamo`     | `#3A1F3D` | Texto, contornos, sombras duras, secciones oscuras |
| `chile`      | `#D7141F` | Primario: hero, botón principal sobre claro, acento picante |
| `oro`        | `#FFC107` | Botón principal sobre oscuro/rojo, halo, foco |
| `fuego`      | `#FF6A00` | Retos y llamas (solo donde hay picante) |
| `anil`       | `#26359A` | Contraste frío: sección About/FAQ, títulos "Clásicos" |
| `fresa`      | `#FF5C93` | Mejillas, dulzura, fondo de tarjetas suaves |
| `matcha`     | `#4DAA4F` | Solo decorativo (sabor matcha). Nunca texto |
| `chile-dark` | `#8A0E18` | Bocas/sombras internas de la mascota |

Contraste comprobado: sésamo/arroz 15:1 · arroz/chile 7:1 · arroz/añil 9.9:1 ·
sésamo/fuego 5:1 · sésamo/fresa 5:1 · sésamo/oro 9:1. Sésamo sobre chile NO (2.1:1).

Regla: el fuego y las llamas animadas aparecen solo donde hay reto o picante.

## Tipografía

- Display: **Bagel Fat One** 400 — títulos, números, precios grandes, marquesina.
- Texto: **Figtree** 400 / 600 / 700.

| Paso   | Tamaño                    | Interlineado | Uso |
|--------|---------------------------|--------------|-----|
| `hero` | clamp(48px, 9vw, 112px)   | 0.95         | H1 |
| `h2`   | clamp(40px, 6vw, 76px)    | 1.0          | Títulos de sección |
| `h3`   | 28px                      | 1.05         | Tarjetas, productos |
| `lead` | clamp(18px, 2.2vw, 22px)  | 1.5          | Entradilla |
| `body` | 17px                      | 1.55         | Texto |
| `sm`   | 15px                      | 1.4          | Etiquetas, notas |

Línea máx. ~32em en párrafos.

## Espaciado

Escala de 4px (Tailwind por defecto). Secciones: `clamp(64px, 10vw, 128px)` vertical,
`clamp(20px, 5vw, 72px)` lateral. Ancho de contenido 1140px; texto 680px.

## Forma y profundidad

- Contorno: `3px solid sesamo` en todo lo interactivo y las tarjetas.
- Radio: `pill` 999px (botones, chips) · `xl` 32px (tarjetas) · `blob` radios
  asimétricos (muestras de color, burbujas).
- Sombra dura: `sm` 3px 3px 0 sesamo · `md` 6px 6px 0 sesamo. Sin desenfoque, nunca.
- Hover "squish": `scale(1.06,.92) translateY(3px)` en botones; tarjetas giran -1.5°.

## Componentes

- **Botón primario**: fondo chile, texto arroz (sobre claro) u oro + texto sésamo
  (sobre rojo/oscuro). Pill, contorno 3px, sombra md. Foco: anillo oro 4px + halo sésamo.
  Deshabilitado: opacidad .5, sin sombra.
- **Botón secundario**: fondo arroz, texto sésamo, mismo contorno y sombra.
- **Enlace quieto**: texto subrayado 2px, offset 4px.
- **Tarjeta**: arroz, contorno 3px, radio xl, sombra md.
- **Medidor de picante**: 1–4 llamas (svg `#fl`), siempre con texto alternativo "Picante n de 4".
- **FAQ**: `<details>` con contorno, el "+" rota a "×"; abierto = fondo oro.
- **Navegación**: barra sésamo pegajosa, logo en oro, enlaces arroz.
- **Mascota acompañante**: fija abajo a la derecha, cambia de nivel con el scroll
  (scroll-driven animations; en navegadores sin soporte se queda en nivel 1).

## Imagen e iconos

- Sin fotos de stock. La mascota (4 niveles: Suave, Picante, Muy picante, Súper picante)
  es el sistema de ilustración. Fotos reales de producto: `[FOTO]` hasta tenerlas.
- Único icono propio: la llama. Nada de emojis como iconos.
- Kanji decorativos (米 苺 抹茶 金 藍 墨 朱 炎) solo como detalle, nunca como información.

## Movimiento

Respiración, temblor, goteo, humo y llamas. Todo se apaga con
`prefers-reduced-motion: reduce`.
