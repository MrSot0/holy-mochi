/**
 * Animaciones de entrada.
 * - Personajes [data-camina="izq|der"]: entran desde el borde de la página dando saltitos.
 * - Títulos, tarjetas y botones: caen y rebotan (aplastar y estirar).
 * - Párrafos: suben suave.
 * Todo arranca cuando la pantalla de carga avisa con el evento "holy:listo".
 */

const SALTA = 'main section :is(h1, h2, h3), main section li, main section details, main section .btn, #pedido h2, #pedido .btn';
const SUBE = 'main section p, #pedido p';
const EXCLUIR = '[data-sin-entrada], nav, #acompanante';

type Tipo = 'camina' | 'salta' | 'sube';

function caminar(el: Element, desde: 'izq' | 'der') {
  const r = el.getBoundingClientRect();
  const distancia = desde === 'izq' ? -(r.right + 30) : innerWidth - r.left + 30;
  const pasos = Math.min(12, Math.max(4, Math.round(Math.abs(distancia) / 85)));
  const alto = Math.min(28, Math.max(10, r.height * 0.14));
  const frames: Keyframe[] = [];
  for (let k = 0; k <= pasos; k++) {
    const x = distancia * (1 - k / pasos);
    // aterriza: se aplasta
    frames.push({ offset: k / pasos, transform: `translate(${x}px, 0) scale(${k === pasos ? 1 : 1.08}, ${k === pasos ? 1 : 0.9})`, easing: 'ease-out' });
    if (k < pasos) {
      // en el aire: se estira
      const xm = distancia * (1 - (k + 0.5) / pasos);
      frames.push({ offset: (k + 0.5) / pasos, transform: `translate(${xm}px, ${-alto}px) scale(.95, 1.07)`, easing: 'ease-in' });
    }
  }
  // pequeño rebote final al llegar
  const anim = el.animate(frames, { duration: pasos * 230, fill: 'backwards' });
  anim.finished.then(() =>
    el.animate(
      [
        { transform: 'scale(1,1)' },
        { transform: 'translateY(-14px) scale(.96,1.06)', offset: 0.4 },
        { transform: 'scale(1.1,.9)', offset: 0.75 },
        { transform: 'scale(1,1)' },
      ],
      { duration: 420, easing: 'ease-out' },
    ),
  );
}

function saltar(el: Element, retraso: number) {
  el.animate(
    [
      { opacity: 0, transform: 'translateY(-70px) scale(.9, 1.12)' },
      { opacity: 1, transform: 'translateY(0) scale(1.1, .88)', offset: 0.42 },
      { transform: 'translateY(-16px) scale(.97, 1.04)', offset: 0.62 },
      { transform: 'translateY(0) scale(1.04, .96)', offset: 0.8 },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 760, delay: retraso, easing: 'ease-out', fill: 'backwards' },
  );
}

function subir(el: Element, retraso: number) {
  el.animate(
    [
      { opacity: 0, transform: 'translateY(18px)' },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 520, delay: retraso, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' },
  );
}

export function iniciarEntradas(): void {
  const raiz = document.documentElement;
  if (!raiz.classList.contains('anim') || !('IntersectionObserver' in window) || !Element.prototype.animate) {
    raiz.classList.remove('anim');
    return;
  }

  const objetivos = new Map<Element, Tipo>();
  document.querySelectorAll('[data-camina]').forEach((el) => objetivos.set(el, 'camina'));
  document.querySelectorAll(SALTA).forEach((el) => {
    if (el.closest(EXCLUIR) || objetivos.has(el)) return;
    objetivos.set(el, 'salta');
  });
  document.querySelectorAll(SUBE).forEach((el) => {
    if (el.closest(EXCLUIR) || el.closest('li, details') || objetivos.has(el)) return;
    objetivos.set(el, 'sube');
  });

  objetivos.forEach((_, el) => el.classList.add('e-espera'));

  let listo = false;
  const pendientes: Element[] = [];

  const lanzar = (lote: Element[]) => {
    // retraso escalonado entre hermanos que entran a la vez
    const porPadre = new Map<Element | null, number>();
    lote.forEach((el) => {
      const tipo = objetivos.get(el)!;
      const padre = el.parentElement;
      const n = porPadre.get(padre) ?? 0;
      porPadre.set(padre, n + 1);
      const retraso = Math.min(n * 110, 550);
      el.classList.remove('e-espera');
      if (tipo === 'camina') caminar(el, (el as HTMLElement).dataset.camina === 'der' ? 'der' : 'izq');
      else if (tipo === 'salta') saltar(el, retraso);
      else subir(el, retraso);
    });
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      const visibles = entradas.filter((e) => e.isIntersecting).map((e) => e.target);
      visibles.forEach((el) => observador.unobserve(el));
      if (listo) lanzar(visibles);
      else pendientes.push(...visibles);
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  objetivos.forEach((_, el) => observador.observe(el));

  const arrancar = () => {
    if (listo) return;
    listo = true;
    lanzar(pendientes.splice(0));
  };
  window.addEventListener('holy:listo', arrancar, { once: true });
  setTimeout(arrancar, 5000);
}
