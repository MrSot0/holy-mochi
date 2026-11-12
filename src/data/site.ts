/**
 * Datos del negocio. Todo lo que va entre [CORCHETES] está pendiente:
 * sustitúyelo por el dato real y la web se actualiza sola.
 */
export const site = {
  nombre: 'Holy Mochi',
  ciudad: '[CIUDAD]',
  /** Número en formato internacional sin "+" ni espacios, p. ej. 584121234567 */
  whatsapp: '[WHATSAPP]',
  instagram: '[@USUARIO]',
  premio: '[PREMIO]',
  historia: '[HISTORIA: quién está detrás, desde cuándo y cómo empezó Holy Mochi]',
} as const;

const esPendiente = (valor: string) => valor.startsWith('[');

/** Enlace de WhatsApp. Si aún no hay número, apunta a la sección de pedido. */
export function enlaceWhatsApp(mensaje = '¡Hola Holy Mochi! Quiero hacer un pedido.'): string {
  if (esPendiente(site.whatsapp)) return '#pedido';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function enlaceInstagram(): string | null {
  if (esPendiente(site.instagram)) return null;
  return `https://instagram.com/${site.instagram.replace(/^@/, '')}`;
}
