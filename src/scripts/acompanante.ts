/**
 * Cambia el nivel de la mascota acompañante según la sección visible.
 * Cada sección declara su nivel con data-nivel="1..4".
 */
export function iniciarAcompanante(): void {
  const acompanante = document.getElementById('acompanante');
  const secciones = document.querySelectorAll<HTMLElement>('[data-nivel]:not(#acompanante)');
  if (!acompanante || secciones.length === 0) return;

  const visibles = new Map<Element, number>();

  const actualizar = () => {
    let mejor: HTMLElement | null = null;
    let mayor = 0;
    for (const [el, ratio] of visibles) {
      if (ratio > mayor) {
        mayor = ratio;
        mejor = el as HTMLElement;
      }
    }
    if (mejor?.dataset.nivel) acompanante.dataset.nivel = mejor.dataset.nivel;
    // En la ruleta se aparta para no tapar los juegos
    acompanante.classList.toggle('apartado', mejor?.id === 'ruleta');
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) visibles.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
      actualizar();
    },
    { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
  );

  secciones.forEach((s) => observador.observe(s));
}
