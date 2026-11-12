/**
 * Datos del negocio. Lo que va entre [CORCHETES] está pendiente.
 */
export const site = {
  nombre: 'Holy Mochi',
  ciudad: 'Maracaibo',
  instagram: '[@USUARIO]',
  hashtag: '#HolyMochiReto',
  premio: 'un mochi gratis',
  historia: [
    'Holy Mochi nació en una cocina pequeña de Maracaibo, con el aire acondicionado roto y una obsesión por el mochi japonés.',
    'Empezamos con las frutas de siempre: fresa, piña, parchita y mango. Un día un cliente pidió uno "que picara de verdad". Le pusimos Tabasco, lloró, pidió otro. Así nació la línea picante, y después llegó la Cayena para los que no aprenden.',
    'Hoy cada mochi lleva su medidor de llamas y cada cliente se lleva un reto.',
  ],
} as const;

export function enlaceInstagram(): string | null {
  if (site.instagram.startsWith('[')) return null;
  return `https://instagram.com/${site.instagram.replace(/^@/, '')}`;
}

/**
 * Comparte con el menú nativo del móvil; si no existe, copia el texto.
 * Devuelve lo que pasó para avisar al usuario.
 */
export async function compartir(texto: string): Promise<'compartido' | 'copiado' | 'cancelado'> {
  const url = location.href.split('#')[0];
  const datos = { title: site.nombre, text: `${texto} ${site.hashtag}`, url };
  if (navigator.share) {
    try {
      await navigator.share(datos);
      return 'compartido';
    } catch {
      return 'cancelado';
    }
  }
  try {
    await navigator.clipboard.writeText(`${datos.text} ${url}`);
    return 'copiado';
  } catch {
    return 'cancelado';
  }
}
