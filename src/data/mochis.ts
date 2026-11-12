/**
 * Un mochi por sabor: cuerpo del color de su fruta y la fruta encima.
 * El mismo SVG se usa en el sprite (con animación CSS) y en el canvas del juego.
 */
export type SaborId = 'fresa' | 'pina' | 'parchita' | 'mango' | 'tabasco' | 'cayena';

const T = '#3A1F3D'; // tinta
const HOJA = '#4DAA4F';

const cuerpo = (relleno: string) =>
  `<path d="M30 192C30 117 70 82 120 82C170 82 210 117 210 192C210 222 190 237 120 237C50 237 30 222 30 192Z" fill="${relleno}" stroke="${T}" stroke-width="5"/>`;

const caraFeliz = (mejilla: string) =>
  `<circle cx="68" cy="187" r="16" fill="${mejilla}"/><circle cx="172" cy="187" r="16" fill="${mejilla}"/>` +
  `<ellipse cx="92" cy="162" rx="8" ry="11" fill="${T}"/><ellipse cx="148" cy="162" rx="8" ry="11" fill="${T}"/>` +
  `<circle cx="95" cy="158" r="3" fill="#fff"/><circle cx="151" cy="158" r="3" fill="#fff"/>` +
  `<path d="M108 184Q120 196 132 184" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>`;

const caraSudando =
  `<circle cx="68" cy="187" r="18" fill="#D7141F"/><circle cx="172" cy="187" r="18" fill="#D7141F"/>` +
  `<ellipse cx="92" cy="162" rx="9" ry="12" fill="${T}"/><ellipse cx="148" cy="162" rx="9" ry="12" fill="${T}"/>` +
  `<circle cx="95" cy="157" r="3.5" fill="#fff"/><circle cx="151" cy="157" r="3.5" fill="#fff"/>` +
  `<path d="M104 180Q120 212 136 180Z" fill="#8A0E18" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path class="dr" d="M196 118C188 132 188 140 196 146C204 140 204 132 196 118Z" fill="#2FA4F0"/>`;

const fresa =
  `<path d="M120 100C94 88 84 58 100 44C108 38 115 41 120 46C125 41 132 38 140 44C156 58 146 88 120 100Z" fill="#E8384F" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  [[108, 60], [130, 58], [119, 72], [104, 76], [135, 76], [120, 88]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.4" ry="3.4" fill="#FFE27A"/>`).join('') +
  `<path d="M100 44L112 46L120 30L128 46L140 44L132 54L108 54Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>`;

const pina =
  `<path d="M120 96C110 72 110 50 120 22C130 50 130 72 120 96Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M114 96C98 82 88 64 82 42C100 52 112 70 124 94Z" fill="#3D9440" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M126 96C142 82 152 64 158 42C140 52 128 70 116 94Z" fill="#3D9440" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  [[62, 132], [178, 132], [92, 112], [148, 112], [50, 168], [190, 168], [120, 106]].map(([x, y]) => `<path d="M${x - 6} ${y}l6-6 6 6-6 6z" fill="#F2B705"/>`).join('');

const parchita =
  `<path d="M140 46C148 34 162 32 170 38C162 48 150 50 140 46Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<circle cx="120" cy="70" r="30" fill="#F6D33C" stroke="${T}" stroke-width="4"/>` +
  `<circle cx="120" cy="70" r="21" fill="#FFA62B" stroke="${T}" stroke-width="3"/>` +
  [[112, 62], [126, 60], [118, 74], [131, 76], [108, 78], [122, 86], [134, 66]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="3.6" fill="${T}"/>`).join('');

const mango =
  `<path d="M100 76C96 54 116 38 138 46C154 54 150 80 130 92C116 100 104 92 100 76Z" fill="#FF9F2E" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<ellipse cx="114" cy="70" rx="10" ry="14" fill="#FF6A4D" opacity=".55"/>` +
  `<path d="M134 46C142 32 158 28 168 34C160 46 146 50 134 46Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>`;

const tabasco =
  `<path d="M116 98C106 78 110 54 126 44C134 40 140 46 136 54C126 66 126 82 126 98Z" fill="#D7141F" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M128 44C130 34 138 28 146 28" fill="none" stroke="${HOJA}" stroke-width="7" stroke-linecap="round"/>` +
  `<path d="M118 70C118 62 120 56 124 52" fill="none" stroke="#FF8A8A" stroke-width="4" stroke-linecap="round"/>`;

/** Cayena es el mochi demonio (la mascota en nivel 4) */
const demonio =
  `<g transform="translate(36,246) scale(1.4)"><g class="fl"><path d="M0 0C-12 -10 -10 -26 0 -44C10 -26 12 -10 0 0Z" fill="#FF6A00"/><path d="M0 0C-6 -6 -5 -16 0 -26C5 -16 6 -6 0 0Z" fill="#FFC107"/></g></g><g transform="translate(204,246) scale(1.4)"><g class="fl"><path d="M0 0C-12 -10 -10 -26 0 -44C10 -26 12 -10 0 0Z" fill="#FF6A00"/><path d="M0 0C-6 -6 -5 -16 0 -26C5 -16 6 -6 0 0Z" fill="#FFC107"/></g></g><path d="M58 118Q40 84 50 56Q78 72 92 100Z" fill="#FFC107" stroke="#3A1F3D" stroke-width="4" stroke-linejoin="round"/><path d="M182 118Q200 84 190 56Q162 72 148 100Z" fill="#FFC107" stroke="#3A1F3D" stroke-width="4" stroke-linejoin="round"/><ellipse class="hf" cx="120" cy="62" rx="44" ry="11" fill="none" stroke="#FF6A00" stroke-width="9" transform="rotate(-12 120 62)"/><path d="M30 192C30 117 70 82 120 82C170 82 210 117 210 192C210 222 190 237 120 237C50 237 30 222 30 192Z" fill="#D7141F" stroke="#3A1F3D" stroke-width="5"/><circle cx="66" cy="190" r="15" fill="#8A0E18"/><circle cx="174" cy="190" r="15" fill="#8A0E18"/><ellipse cx="92" cy="164" rx="12" ry="11" fill="#FFC107" stroke="#3A1F3D" stroke-width="3"/><ellipse cx="148" cy="164" rx="12" ry="11" fill="#FFC107" stroke="#3A1F3D" stroke-width="3"/><ellipse cx="92" cy="165" rx="3" ry="9" fill="#3A1F3D"/><ellipse cx="148" cy="165" rx="3" ry="9" fill="#3A1F3D"/><path d="M70 142L108 158M170 142L132 158" stroke="#3A1F3D" stroke-width="8" stroke-linecap="round"/><path d="M88 188Q120 226 152 188Q120 198 88 188Z" fill="#3A1F3D" stroke="#3A1F3D" stroke-width="3" stroke-linejoin="round"/><path d="M98 191L105 205L112 193Z M128 193L135 205L142 191Z" fill="#FFF8F0"/>`;

export const mochiSvg: Record<SaborId, string> = {
  fresa: cuerpo('#FFC2D4') + caraFeliz('#FF5C93') + fresa,
  pina: cuerpo('#FFE680') + caraFeliz('#FF9DBB') + pina,
  parchita: cuerpo('#D8EC9A') + caraFeliz('#FF9DBB') + parchita,
  mango: cuerpo('#FFC98A') + caraFeliz('#FF6A4D') + mango,
  tabasco: cuerpo('#FFA48C') + caraSudando + tabasco,
  cayena: demonio,
};

/** Clase de animación según el carácter del sabor */
export const animacionSabor: Record<SaborId, string> = {
  fresa: 'anim-respira',
  pina: 'anim-respira',
  parchita: 'anim-respira',
  mango: 'anim-respira',
  tabasco: 'anim-tiembla',
  cayena: 'anim-risa',
};

/** SVG completo e independiente (para dibujarlo en canvas) */
export const svgCompleto = (id: SaborId) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 280">${mochiSvg[id]}</svg>`;
