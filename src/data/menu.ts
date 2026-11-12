export type Nivel = 1 | 2 | 3 | 4;

export interface Sabor {
  nombre: string;
  descripcion: string;
  /** Llamas de picante: 0 = no pica, 4 = máximo */
  llamas: 0 | 1 | 2 | 3 | 4;
  /** Clase de fondo pastel (token de Tailwind) */
  fondo: string;
  precio: string;
  mascota?: Nivel;
}

export const dulces: Sabor[] = [
  { nombre: 'Fresa', descripcion: 'Fresa dulce, el clásico de siempre.', llamas: 0, fondo: 'bg-fresa', precio: '[PRECIO]' },
  { nombre: 'Piña', descripcion: 'Piña tropical, fresca y jugosa.', llamas: 0, fondo: 'bg-pina', precio: '[PRECIO]' },
  { nombre: 'Parchita', descripcion: 'Ácida y perfumada, pura fruta de la pasión.', llamas: 0, fondo: 'bg-parchita', precio: '[PRECIO]' },
  { nombre: 'Mango', descripcion: 'Mango maduro, dulce y cremoso.', llamas: 0, fondo: 'bg-mango', precio: '[PRECIO]' },
];

export const picantes: Sabor[] = [
  { nombre: 'Tabasco', descripcion: 'Calor rápido y ácido que sube de golpe.', llamas: 3, fondo: 'bg-tabasco', precio: '[PRECIO]', mascota: 3 },
  { nombre: 'Cayena', descripcion: 'El más picante de la carta. Ten agua cerca.', llamas: 4, fondo: 'bg-cayena', precio: '[PRECIO]', mascota: 4 },
];

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
  { pregunta: '¿Cómo hago un pedido?', respuesta: 'Escríbenos por WhatsApp con tus sabores. [PEDIDO MÍNIMO Y ANTELACIÓN]' },
  { pregunta: '¿Hacen envíos?', respuesta: '[ZONAS DE ENTREGA, COSTE Y DÍAS]' },
  { pregunta: '¿Cuánto duran y cómo se guardan?', respuesta: '[CONSERVACIÓN Y CADUCIDAD]' },
  { pregunta: '¿Tienen información de alérgenos?', respuesta: '[ALÉRGENOS]' },
  { pregunta: '¿Qué gano si completo un reto?', respuesta: '[PREMIO Y CÓMO SE RECLAMA]' },
];
