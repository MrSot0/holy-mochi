/**
 * Mascota acompañante: cambia de nivel según la sección visible
 * (cada sección declara data-nivel="1..4") y suelta comentarios sarcásticos.
 */

const COMENTARIOS: Record<string, string[]> = {
  inicio: [
    '¿Vas a mirar o vas a comer?',
    'Sí, soy adorable. No, no me puedes morder. Bueno, un poquito.',
    'En Maracaibo hace 40 grados y aun así le ponemos chile al postre. Somos así.',
    'Baja. Abajo están los que pican. Cobarde no eres… ¿o sí?',
  ],
  nosotros: [
    'Nuestra historia es conmovedora. Yo lloré, pero fue por la cayena.',
    'Lee con calma, yo espero. Derritiéndome, pero espero.',
    'El aire acondicionado sigue roto, por si preguntabas.',
  ],
  sabores: [
    'Chocolate es para los que le tienen miedo a la vida. No juzgo. Bueno, sí.',
    'Todo a $1. Más barato que tu terapia después de los cuatro fuegos.',
    'La cayena no muerde. Quema, que es muy distinto.',
    'Piña parchita: dulce por fuera, ácida por dentro. Como tu ex.',
    'Ají, pimienta roja, cayena y tabasco. Sí, los cuatro. No, no estamos bien.',
  ],
  retos: [
    '60 segundos sin agua. Dijiste que eras valiente, ¿no?',
    'Spoiler: vas a pedir leche.',
    'El reto doble es como el primero, pero con más arrepentimiento.',
    'Cada sello cuesta un mochi y un poco de dignidad.',
  ],
  preguntas: [
    '¿Más dudas? Qué raro, si todo está clarísimo.',
    'La respuesta a casi todo es: compra otro mochi.',
    'No, el picante no se quita con agua. Pregúntale a cualquiera.',
  ],
  tarjeta: [
    'Cuatro sellos y un mochi gratis. Las matemáticas nunca dolieron tanto.',
    '¿Te falta el nivel 4? Lo sé. Lo huelo.',
    'Gratis sabe mejor. Picante también. Gratis y picante… muajaja.',
  ],
};

export function iniciarAcompanante(): void {
  const acompanante = document.getElementById('acompanante');
  const globo = document.getElementById('acompanante-globo');
  const secciones = document.querySelectorAll<HTMLElement>('[data-nivel]:not(#acompanante)');
  if (!acompanante || !globo || secciones.length === 0) return;

  const visibles = new Map<Element, number>();
  const usados = new Map<string, number>();
  let seccionActual = '';
  let ocultar = 0;
  let siguiente = 0;

  const elegir = (id: string) => {
    const lista = COMENTARIOS[id];
    if (!lista) return null;
    const i = (usados.get(id) ?? Math.floor(Math.random() * lista.length)) % lista.length;
    usados.set(id, i + 1);
    return lista[i];
  };

  const hablar = (id: string) => {
    clearTimeout(ocultar);
    clearTimeout(siguiente);
    // en móvil no habla en el hero para no tapar los botones
    if (id === 'inicio' && innerWidth < 768) return;
    const frase = elegir(id);
    if (!frase || acompanante.classList.contains('apartado')) return;
    globo.classList.remove('visible');
    requestAnimationFrame(() => {
      globo.textContent = frase;
      globo.classList.add('visible');
    });
    // lo que dura en pantalla depende de lo largo que sea el chiste
    ocultar = window.setTimeout(() => globo.classList.remove('visible'), 2600 + frase.length * 45);
    siguiente = window.setTimeout(() => hablar(seccionActual), 9000 + frase.length * 45);
  };

  const actualizar = () => {
    let mejor: HTMLElement | null = null;
    let mayor = 0;
    for (const [el, ratio] of visibles) {
      if (ratio > mayor) {
        mayor = ratio;
        mejor = el as HTMLElement;
      }
    }
    if (!mejor) return;
    if (mejor.dataset.nivel) acompanante.dataset.nivel = mejor.dataset.nivel;
    // En la ruleta se aparta para no tapar los juegos
    const enRuleta = mejor.id === 'ruleta';
    acompanante.classList.toggle('apartado', enRuleta);
    if (enRuleta) globo.classList.remove('visible');
    if (mejor.id !== seccionActual) {
      seccionActual = mejor.id;
      if (!enRuleta) hablar(seccionActual);
    }
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) visibles.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
      actualizar();
    },
    { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
  );

  // Primer comentario cuando ya terminó de entrar caminando
  setTimeout(() => secciones.forEach((s) => observador.observe(s)), 1800);
}
