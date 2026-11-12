# Holy Mochi · DESIGN.md

Mochis dulces y picantes con retos. Tono: juguetón, descarado, japonés-pop.
Todo es blando, con contorno grueso y sombra dura, como si se pudiera apretar.
No hay modo oscuro: la marca vive en bloques de color plano (sin secciones
oscuras, todo en pastel).

## Color

Regla de oro: **texto siempre en tinta sobre fondos pastel**. Nunca texto claro
sobre rojo o naranja. El violeta (tinta) es para texto, contornos y sombras,
no para fondos grandes.

| Token           | Valor     | Rol |
|-----------------|-----------|-----|
| `arroz`         | `#FFF8F0` | Fondo base, navbar |
| `blanco`        | `#FFFFFF` | Tarjetas y chips sobre pastel |
| `tinta`         | `#3A1F3D` | Texto, contornos 3px, sombras duras |
| `chile-texto`   | `#B3101A` | Texto rojo (logo, "Picantes", nivel 4). 6:1 sobre pastel |
| `chile`/`fuego` | `#D7141F` / `#FF6A00` | Solo llamas e ilustración, nunca fondo de texto |
| `oro`           | `#FFC107` | Botón de pedido |
| `fresa`         | `#FFD6E2` | Sabor fresa, marquesina, pie |
| `fresa-fuerte`  | `#FF9DBB` | Botón principal del hero |
| `pina`          | `#FFF1A8` | Sabor piña, hero, FAQ abierta |
| `parchita`      | `#E3F2C1` | Sabor parchita, sección de preguntas |
| `mango`         | `#FFCF9E` | Sabor mango, sección de retos |
| `tabasco`       | `#FFB4A6` | Sabor tabasco (nivel 3) |
| `cayena`        | `#FF9D8C` | Sabor cayena (nivel 4) |
| `cielo`         | `#D4E6FF` | Sección Nosotros (contraste frío) |

Contraste: tinta sobre cualquier pastel ≥ 7:1.

### Patrones

- `bg-lunares`: puntos de tinta al 14% (hero y pie).
- `bg-ichimatsu`: damero japonés en fresa al 20% (sabores).
- `bg-rayas`: rayas diagonales blancas al 38% (retos).

## Tipografía

- **Bagel Fat One** 400 en toda la página: títulos, texto, botones y juegos.
  Una sola familia y un solo peso (`font-synthesis: none`, sin negritas falsas).
  El texto corrido lleva interlineado 1.6 y tracking .012em para leerse bien.

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

- Contorno: `3px solid tinta` en todo lo interactivo y las tarjetas.
- Radio: `pill` 999px (botones, chips) · `xl` 32px (tarjetas) · `blob` radios
  asimétricos (muestras de color, burbujas).
- Sombra dura: `sm` 3px 3px 0 tinta · `md` 6px 6px 0 tinta. Sin desenfoque, nunca.
- Hover "squish": `scale(1.06,.92) translateY(3px)` en botones; tarjetas giran -1.5°.

## Componentes

- **Botón primario**: fondo fresa-fuerte u oro, texto tinta. Pill, contorno 3px, sombra md.
  Foco: contorno tinta 3px con separación de 4px.
  Deshabilitado: opacidad .5, sin sombra.
- **Botón secundario**: fondo arroz, texto tinta, mismo contorno y sombra.
- **Enlace quieto**: texto subrayado 2px, offset 4px.
- **Tarjeta**: pastel del sabor o blanco, contorno 3px, radio xl, sombra md.
- **Medidor de picante**: 1–4 llamas (svg `#llama`), siempre con texto alternativo "Picante n de 4".
- **FAQ**: `<details>` con contorno, el "+" rota a "×"; abierto = fondo piña.
- **Navegación**: barra arroz pegajosa con borde tinta, mascota nivel 1 junto al logo en chile-texto.
- **Mascota acompañante**: fija abajo a la derecha, cambia de nivel con el scroll
  (IntersectionObserver en `src/scripts/acompanante.ts`, cada sección declara `data-nivel`).
  En móvil se oculta el globo de texto para no tapar contenido.

## Imagen e iconos

- Sin fotos de stock. La mascota (4 niveles: Suave, Picante, Muy picante, Súper picante)
  es el sistema de ilustración. Fotos reales de producto: `[FOTO]` hasta tenerlas.
- Único icono propio: la llama. Nada de emojis como iconos.
- Kanji decorativos (米 苺 抹茶 金 藍 墨 朱 炎) solo como detalle, nunca como información.

## Movimiento

- **Personajes que caminan** (`data-camina="izq|der"`): entran desde el borde de
  la página dando saltos (se estiran en el aire, se aplastan al aterrizar) y
  rematan con un rebote. Lo calcula `src/scripts/entradas.ts` con la distancia real.
- **Títulos, tarjetas y botones**: caen y rebotan con aplastar y estirar,
  escalonados entre hermanos. **Párrafos**: suben suave.
- **Mascotas**: respiran, tiemblan, gotean, echan humo y ríen según su nivel.
- **Ruleta**: 5 vueltas con frenada; cartas que se reparten y giran en 3D;
  cajas que tiemblan y sueltan la tapa.
- Con `prefers-reduced-motion: reduce` no hay entradas y todo aparece en su sitio.

## Ruleta del reto

Tres minijuegos (`src/scripts/ruleta.ts`), cada uno termina en un sabor concreto
y un botón "Compartir mi resultado" (menú nativo o copiar). La ruleta aparece sola y
centrada; al elegir juego sale con un salto y entra el escenario con "Volver a la ruleta".
Canvas, tablero y cajas se dimensionan con `100svh` para caber en la pantalla:

1. **Atrapa el mochi**: 20 s, bandeja con dedo, ratón o flechas. Los picantes valen más.
2. **Memoria picante**: 6 parejas; la primera pareja es tu sabor estrella.
3. **Caja de la suerte**: 3 cajas; sale un sabor y un mini reto.

## Mochis por sabor

`src/data/mochis.ts` define un mochi por sabor. Los dulces **son** la fruta, no la llevan encima:

- **Fresa**: cuerpo rojo fresa con semillas amarillas y cáliz de hojas verdes.
- **Piña**: cuerpo amarillo con rombos y corona de hojas.
- **Parchita**: piel dorada con pintitas, tallo con hoja y un mordisco que enseña la pulpa con semillas.
- **Mango**: piel en degradado verde → amarillo → rojo, brillo, tallo y hoja.
- **Tabasco**: coral, sudando, con el ají encima.
- **Cayena**: el mochi demonio (la mascota de nivel 4).

Se usan en la carta, la memoria, el canvas de Atrapa el mochi, la caja de la suerte y los
resultados. Las mascotas de nivel (m1–m4) siguen para los niveles y la acompañante.

## Acompañante

Comentarios sarcásticos por sección en `src/scripts/acompanante.ts` (`COMENTARIOS`).
El globo dura según el largo del chiste y cambia cada ~10 s.

## Imagen para compartir

`public/og.png` (1200×630) se genera con `npm run og`. El dominio está en `site`
de `astro.config.mjs` (https://holy-mochi.vercel.app).
