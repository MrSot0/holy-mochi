/**
 * Un mochi por sabor: cuerpo del color de su fruta y la fruta encima.
 * El mismo SVG se usa en el sprite (con animación CSS) y en el canvas del juego.
 */
export type SaborId = 'pinaparchita' | 'fresa' | 'chocolate' | 'ajipimienta' | 'cayenapiripiri' | 'cuatrofuegos';

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

// mordisco que deja ver la pulpa con semillas
const parchitaPulpa =
  `<path d="M150 104C162 94 186 100 192 120C196 136 186 150 170 150C152 150 140 136 142 120" fill="#FFF0B8" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M154 112C164 106 180 110 184 122C187 134 179 142 168 142C156 142 148 132 150 122Z" fill="#FF9F1C"/>` +
  [[160, 120], [172, 116], [178, 128], [166, 132], [158, 134], [172, 138]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.4" ry="3.4" fill="${T}"/>`).join('');


/* Ají (base del Ají y pimienta): el mochi es el ají. Piel roja brillante, punta curvada, cáliz verde y tallo */
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

/* Cayena: el mochi demonio convertido en ají cayena.
   Rojo intenso, piel arrugada, cola larga y curva, cáliz verde, cuernos, llamas y cara malvada. */
const llama = (x: number, y: number, e: number) =>
  `<g transform="translate(${x},${y}) scale(${e})"><g class="fl"><path d="M0 0C-12 -10 -10 -26 0 -44C10 -26 12 -10 0 0Z" fill="#FF6A00"/><path d="M0 0C-6 -6 -5 -16 0 -26C5 -16 6 -6 0 0Z" fill="#FFC107"/></g></g>`;
const cayenaDefs =
  `<defs><linearGradient id="hm-cayena" x1="0" y1="0" x2=".7" y2="1">` +
  `<stop offset="0" stop-color="#F0321F"/><stop offset=".55" stop-color="#C8121A"/><stop offset="1" stop-color="#7E0A10"/>` +
  `</linearGradient></defs>`;
const cayenaCola =
  `<path d="M146 226C176 234 200 252 204 276C206 286 196 290 190 282C180 262 162 248 128 238Z" fill="#7E0A10" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>`;
const cayenaCuernos =
  `<path d="M58 118Q40 84 50 56Q78 72 92 100Z" fill="#FFC107" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M182 118Q200 84 190 56Q162 72 148 100Z" fill="#FFC107" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<ellipse class="hf" cx="120" cy="50" rx="40" ry="10" fill="none" stroke="#FF6A00" stroke-width="8" transform="rotate(-12 120 50)"/>`;
const cayenaPiel =
  // arrugas de la piel
  `<path d="M52 150C60 172 58 198 66 220M188 150C180 172 184 198 174 220M120 98C112 110 114 124 108 136" fill="none" stroke="#7E0A10" stroke-width="4" stroke-linecap="round" opacity=".55"/>` +
  // brillo
  `<path d="M60 140C64 118 78 102 98 96" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".5"/>`;
const cayenaCara =
  `<circle cx="66" cy="190" r="15" fill="#FF8A6E" opacity=".75"/><circle cx="174" cy="190" r="15" fill="#FF8A6E" opacity=".75"/>` +
  `<ellipse cx="92" cy="164" rx="12" ry="11" fill="#FFC107" stroke="${T}" stroke-width="3"/><ellipse cx="148" cy="164" rx="12" ry="11" fill="#FFC107" stroke="${T}" stroke-width="3"/>` +
  `<ellipse cx="92" cy="165" rx="3" ry="9" fill="${T}"/><ellipse cx="148" cy="165" rx="3" ry="9" fill="${T}"/>` +
  `<path d="M70 142L108 158M170 142L132 158" stroke="${T}" stroke-width="8" stroke-linecap="round"/>` +
  `<path d="M88 188Q120 226 152 188Q120 198 88 188Z" fill="${T}" stroke="${T}" stroke-width="3" stroke-linejoin="round"/>` +
  `<path d="M98 191L105 205L112 193Z M128 193L135 205L142 191Z" fill="#FFF8F0"/>`;
const cayenaCaliz =
  `<path d="M90 92C98 78 110 74 120 76C130 74 142 78 150 92C142 89 132 90 127 96C124 91 116 91 113 96C108 90 98 89 90 92Z" fill="${HOJA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M120 78C118 66 122 58 130 52C134 49 138 52 136 56" fill="none" stroke="#3D9440" stroke-width="7" stroke-linecap="round"/>`;
const demonio =
  cayenaDefs + llama(36, 246, 1.4) + llama(220, 238, 1.1) + cayenaCola + cayenaCuernos +
  cuerpo('url(#hm-cayena)') + cayenaPiel + cayenaCara + cayenaCaliz;

/* Piña parchita: piña con corona y un mordisco que enseña la pulpa de parchita */
const pinaRombos = [[62, 132], [92, 112], [50, 168], [190, 172], [120, 106], [70, 214], [170, 214]]
  .map(([x, y]) => `<path d="M${x - 6} ${y}l6-6 6 6-6 6z" fill="#F2B705"/>`).join('');
const pinaCorona = pina.split('<path d="M').slice(0, 4).join('<path d="M');

/* Chocolate: cuerpo de cacao con baño que chorrea y chispitas de colores */
const chispitas: [number, number, string, number][] = [
  [78, 108, '#FF9DBB', 20], [100, 96, '#FFC107', -30], [124, 104, '#D4E6FF', 10], [146, 94, '#4DAA4F', 40],
  [164, 114, '#FF9DBB', -20], [116, 122, '#FFC107', 60], [90, 124, '#4DAA4F', -50], [140, 124, '#FFF8F0', 15],
];
const chocolateBano =
  `<path d="M46 132C50 104 80 84 120 84C160 84 190 104 194 132C188 140 182 128 176 136C170 150 162 148 158 136C150 126 142 142 132 138C124 134 118 148 110 144C100 138 94 126 84 132C76 138 70 150 62 140C56 132 52 142 46 132Z" fill="#5C3317" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  chispitas.map(([x, y, c, r]) => `<rect x="${x - 6}" y="${y - 2.5}" width="12" height="5" rx="2.5" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`).join('') +
  `<path d="M60 168C62 190 74 210 92 220" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/>`;

/* Ají y pimienta: ají madurando de verde a rojo, con granos de pimienta negra */
const ajiDefs =
  `<defs><linearGradient id="hm-aji" x1="0" y1="0" x2=".9" y2="1">` +
  `<stop offset="0" stop-color="#6FBF4A"/><stop offset=".45" stop-color="#F2A93B"/><stop offset="1" stop-color="#D7141F"/>` +
  `</linearGradient></defs>`;
const pimientaGranos = [[64, 134], [96, 112], [150, 110], [182, 136], [50, 176], [192, 174], [74, 214], [166, 216], [120, 226]]
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${T}"/><circle cx="${x - 1.5}" cy="${y - 1.5}" r="1.5" fill="#fff" opacity=".5"/>`).join('');

/* Cayena y piri piri: cayena naranja con dos piri piri cruzados encima y cara llorando */
const piriDefs =
  `<defs><linearGradient id="hm-piri" x1="0" y1="0" x2=".8" y2="1">` +
  `<stop offset="0" stop-color="#FF9A3D"/><stop offset=".55" stop-color="#F0501F"/><stop offset="1" stop-color="#B3101A"/>` +
  `</linearGradient></defs>`;
const piriCola = `<path d="M146 228C170 236 186 252 186 272C178 268 164 256 130 238Z" fill="#B3101A" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>`;
const piriChiles =
  // dos piri piri en V, con la punta hacia fuera y el tallo sobre la cabeza
  `<path d="M108 92C100 74 88 58 70 44C64 40 60 46 64 50C78 64 88 80 96 98Z" fill="#E8231B" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M132 92C140 74 152 58 170 44C176 40 180 46 176 50C162 64 152 80 144 98Z" fill="#C8121A" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>` +
  `<path d="M90 64C84 58 80 54 76 50M150 64C156 58 160 54 164 50" fill="none" stroke="#FF8A8A" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M100 98C100 90 104 86 110 86M140 98C140 90 136 86 130 86" fill="none" stroke="${HOJA}" stroke-width="8" stroke-linecap="round"/>`;
const caraLlorando =
  `<circle cx="68" cy="187" r="19" fill="#FFB4A6"/><circle cx="172" cy="187" r="19" fill="#FFB4A6"/>` +
  `<ellipse cx="90" cy="162" rx="11" ry="14" fill="${T}"/><ellipse cx="150" cy="162" rx="11" ry="14" fill="${T}"/>` +
  `<circle cx="94" cy="157" r="4" fill="#fff"/><circle cx="154" cy="157" r="4" fill="#fff"/>` +
  `<path d="M100 192Q108 182 116 192T132 192T140 192" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>` +
  `<path class="dr" d="M82 178C76 188 76 194 82 198C88 194 88 188 82 178Z" fill="#2FA4F0"/>` +
  `<path class="dr" style="animation-delay:.6s" d="M158 178C152 188 152 194 158 198C164 194 164 188 158 178Z" fill="#2FA4F0"/>` +
  `<circle class="rs" cx="56" cy="96" r="7" fill="#FFF8F0" stroke="${T}" stroke-width="3"/>` +
  `<circle class="rs" style="animation-delay:.9s" cx="184" cy="92" r="7" fill="#FFF8F0" stroke="${T}" stroke-width="3"/>`;
const piriBrillo = `<path d="M60 142C64 120 78 104 98 98" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".45"/>`;

export const mochiSvg: Record<SaborId, string> = {
  pinaparchita: cuerpo('#FFE680') + pinaRombos + parchitaPulpa + caraFeliz('#FF9DBB') + pinaCorona,
  fresa: cuerpo('#FF6B7F') + fresaSemillas + caraFeliz('#FFB3C1') + fresaCaliz,
  chocolate: cuerpo('#A86A3D') + chocolateBano + caraFeliz('#FF9DBB'),
  ajipimienta: ajiDefs + tabascoPunta + cuerpo('url(#hm-aji)') + pimientaGranos + tabascoBrillo + caraTabasco + tabascoCaliz,
  cayenapiripiri: piriDefs + piriCola + cuerpo('url(#hm-piri)') + piriBrillo + caraLlorando + piriChiles,
  cuatrofuegos: demonio,
};

/** Clase de animación según el carácter del sabor */
export const animacionSabor: Record<SaborId, string> = {
  pinaparchita: 'anim-respira',
  fresa: 'anim-respira',
  chocolate: 'anim-respira',
  ajipimienta: 'anim-tiembla',
  cayenapiripiri: 'anim-tiembla-rapido',
  cuatrofuegos: 'anim-risa',
};

/** SVG completo e independiente (para dibujarlo en canvas) */
export const svgCompleto = (id: SaborId) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 280">${mochiSvg[id]}</svg>`;
