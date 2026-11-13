import type { SaborId } from './mochis';

export type Nivel = 1 | 2 | 3 | 4;

export interface Sabor {
  id: SaborId;
  nombre: string;
  descripcion: string;
  /** Llamas de picante: 0 = no pica, 4 = máximo */
  llamas: 0 | 1 | 2 | 3 | 4;
  /** Clase de fondo pastel (token de Tailwind) */
  fondo: string;
  /** Mismo color en hex, para el canvas de los minijuegos */
  hex: string;
  precio: string;
  mascota?: Nivel;
}

export const dulces: Sabor[] = [
  { id: 'pinaparchita', nombre: 'Piña parchita', descripcion: 'Piña dulce con el toque ácido de la parchita.', llamas: 0, fondo: 'bg-pina', hex: '#FFF1A8', precio: '$1' },
  { id: 'fresa', nombre: 'Fresa', descripcion: 'Fresa dulce, el clásico de siempre.', llamas: 0, fondo: 'bg-fresa', hex: '#FFD6E2', precio: '$1' },
  { id: 'chocolate', nombre: 'Chocolate', descripcion: 'Chocolate cremoso para los que no negocian con el picante.', llamas: 0, fondo: 'bg-cacao', hex: '#EBD3BE', precio: '$1' },
];

export const picantes: Sabor[] = [
  { id: 'ajipimienta', nombre: 'Ají y pimienta', descripcion: 'Ají con pimienta negra. Calor que avisa antes de llegar.', llamas: 2, fondo: 'bg-parchita', hex: '#E3F2C1', precio: '$1', mascota: 2 },
  { id: 'cayenapiripiri', nombre: 'Cayena y piri piri', descripcion: 'Pica fuerte y no se va rápido. Lágrimas incluidas.', llamas: 3, fondo: 'bg-mango', hex: '#FFCF9E', precio: '$1', mascota: 3 },
  { id: 'cuatrofuegos', nombre: 'Ají, pimienta roja, cayena y tabasco', descripcion: 'Los cuatro juntos. El más picante de la carta.', llamas: 4, fondo: 'bg-cayena', hex: '#FF9D8C', precio: '$1', mascota: 4 },
];

export const todos: Sabor[] = [...dulces, ...picantes];

export interface Reto {
  nombre: string;
  nivel: Nivel;
  descripcion: string;
  talon: string;
  /** Mochi que hay que comprar para el reto */
  sabor: SaborId;
}

export const retos: Reto[] = [
  { nombre: 'Reto a ciegas', nivel: 1, descripcion: 'Compra una caja de 3 dulces sin mirar y adivina cada sabor al primer bocado.', talon: 'bg-pina', sabor: 'fresa' },
  { nombre: 'Reto del minuto', nivel: 2, descripcion: 'Compra un Ají y pimienta y aguanta 60 segundos sin agua.', talon: 'bg-parchita', sabor: 'ajipimienta' },
  { nombre: 'Reto doble', nivel: 3, descripcion: 'Compra dos Cayena y piri piri y cómetelos seguidos, sin pausa.', talon: 'bg-mango', sabor: 'cayenapiripiri' },
  { nombre: 'Reto de los cuatro fuegos', nivel: 4, descripcion: 'Compra el de ají, pimienta roja, cayena y tabasco y termínalo entero.', talon: 'bg-cayena', sabor: 'cuatrofuegos' },
];

export const nivelesMascota: { nivel: Nivel; nombre: string; gesto: string; fondo: string }[] = [
  { nivel: 1, nombre: 'Suave', gesto: 'Respira tranquilo', fondo: 'bg-blanco' },
  { nivel: 2, nombre: 'Picante', gesto: 'Suda y tiembla', fondo: 'bg-fresa' },
  { nivel: 3, nombre: 'Muy picante', gesto: 'Llora y echa humo', fondo: 'bg-mango' },
  { nivel: 4, nombre: 'Súper picante', gesto: 'Se vuelve malvado', fondo: 'bg-tabasco' },
];

export const preguntas: { pregunta: string; respuesta: string }[] = [
  { pregunta: '¿Qué tan picante es de verdad?', respuesta: 'Piña parchita, fresa y chocolate no pican nada. Ají y pimienta es nivel 2, Cayena y piri piri nivel 3, y el de ají, pimienta roja, cayena y tabasco es el nivel 4, el máximo.' },
  { pregunta: '¿Cuánto cuestan?', respuesta: 'Todos a $1, dulces y picantes.' },
  { pregunta: '¿Dónde los compro?', respuesta: '[DÓNDE Y CÓMO COMPRAR: dirección o punto de venta en Maracaibo, horario y si hay delivery]' },
  { pregunta: '¿Cuánto duran y cómo se guardan?', respuesta: '[CONSERVACIÓN Y CADUCIDAD]' },
  { pregunta: '¿Tienen información de alérgenos?', respuesta: '[ALÉRGENOS]' },
  { pregunta: '¿Cómo funcionan los retos?', respuesta: 'Compras el mochi del reto, lo superas al momento y te sellamos la tarjeta. Con los cuatro niveles sellados, te llevas un mochi gratis.' },
];
