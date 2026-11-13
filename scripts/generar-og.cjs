/**
 * Genera public/og.png (1200x630) con los mochis del sitio.
 * Uso: npm run build && node scripts/generar-og.cjs
 * Necesita Playwright con Chromium instalado.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(raiz, 'dist/index.html'), 'utf8');
const sprite = html.match(/<svg width="0" height="0"[\s\S]*?<\/svg>/)[0];

const m = (href, w, extra = '') =>
  `<svg viewBox="0 0 240 280" width="${w}" height="${Math.round(w * 280 / 240)}" style="overflow:visible;${extra}"><use href="#${href}" width="240" height="280"/></svg>`;

const pagina = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0}
.og{width:1200px;height:630px;position:relative;overflow:hidden;font-family:'Bagel Fat One',sans-serif;color:#3A1F3D;
background:#FFF1A8 radial-gradient(rgba(58,31,61,.14) 2.4px,transparent 3px) 0 0/26px 26px;border:10px solid #3A1F3D}
.txt{position:absolute;left:64px;top:56px;width:640px;display:flex;flex-direction:column;gap:22px}
.marca{font-size:44px;color:#B3101A}
h1{margin:0;font-weight:400;font-size:88px;line-height:.95}
h1 span{color:#B3101A}
.chips{display:flex;gap:14px}
.chip{background:#fff;border:4px solid #3A1F3D;border-radius:999px;padding:8px 22px;font-size:28px;box-shadow:4px 4px 0 #3A1F3D}
.blob{position:absolute;right:70px;top:70px;width:400px;height:400px;background:#FFD6E2;border:5px solid #3A1F3D;
border-radius:50% 50% 46% 54%/60% 56% 44% 40%;box-shadow:8px 8px 0 #3A1F3D;display:grid;place-items:center}
.fila{position:absolute;right:40px;bottom:30px;display:flex;align-items:flex-end;gap:6px}
</style></head><body>${sprite}
<div class="og">
  <div class="txt">
    <div class="marca">Holy Mochi</div>
    <h1>Mochis que pican. <span>Mochis que retan.</span></h1>
    <div class="chips"><span class="chip">Maracaibo</span><span class="chip">Todos a $1</span></div>
  </div>
  <div class="blob">${m('m4', 250, 'transform:translateY(-10px)')}</div>
  <div class="fila">${m('s-pinaparchita', 92)}${m('s-fresa', 92)}${m('s-chocolate', 92)}${m('s-ajipimienta', 92)}${m('s-cayenapiripiri', 92)}${m('s-cuatrofuegos', 92)}</div>
</div></body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(pagina, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.locator('.og').screenshot({ path: path.join(raiz, 'public/og.png') });
  await b.close();
  console.log('public/og.png listo');
})();
