import { compartir } from '../data/site';
import { todos, type Sabor } from '../data/menu';
import { animacionSabor, svgCompleto } from '../data/mochis';

type Juego = 'atrapa' | 'memoria' | 'caja';
const NOMBRES: Record<Juego, string> = {
  atrapa: 'Atrapa el mochi',
  memoria: 'Memoria picante',
  caja: 'Caja de la suerte',
};
const ORDEN: Juego[] = ['atrapa', 'memoria', 'caja'];

const quieto = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const azar = <T>(lista: readonly T[]): T => lista[Math.floor(Math.random() * lista.length)];
const barajar = <T>(lista: T[]): T[] => {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const $ = <T extends Element>(root: ParentNode, sel: string) => root.querySelector<T>(sel)!;

export function iniciarRuleta(): void {
  const seccion = document.getElementById('ruleta');
  if (!seccion) return;
  const raiz: HTMLElement = seccion;

  const rueda = $<SVGSVGElement>(seccion, '#rueda');
  const mascotaRueda = $<SVGSVGElement>(seccion, '#rueda-mascota use');
  const botonGirar = $<HTMLButtonElement>(seccion, '#girar');
  const estado = $<HTMLElement>(seccion, '#ruleta-estado');
  const escenario = $<HTMLElement>(seccion, '#escenario');
  const plantilla = $<HTMLTemplateElement>(seccion, '#plantilla-resultado');
  const paneles = [...escenario.querySelectorAll<HTMLElement>('[data-panel]')];

  let giro = 0;
  let girando = false;

  const atrapa = juegoAtrapa(panel('atrapa'), mostrarResultado);
  const memoria = juegoMemoria(panel('memoria'), mostrarResultado);
  const caja = juegoCaja(panel('caja'), mostrarResultado);
  const juegos = { atrapa, memoria, caja };

  function panel(id: string) {
    return paneles.find((p) => p.dataset.panel === id)!;
  }

  const vista = $<HTMLElement>(seccion, '#vista-ruleta');
  const chip = $<HTMLElement>(seccion, '[data-juego-actual]');
  const volverBtn = $<HTMLButtonElement>(seccion, '[data-volver]');

  const salir = (el: HTMLElement) =>
    quieto()
      ? Promise.resolve()
      : el.animate(
          [
            { opacity: 1, transform: 'none' },
            { opacity: 1, transform: 'translateY(-14px) scale(1.04, .96)', offset: 0.35 },
            { opacity: 0, transform: 'translateY(50px) scale(.7)' },
          ],
          { duration: 380, easing: 'ease-in' },
        ).finished.then(() => undefined);

  const entrar = (el: HTMLElement) => {
    if (quieto()) return;
    el.animate(
      [
        { opacity: 0, transform: 'translateY(60px) scale(.85, 1.1)' },
        { opacity: 1, transform: 'translateY(0) scale(1.05, .94)', offset: 0.55 },
        { transform: 'translateY(-8px) scale(.98, 1.02)', offset: 0.78 },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 620, easing: 'ease-out' },
    );
  };

  const centrarSeccion = () => {
    // deja el escenario justo bajo la cabecera para que el juego quepa en pantalla
    const cabecera = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    const top = escenario.getBoundingClientRect().top + scrollY - cabecera - 10;
    scrollTo({ top, behavior: quieto() ? 'auto' : 'smooth' });
  };

  async function mostrarJuego(id: Juego) {
    Object.values(juegos).forEach((j) => j.detener());
    if (!vista.hidden) {
      await salir(vista);
      vista.hidden = true;
    }
    paneles.forEach((p) => (p.hidden = p.dataset.panel !== id));
    const actual = panel(id);
    actual.querySelectorAll<HTMLElement>('[data-resultado]').forEach((r) => {
      r.hidden = true;
      r.replaceChildren();
    });
    chip.textContent = NOMBRES[id];
    escenario.hidden = false;
    centrarSeccion();
    entrar(escenario);
    juegos[id].preparar();
    $<HTMLElement>(actual, 'h3').focus({ preventScroll: true });
  }

  async function volver() {
    Object.values(juegos).forEach((j) => j.detener());
    if (!escenario.hidden) {
      await salir(escenario);
      escenario.hidden = true;
    }
    estado.textContent = '';
    vista.hidden = false;
    entrar(vista);
    raiz.scrollIntoView({ behavior: quieto() ? 'auto' : 'smooth', block: 'start' });
    botonGirar.focus({ preventScroll: true });
  }
  volverBtn.addEventListener('click', volver);

  function girar() {
    if (girando) return;
    girando = true;
    botonGirar.disabled = true;
    estado.textContent = 'Girando…';
    mascotaRueda.setAttribute('href', '#m3');

    const porcion = Math.floor(Math.random() * 6);
    const juego = ORDEN[porcion % 3];
    const centro = porcion * 60 + 30;
    const vueltas = quieto() ? 0 : 5;
    const base = Math.ceil(giro / 360) * 360 + vueltas * 360;
    giro = base + (360 - centro) + (Math.random() * 30 - 15);

    const terminar = () => {
      girando = false;
      botonGirar.disabled = false;
      mascotaRueda.setAttribute('href', '#m1');
      estado.textContent = `¡Te tocó ${NOMBRES[juego]}!`;
      setTimeout(() => mostrarJuego(juego), quieto() ? 0 : 750);
    };

    if (quieto()) {
      rueda.style.transform = `rotate(${giro}deg)`;
      terminar();
      return;
    }
    rueda.animate(
      [{ transform: getComputedStyle(rueda).transform === 'none' ? 'rotate(0deg)' : getComputedStyle(rueda).transform }, { transform: `rotate(${giro}deg)` }],
      { duration: 4200, easing: 'cubic-bezier(.15,.75,.12,1)', fill: 'forwards' },
    ).finished.then(() => {
      rueda.style.transform = `rotate(${giro}deg)`;
      terminar();
    });
  }

  function mostrarResultado(juego: Juego, sabor: Sabor, titulo: string, detalle: string) {
    const destino = $<HTMLElement>(panel(juego), '[data-resultado]');
    const nodo = plantilla.content.cloneNode(true) as DocumentFragment;
    const tarjeta = nodo.firstElementChild as HTMLElement;
    tarjeta.style.background = sabor.hex;
    $<SVGUseElement>(nodo, '[data-res-mascota]').setAttribute('href', `#s-${sabor.id}`);
    $<SVGGElement>(nodo, '[data-res-anim]').setAttribute('class', animacionSabor[sabor.id]);
    $<HTMLElement>(nodo, '[data-res-titulo]').textContent = titulo;
    $<HTMLElement>(nodo, '[data-res-detalle]').textContent = detalle;
    const aviso = $<HTMLElement>(nodo, '[data-res-aviso]');
    $<HTMLButtonElement>(nodo, '[data-res-cta]').addEventListener('click', async () => {
      const r = await compartir(`Jugué a "${NOMBRES[juego]}" en Holy Mochi y me tocó un mochi de ${sabor.nombre}. ¿Y a ti?`);
      aviso.textContent =
        r === 'copiado' ? 'Copiado. Pégalo en tus redes, etiquétanos y gana un mochi gratis.' :
        r === 'compartido' ? '¡Compartido! Etiquétanos para reclamar tu mochi gratis.' : '';
    });
    $<HTMLButtonElement>(nodo, '[data-res-otra]').addEventListener('click', volver);
    destino.replaceChildren(nodo);
    destino.hidden = false;
    $<HTMLElement>(destino, '[data-res-titulo]').focus({ preventScroll: true });
    destino.scrollIntoView({ behavior: quieto() ? 'auto' : 'smooth', block: 'nearest' });
  }

  botonGirar.addEventListener('click', girar);
  seccion.querySelectorAll<HTMLButtonElement>('[data-ir]').forEach((b) =>
    b.addEventListener('click', () => {
      const id = b.dataset.ir as Juego;
      estado.textContent = `Elegiste ${NOMBRES[id]}.`;
      mostrarJuego(id);
    }),
  );
}

type AlResultado = (juego: Juego, sabor: Sabor, titulo: string, detalle: string) => void;
interface Minijuego {
  preparar(): void;
  detener(): void;
}

/* ───────────── Juego 1: Atrapa el mochi ───────────── */
function juegoAtrapa(panel: HTMLElement, alResultado: AlResultado): Minijuego {
  const lienzo = $<HTMLCanvasElement>(panel, '[data-lienzo]');
  const ctx = lienzo.getContext('2d')!;
  const tiempoEl = $<HTMLElement>(panel, '[data-tiempo]');
  const puntosEl = $<HTMLElement>(panel, '[data-puntos]');
  const empezar = $<HTMLButtonElement>(panel, '[data-empezar]');
  const leyenda = $<HTMLUListElement>(panel, '[data-leyenda]');
  const DURACION = 20;

  leyenda.replaceChildren(
    ...todos.map((s) => {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-1.5';
      const punto = document.createElement('span');
      punto.className = 'inline-block size-3.5 rounded-full border-2 border-tinta';
      punto.style.background = s.hex;
      li.append(punto, `${s.nombre} · ${valor(s)} pt`);
      return li;
    }),
  );

  const imagenes = new Map<string, HTMLImageElement>();
  todos.forEach((s) => {
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgCompleto(s.id))}`;
    imagenes.set(s.id, img);
  });

  interface Cae { x: number; y: number; v: number; sabor: Sabor; giro: number }
  let W = 0, H = 0;
  let bandeja = 0.5;
  let izquierda = false, derecha = false;
  let caen: Cae[] = [];
  let conteo = new Map<Sabor, number>();
  let puntos = 0;
  let inicio = 0, ultimo = 0, ultimaCaida = 0;
  let raf = 0;
  let jugando = false;

  function valor(s: Sabor) {
    return Math.max(1, s.llamas - 1);
  }

  function medir() {
    const r = lienzo.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width;
    H = r.height;
    lienzo.width = Math.round(W * dpr);
    lienzo.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!jugando) dibujar();
  }
  new ResizeObserver(medir).observe(lienzo);

  const radio = () => Math.max(14, W * 0.042);
  const anchoBandeja = () => Math.max(80, W * 0.22);

  function dibujarMochi(c: Cae) {
    const r = radio();
    const img = imagenes.get(c.sabor.id);
    const ancho = r * 2.6, alto = ancho * (280 / 240);
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(Math.sin(c.giro) * 0.22);
    // aplastar y estirar mientras cae
    const estira = 1 + Math.sin(c.giro * 1.7) * 0.06;
    ctx.scale(2 - estira, estira);
    if (img?.complete && img.naturalWidth) {
      ctx.drawImage(img, -ancho / 2, -alto * 0.62, ancho, alto);
    } else {
      ctx.fillStyle = c.sabor.hex;
      ctx.strokeStyle = '#3A1F3D';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 1.1, r * 0.92, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function dibujar(mensaje?: string) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(58,31,61,.08)';
    for (let x = 12; x < W; x += 24) for (let y = 12; y < H; y += 24) ctx.fillRect(x, y, 3, 3);
    caen.forEach(dibujarMochi);
    const bw = anchoBandeja(), bh = 16;
    const bx = bandeja * (W - bw), by = H - bh - 10;
    ctx.fillStyle = '#FFC107';
    ctx.strokeStyle = '#3A1F3D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 8);
    ctx.fill();
    ctx.stroke();
    if (mensaje) {
      ctx.fillStyle = '#3A1F3D';
      ctx.font = `${Math.max(18, W * 0.04)}px "Bagel Fat One", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(mensaje, W / 2, H / 2);
    }
  }

  function bucle(t: number) {
    const dt = Math.min(0.05, (t - ultimo) / 1000);
    ultimo = t;
    const pasado = (t - inicio) / 1000;
    const restante = Math.max(0, DURACION - pasado);
    tiempoEl.textContent = String(Math.ceil(restante));

    if (izquierda) bandeja = Math.max(0, bandeja - dt * 1.4);
    if (derecha) bandeja = Math.min(1, bandeja + dt * 1.4);

    const ritmo = 700 - pasado * 18;
    if (t - ultimaCaida > ritmo) {
      ultimaCaida = t;
      const r = radio();
      caen.push({ x: r + Math.random() * (W - 2 * r), y: -r * 2, v: H * (0.35 + pasado * 0.02 + Math.random() * 0.15), sabor: azar(todos), giro: Math.random() * 6 });
    }

    const bw = anchoBandeja();
    const bx = bandeja * (W - bw);
    const by = H - 26;
    caen = caen.filter((c) => {
      c.y += c.v * dt;
      c.giro += dt * 6;
      const r = radio();
      if (c.y + r * 0.9 >= by && c.y - r < by + 16 && c.x > bx - r * 0.5 && c.x < bx + bw + r * 0.5) {
        puntos += valor(c.sabor);
        conteo.set(c.sabor, (conteo.get(c.sabor) ?? 0) + 1);
        puntosEl.textContent = String(puntos);
        return false;
      }
      return c.y - r < H;
    });

    dibujar();
    if (restante <= 0) return fin();
    raf = requestAnimationFrame(bucle);
  }

  function fin() {
    jugando = false;
    lienzo.style.touchAction = '';
    caen = [];
    dibujar('¡Tiempo!');
    empezar.disabled = false;
    empezar.textContent = 'Jugar otra vez';
    let mejor: Sabor = todos[0];
    let max = -1;
    for (const [s, n] of conteo) {
      const peso = n * 10 + s.llamas;
      if (peso > max) { max = peso; mejor = s; }
    }
    if (max < 0) {
      alResultado('atrapa', todos[0], 'Se te escaparon todos', 'No pasa nada: empieza suave con un mochi de Fresa y vuelve a intentarlo.');
      return;
    }
    alResultado('atrapa', mejor, `¡Te toca un mochi de ${mejor.nombre}!`, `Hiciste ${puntos} puntos y el que más atrapaste fue ${mejor.nombre}.`);
  }

  empezar.addEventListener('click', () => {
    if (jugando) return;
    $<HTMLElement>(panel, '[data-resultado]').hidden = true;
    medir();
    jugando = true;
    lienzo.style.touchAction = 'none'; // mientras juega, el dedo mueve la bandeja y no la página
    caen = [];
    conteo = new Map();
    puntos = 0;
    puntosEl.textContent = '0';
    empezar.disabled = true;
    lienzo.focus({ preventScroll: true });
    inicio = ultimo = ultimaCaida = performance.now();
    raf = requestAnimationFrame(bucle);
  });

  const mover = (e: PointerEvent) => {
    const r = lienzo.getBoundingClientRect();
    bandeja = Math.min(1, Math.max(0, (e.clientX - r.left - anchoBandeja() / 2) / (r.width - anchoBandeja())));
    if (!jugando) dibujar();
  };
  lienzo.addEventListener('pointermove', mover);
  lienzo.addEventListener('pointerdown', mover);
  lienzo.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { izquierda = true; e.preventDefault(); }
    if (e.key === 'ArrowRight') { derecha = true; e.preventDefault(); }
  });
  lienzo.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') izquierda = false;
    if (e.key === 'ArrowRight') derecha = false;
  });

  return {
    preparar() {
      empezar.disabled = false;
      empezar.textContent = 'Empezar';
      tiempoEl.textContent = String(DURACION);
      puntosEl.textContent = '0';
      requestAnimationFrame(() => { medir(); dibujar('Pulsa Empezar'); });
    },
    detener() {
      cancelAnimationFrame(raf);
      jugando = false;
      lienzo.style.touchAction = '';
      caen = [];
    },
  };
}

/* ───────────── Juego 2: Memoria picante ───────────── */
function juegoMemoria(panel: HTMLElement, alResultado: AlResultado): Minijuego {
  const tablero = $<HTMLElement>(panel, '[data-tablero]');
  const parejasEl = $<HTMLElement>(panel, '[data-parejas]');
  const intentosEl = $<HTMLElement>(panel, '[data-intentos]');
  const aviso = $<HTMLElement>(panel, '[data-aviso]');
  let abiertas: HTMLButtonElement[] = [];
  let parejas = 0, intentos = 0;
  let estrella: Sabor | null = null;
  let bloqueado = false;
  let temporizador = 0;

  function repartir() {
    clearTimeout(temporizador);
    abiertas = [];
    parejas = intentos = 0;
    estrella = null;
    bloqueado = false;
    parejasEl.textContent = '0';
    intentosEl.textContent = '0';
    $<HTMLElement>(panel, '[data-resultado]').hidden = true;

    const cartas = barajar([...todos, ...todos]).map((sabor, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carta';
      b.dataset.sabor = sabor.nombre;
      b.setAttribute('aria-label', `Carta ${i + 1}, boca abajo`);
      b.style.setProperty('--retraso', `${i * 45}ms`);
      b.innerHTML = `<span class="carta-cara carta-dorso" aria-hidden="true"><svg viewBox="0 0 40 56" width="22" height="31"><use href="#llama"/></svg></span><span class="carta-cara carta-frente" aria-hidden="true"><svg viewBox="-10 -10 260 300" class="carta-mochi"><g class="${animacionSabor[sabor.id]}"><use href="#s-${sabor.id}" width="240" height="280"/></g></svg></span>`;
      b.querySelector<HTMLElement>('.carta-frente')!.style.background = sabor.hex;
      b.addEventListener('click', () => voltear(b, sabor, i));
      return b;
    });
    tablero.replaceChildren(...cartas);
  }

  function voltear(b: HTMLButtonElement, sabor: Sabor, i: number) {
    if (bloqueado || b.classList.contains('abierta')) return;
    b.classList.add('abierta');
    b.setAttribute('aria-label', `Carta ${i + 1}: ${sabor.nombre}`);
    abiertas.push(b);
    if (abiertas.length < 2) return;

    intentos++;
    intentosEl.textContent = String(intentos);
    const [a, c] = abiertas;
    if (a.dataset.sabor === c.dataset.sabor) {
      parejas++;
      parejasEl.textContent = String(parejas);
      estrella ??= sabor;
      [a, c].forEach((x) => {
        x.classList.add('pareja');
        x.disabled = true;
        x.setAttribute('aria-label', `${sabor.nombre}, pareja encontrada`);
      });
      aviso.textContent = `¡Pareja de ${sabor.nombre}!`;
      abiertas = [];
      if (parejas === todos.length && estrella) {
        const s = estrella;
        temporizador = window.setTimeout(() => alResultado('memoria', s, `Tu sabor estrella: ${s.nombre}`, `Completaste el tablero en ${intentos} intentos. ${s.nombre} fue tu primera pareja, así que es tu mochi.`), 500);
      }
    } else {
      aviso.textContent = `${a.dataset.sabor} y ${c.dataset.sabor} no son pareja.`;
      bloqueado = true;
      temporizador = window.setTimeout(() => {
        [a, c].forEach((x, k) => {
          x.classList.remove('abierta');
          x.setAttribute('aria-label', `Carta ${[...tablero.children].indexOf(x) + 1}, boca abajo`);
          if (k === 1) bloqueado = false;
        });
        abiertas = [];
      }, 850);
    }
  }

  $<HTMLButtonElement>(panel, '[data-reiniciar]').addEventListener('click', repartir);
  return { preparar: repartir, detener: () => clearTimeout(temporizador) };
}

/* ───────────── Juego 3: Caja de la suerte ───────────── */
function juegoCaja(panel: HTMLElement, alResultado: AlResultado): Minijuego {
  const botones = [...panel.querySelectorAll<HTMLButtonElement>('[data-caja]')];
  const otra = $<HTMLButtonElement>(panel, '[data-otra-caja]');
  const minirretos = [
    'Cómelo en dos bocados.',
    'Cómelo con los ojos cerrados y adivina el sabor.',
    'Compártelo con quien te mandó la web.',
    'Aguanta 30 segundos sin agua después del último bocado.',
    'Grábate comiéndolo y etiquétanos.',
    'Pídelo junto a un Cayena y elige quién se come cuál.',
  ];
  let temporizador = 0;

  function reiniciar() {
    clearTimeout(temporizador);
    otra.hidden = true;
    $<HTMLElement>(panel, '[data-resultado]').hidden = true;
    botones.forEach((b, i) => {
      b.disabled = false;
      b.classList.remove('abierta', 'descartada');
      b.setAttribute('aria-label', `Caja ${i + 1}`);
    });
  }

  botones.forEach((b) =>
    b.addEventListener('click', () => {
      const sabor = azar(todos);
      const reto = azar(minirretos);
      b.querySelector('[data-caja-mascota]')!.setAttribute('href', `#s-${sabor.id}`);
      botones.forEach((x) => {
        x.disabled = true;
        x.classList.add(x === b ? 'abierta' : 'descartada');
      });
      b.setAttribute('aria-label', `Caja abierta: ${sabor.nombre}`);
      temporizador = window.setTimeout(() => {
        otra.hidden = false;
        alResultado('caja', sabor, `¡Salió un mochi de ${sabor.nombre}!`, `Mini reto: ${reto}`);
      }, quieto() ? 0 : 1100);
    }),
  );
  otra.addEventListener('click', reiniciar);

  return { preparar: reiniciar, detener: () => clearTimeout(temporizador) };
}
