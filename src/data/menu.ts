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
  { id: 'fresa', nombre: 'Fresa', descripcion: 'Fresa dulce, el clásico de siempre.', llamas: 0, fondo: 'bg-fresa', hex: '#FFD6E2', precio: '$1' },
  { id: 'pina', nombre: 'Piña', descripcion: 'Piña tropical, fresca y jugosa.', llamas: 0, fondo: 'bg-pina', hex: '#FFF1A8', precio: '$1' },
  { id: 'parchita', nombre: 'Parchita', descripcion: 'Ácida y perfumada, pura fruta de la pasión.', llamas: 0, fondo: 'bg-parchita', hex: '#E3F2C1', precio: '$1' },
  { id: 'mango', nombre: 'Mango', descripcion: 'Mango maduro, dulce y cremoso.', llamas: 0, fondo: 'bg-mango', hex: '#FFCF9E', precio: '$1' },
];

export const picantes: Sabor[] = [
  { id: 'tabasco', nombre: 'Tabasco', descripcion: 'Calor rápido y ácido que sube de golpe.', llamas: 3, fondo: 'bg-tabasco', hex: '#FFB4A6', precio: '$1', mascota: 3 },
  { id: 'cayena', nombre: 'Cayena', descripcion: 'El más picante de la carta. Ten agua cerca.', llamas: 4, fondo: 'bg-cayena', hex: '#FF9D8C', precio: '$1', mascota: 4 },
];

export const todos: Sabor[] = [...dulces, ...picantes];

export interface Reto {
  nombre: string;
  nivel: Nivel;
  descripcion: string;
  talon: string;
}

export const retos: Reto[] = [
  { nombre: 'Reto del minuto', nivel: 2, descripcion: 'Un mochi de Tabasco y 60 segundos sin agua.', talon: 'bg-fresa' },
  { nombre: 'Reto doble', nivel: 3, descripcion: 'Dos mochis de Tabasco, uno tras otro y sin pausa.', talon: 'bg-tabasco' },
  { nombre: 'Reto Cayena', nivel: 4, descripcion: 'Un mochi de Cayena entero. Solo para valientes.', talon: 'bg-cayena' },
];

export const nivelesMascota: { nivel: Nivel; nombre: string; gesto: string; fondo: string }[] = [
  { nivel: 1, nombre: 'Suave', gesto: 'Respira tranquilo', fondo: 'bg-blanco' },
  { nivel: 2, nombre: 'Picante', gesto: 'Suda y tiembla', fondo: 'bg-fresa' },
  { nivel: 3, nombre: 'Muy picante', gesto: 'Llora y echa humo', fondo: 'bg-mango' },
  { nivel: 4, nombre: 'Súper picante', gesto: 'Se vuelve malvado', fondo: 'bg-tabasco' },
];

export const preguntas: { pregunta: string; respuesta: string }[] = [
  { pregunta: '¿Qué tan picante es de verdad?', respuesta: 'Fresa, piña, parchita y mango no pican nada. Tabasco es nivel 3 y Cayena nivel 4, el máximo.' },
  { pregunta: '¿Cuánto cuestan?', respuesta: 'Todos a $1, dulces y picantes. El valor de aguantar la Cayena no tiene precio.' },
  { pregunta: '¿Cómo hago un pedido?', respuesta: 'Escríbenos por mensaje directo en Instagram a [@USUARIO] con tus sabores. [PEDIDO MÍNIMO Y ANTELACIÓN]' },
  { pregunta: '¿Hacen envíos?', respuesta: '[ZONAS DE MARACAIBO, COSTE Y DÍAS DE ENTREGA]' },
  { pregunta: '¿Cuánto duran y cómo se guardan?', respuesta: '[CONSERVACIÓN Y CADUCIDAD]' },
  { pregunta: '¿Tienen información de alérgenos?', respuesta: '[ALÉRGENOS]' },
  { pregunta: '¿Qué gano si completo un reto?', respuesta: 'Un mochi gratis. Comparte tu video o tu resultado de la ruleta en redes, etiquétanos y te lo regalamos. Mira cómo al final de la página.' },
];
