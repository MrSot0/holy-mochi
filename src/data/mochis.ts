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

const pina =
  `<path d="M120 96C110 72 110 50 120 22C130 50 130 72 120 96Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M114 96C98 82 88 64 82 42C100 52 112 70 124 94Z" fill="#3D9440" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M126 96C142 82 152 64 158 42C140 52 128 70 116 94Z" fill="#3D9440" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  [[62, 132], [178, 132], [92, 112], [148, 112], [50, 168], [190, 168], [120, 106]].map(([x, y]) => `<path d="M${x - 6} ${y}l6-6 6 6-6 6z" fill="#F2B705"/>`).join('');

/* Fresa: cuerpo rojo con semillas y cáliz de hojas */
const fresaSemillas = [[70, 128], [100, 114], [140, 114], [170, 128], [120, 132], [52, 160], [188, 160], [48, 200], [192, 200], [84, 216], [120, 224], [156, 216]]
  .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="4.6" fill="#FFE27A" stroke="#C98A00" stroke-width="1.5"/>`).join('');
const fresaCaliz =
  `<path d="M120 72L131 90L153 84L141 99L160 108L135 106L120 117L105 106L80 108L99 99L87 84L109 90Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M120 80C119 68 123 58 131 52" fill="none" stroke="#3D9440" stroke-width="7" stroke-linecap="round"/>`;

/* Parchita: piel amarilla con pintitas, tallo y hoja */
const parchitaPintas = [[66, 132], [96, 112], [120, 126], [54, 172], [190, 178], [70, 214], [170, 214], [120, 224], [44, 204], [196, 206], [84, 100]]
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#FFF6C8"/>`).join('');
// mordisco que deja ver la pulpa con semillas
const parchitaPulpa =
  `<path d="M150 104C162 94 186 100 192 120C196 136 186 150 170 150C152 150 140 136 142 120" fill="#FFF0B8" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M154 112C164 106 180 110 184 122C187 134 179 142 168 142C156 142 148 132 150 122Z" fill="#FF9F1C"/>` +
  [[160, 120], [172, 116], [178, 128], [166, 132], [158, 134], [172, 138]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.4" ry="3.4" fill="${T}"/>`).join('');
const parchitaTallo =
  `<path d="M120 86C118 72 121 62 128 56" fill="none" stroke="#6B7F2A" stroke-width="7" stroke-linecap="round"/>` +
  `<path d="M127 58C138 44 157 42 166 48C157 61 140 63 127 58Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M131 57C142 53 152 51 160 50" fill="none" stroke="#3D9440" stroke-width="2.5" stroke-linecap="round"/>`;

/* Mango: piel en degradado verde → amarillo → rojo, brillo, tallo y hoja */
const mangoDefs =
  `<defs><linearGradient id="hm-mango" x1="0" y1="0" x2="1" y2="1">` +
  `<stop offset="0" stop-color="#A8D25A"/><stop offset=".42" stop-color="#FFD04D"/><stop offset="1" stop-color="#FF7A45"/>` +
  `</linearGradient></defs>`;
const mangoDetalle =
  `<ellipse cx="74" cy="124" rx="18" ry="10" fill="#fff" opacity=".45" transform="rotate(-30 74 124)"/>` +
  `<path d="M126 84C126 72 130 64 136 60" fill="none" stroke="#7A5230" stroke-width="7" stroke-linecap="round"/>` +
  `<path d="M135 61C146 46 166 44 176 51C166 64 148 66 135 61Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>`;

/* Tabasco: el mochi es el ají. Piel roja brillante, punta curvada, cáliz verde y tallo */
const tabascoDefs =
  `<defs><linearGradient id="hm-tabasco" x1="0" y1="0" x2=".8" y2="1">` +
  `<stop offset="0" stop-color="#FF6A3D"/><stop offset=".5" stop-color="#E8231B"/><stop offset="1" stop-color="#A80F14"/>` +
  `</linearGradient></defs>`;
// la punta va detrás del cuerpo para que no se vea la unión
const tabascoPunta = `<path d="M150 228C168 236 178 248 172 262C164 256 150 248 132 236Z" fill="#A80F14" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>`;
const tabascoBrillo =
  `<path d="M58 150C60 124 76 106 96 98" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>` +
  `<circle cx="104" cy="96" r="4.5" fill="#fff" opacity=".55"/>`;
const tabascoCaliz =
  `<path d="M84 94C92 76 108 70 120 72C132 70 148 76 156 94C146 90 134 92 128 98C124 92 116 92 112 98C106 92 94 90 84 94Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M120 74C118 60 124 48 136 42" fill="none" stroke="#3D9440" stroke-width="8" stroke-linecap="round"/>`;
// cara sudando con mejillas claras para que se vean sobre el rojo
const caraTabasco = caraSudando.replaceAll('fill="#D7141F"', 'fill="#FFB4A6"');

/** Cayena es el mochi demonio (la mascota en nivel 4) */
const demonio =
  `<g transform="translate(36,246) scale(1.4)"><g class="fl"><path d="M0 0C-12 -10 -10 -26 0 -44C10 -26 12 -10 0 0Z" fill="#FF6A00"/><path d="M0 0C-6 -6 -5 -16 0 -26C5 -16 6 -6 0 0Z" fill="#FFC107"/></g></g><g transform="translate(204,246) scale(1.4)"><g class="fl"><path d="M0 0C-12 -10 -10 -26 0 -44C10 -26 12 -10 0 0Z" fill="#FF6A00"/><path d="M0 0C-6 -6 -5 -16 0 -26C5 -16 6 -6 0 0Z" fill="#FFC107"/></g></g><path d="M58 118Q40 84 50 56Q78 72 92 100Z" fill="#FFC107" stroke="#3A1F3D" stroke-width="4" stroke-linejoin="round"/><path d="M182 118Q200 84 190 56Q162 72 148 100Z" fill="#FFC107" stroke="#3A1F3D" stroke-width="4" stroke-linejoin="round"/><ellipse class="hf" cx="120" cy="62" rx="44" ry="11" fill="none" stroke="#FF6A00" stroke-width="9" transform="rotate(-12 120 62)"/><path d="M30 192C30 117 70 82 120 82C170 82 210 117 210 192C210 222 190 237 120 237C50 237 30 222 30 192Z" fill="#D7141F" stroke="#3A1F3D" stroke-width="5"/><circle cx="66" cy="190" r="15" fill="#8A0E18"/><circle cx="174" cy="190" r="15" fill="#8A0E18"/><ellipse cx="92" cy="164" rx="12" ry="11" fill="#FFC107" stroke="#3A1F3D" stroke-width="3"/><ellipse cx="148" cy="164" rx="12" ry="11" fill="#FFC107" stroke="#3A1F3D" stroke-width="3"/><ellipse cx="92" cy="165" rx="3" ry="9" fill="#3A1F3D"/><ellipse cx="148" cy="165" rx="3" ry="9" fill="#3A1F3D"/><path d="M70 142L108 158M170 142L132 158" stroke="#3A1F3D" stroke-width="8" stroke-linecap="round"/><path d="M88 188Q120 226 152 188Q120 198 88 188Z" fill="#3A1F3D" stroke="#3A1F3D" stroke-width="3" stroke-linejoin="round"/><path d="M98 191L105 205L112 193Z M128 193L135 205L142 191Z" fill="#FFF8F0"/>`;

export const mochiSvg: Record<SaborId, string> = {
  fresa: cuerpo('#FF6B7F') + fresaSemillas + caraFeliz('#FFB3C1') + fresaCaliz,
  pina: cuerpo('#FFE680') + caraFeliz('#FF9DBB') + pina,
  parchita: cuerpo('#EBA91C') + parchitaPintas + parchitaPulpa + caraFeliz('#FF9DBB') + parchitaTallo,
  mango: mangoDefs + cuerpo('url(#hm-mango)') + mangoDetalle + caraFeliz('#FF6A4D'),
  tabasco: tabascoDefs + tabascoPunta + cuerpo('url(#hm-tabasco)') + tabascoBrillo + caraTabasco + tabascoCaliz,
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
