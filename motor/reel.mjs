// Reels sin cara: escenas de texto animado (1080x1920), cuadro por cuadro.
import { color, cssBase, logo, firma, md, sinCorte, fondos, temas } from "./marca.mjs";

const css = `
${cssBase}
body { width: 1080px; height: 1920px; overflow: hidden; }
.escena { position: absolute; inset: 0; padding: 300px 96px 0; display: flex; flex-direction: column; opacity: 0; }
.escena.oscuro { background: ${color.marino}; color: #fff; }
.escena.claro { background: ${color.papel}; }
.escena.f-blanco { background: ${fondos.blanco}; }
.escena.f-salvia { background: ${fondos.salvia}; }
.f-salvia .col.mal { background: rgba(255,255,255,.7); }
.f-salvia .fila, .f-salvia .item { border-color: #C9DCC4; }
.a { opacity: 0; will-change: transform, opacity; }
.marca { position: absolute; top: 120px; left: 96px; height: 58px; z-index: 5; }
.barra { position: absolute; top: 0; left: 0; height: 10px; background: ${color.verde}; z-index: 6; }
.kicker { display: inline-flex; align-items: center; gap: 16px; font-weight: 800; font-size: 34px; letter-spacing: .16em; text-transform: uppercase; color: ${color.verde}; }
.kicker::before { content: ""; width: 54px; height: 5px; background: ${color.verde}; }
.titulo { font-family: Fraunces, serif; font-weight: 700; line-height: 1.05; letter-spacing: -0.015em; }
.linea { font-size: 56px; line-height: 1.32; margin-top: 30px; }
.oscuro .linea { color: rgba(255,255,255,.9); }
.dato { font-family: Fraunces, serif; font-weight: 700; font-size: 250px; line-height: .95; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.claro .dato { color: ${color.marino}; }
.dato-label { font-size: 52px; font-weight: 800; color: ${color.verde}; margin-top: 26px; }
.fila { display: flex; justify-content: space-between; gap: 24px; font-size: 48px; padding: 30px 0; border-bottom: 3px solid ${color.linea}; }
.oscuro .fila { border-color: rgba(255,255,255,.18); }
.fila .v { font-weight: 800; white-space: nowrap; font-variant-numeric: tabular-nums; }
.fila.mas .v { color: ${color.verde}; }
.fila.menos .v { color: #E07A5F; }
.claro .fila.menos .v { color: ${color.rojo}; }
.fila.total { border-bottom: none; border-top: 6px solid ${color.verde}; font-weight: 800; font-size: 52px; }
.item { display: grid; grid-template-columns: 90px 1fr; padding: 30px 0; border-bottom: 3px solid ${color.linea}; }
.oscuro .item { border-color: rgba(255,255,255,.18); }
.item .n { font-family: Fraunces, serif; font-weight: 700; font-size: 60px; color: ${color.verde}; line-height: 1; }
.item .t { font-size: 52px; font-weight: 800; line-height: 1.2; }
.item .d { font-size: 42px; line-height: 1.32; margin-top: 8px; opacity: .75; }
.col { border-radius: 26px; padding: 40px 38px; margin-top: 34px; }
.col h3 { font-size: 32px; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 14px; }
.col p { font-size: 50px; line-height: 1.3; }
.col.mal { background: rgba(255,255,255,.07); border: 3px solid rgba(255,255,255,.18); }
.claro .col.mal { background: #fff; border-color: ${color.linea}; }
.col.mal h3 { color: #E07A5F; }
.claro .col.mal h3 { color: ${color.rojo}; }
.col.bien { background: ${color.verde}; color: #fff; }
.col.bien h3 { color: #fff; opacity: .85; }
.firma { margin-top: 50px; font-size: 38px; line-height: 1.4; }
.firma b { display: block; font-size: 46px; }
.seguir { margin-top: 60px; display: inline-flex; align-self: flex-start; background: ${color.verde}; color: #fff; font-weight: 800; font-size: 44px; padding: 26px 42px; border-radius: 100px; }
.centro { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 260px; }
.titulo b { color: ${color.verde}; }
.col.bien b { color: #fff; text-decoration: underline; text-decoration-thickness: 4px; text-underline-offset: 8px; }
`;

// tamaño del número grande según su largo final, para que entre en 888 px
const tamDato = (s) => { const n = `${s.antes || ""}${Number(s.valor).toLocaleString("es-AR")}${s.despues || ""}`.length; return n <= 4 ? 250 : n <= 6 ? 200 : n <= 8 ? 160 : 130; };
const palabras = (s) => JSON.stringify(s).replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean).length;

// Cada escena devuelve [html, últimoIn]. data-in: segundos desde el inicio de la escena.
const escenas = {
  gancho: (s) => {
    // palabra por palabra, conservando **negrita** y ==verde== aunque abarquen varias
    let neg = false, ver = false;
    const ws = sinCorte(s.texto).split(/[ \n]+/).map((w) => {
      const abreN = w.startsWith("**"), abreV = w.startsWith("==");
      if (abreN) neg = true;
      if (abreV) ver = true;
      let h = md(w.replace(/\*\*|==/g, ""));
      if (neg) h = `<b>${h}</b>`;
      if (ver) h = `<span class="verde">${h}</span>`;
      if (w.endsWith("**") && (!abreN || w.length > 4)) neg = false;
      if (w.endsWith("==") && (!abreV || w.length > 4)) ver = false;
      return h;
    });
    const html = `<div class="centro">${s.kicker ? `<div class="kicker a" data-in="0">${md(s.kicker)}</div>` : ""}
      <div class="titulo" style="font-size:${s.tam || 112}px; margin-top:40px">${ws.map((w, k) => `<span class="a" data-in="${(0.15 + k * 0.13).toFixed(2)}" data-dy="20">${w}</span>`).join(" ")}</div></div>`;
    return [html, 0.15 + ws.length * 0.13];
  },
  texto: (s) => {
    let t = 0;
    const partes = [];
    if (s.kicker) { partes.push(`<div class="kicker a" data-in="0">${md(s.kicker)}</div>`); t = 0.3; }
    if (s.titulo) { partes.push(`<div class="titulo a" data-in="${t}" style="font-size:${s.tam || 84}px; margin-top:34px">${md(s.titulo)}</div>`); t += 0.9; }
    for (const l of s.lineas || []) { partes.push(`<div class="linea a" data-in="${t.toFixed(2)}">${md(l)}</div>`); t += 0.4 + palabras(l) / 5; }
    return [`<div class="centro">${partes.join("")}</div>`, t];
  },
  dato: (s) => {
    const html = `<div class="centro">${s.kicker ? `<div class="kicker a" data-in="0">${md(s.kicker)}</div>` : ""}
      <div class="dato a" data-in="0.2" style="margin-top:40px; white-space:nowrap; font-size:${s.tam || tamDato(s)}px">${s.antes || ""}<span data-cuenta="${s.valor}" data-dec="${s.decimales || 0}">0</span>${sinCorte(s.despues || "").replace(/ /g, "\u00A0")}</div>
      <div class="dato-label a" data-in="1.2">${md(s.label)}</div>
      ${s.linea ? `<div class="linea a" data-in="1.8">${md(s.linea)}</div>` : ""}</div>`;
    return [html, s.linea ? 1.8 + palabras(s.linea) / 4.2 : 1.6];
  },
  tabla: (s) => {
    let t = 0.9;
    const filas = s.filas.map(([a, b, tipo]) => { const r = `<div class="fila a ${tipo || ""}" data-in="${t.toFixed(2)}"><span>${md(a)}</span><span class="v">${md(b)}</span></div>`; t += tipo === "total" ? 1.1 : 0.75; return r; });
    return [`<div class="centro">${s.kicker ? `<div class="kicker a" data-in="0">${md(s.kicker)}</div>` : ""}<div class="titulo a" data-in="0.1" style="font-size:${s.tam || 74}px; margin:34px 0 20px">${md(s.titulo)}</div>${filas.join("")}</div>`, t + 0.4];
  },
  lista: (s) => {
    let t = 1;
    const items = s.items.map((it, k) => { const r = `<div class="item a" data-in="${t.toFixed(2)}"><div class="n">${k + 1}</div><div><div class="t">${md(it.t ?? it)}</div>${it.d ? `<div class="d">${md(it.d)}</div>` : ""}</div></div>`; t += 0.5 + palabras(it) / 5.2; return r; });
    return [`<div class="centro">${s.kicker ? `<div class="kicker a" data-in="0">${md(s.kicker)}</div>` : ""}<div class="titulo a" data-in="0.1" style="font-size:${s.tam || 74}px; margin:34px 0 10px">${md(s.titulo)}</div>${items.join("")}</div>`, t];
  },
  comparacion: (s) => {
    const t2 = 1.2 + palabras(s.izq) / 4.2;
    return [`<div class="centro">${s.titulo ? `<div class="titulo a" data-in="0" style="font-size:${s.tam || 70}px">${md(s.titulo)}</div>` : ""}
      <div class="col mal a" data-in="0.7"><h3>${md(s.izq.titulo)}</h3><p>${md(s.izq.texto)}</p></div>
      <div class="col bien a" data-in="${t2.toFixed(2)}"><h3>${md(s.der.titulo)}</h3><p>${md(s.der.texto)}</p></div></div>`, t2 + palabras(s.der) / 4.2];
  },
  cierre: (s) => [`<div class="centro">
      <div class="titulo a" data-in="0" style="font-size:${s.tam || 80}px">${md(s.texto || "Guardalo para cuando lo necesites.")}</div>
      <div class="seguir a" data-in="0.8">Seguí a ${firma.usuario}</div>
      <div class="firma a" data-in="1.3"><b>${firma.nombre}</b>${firma.cargo}</div></div>`, 2.6],
};

export function construirReel(pieza) {
  let inicio = 0;
  const bloques = [];
  const tiempos = [];
  pieza.escenas.forEach((s, k) => {
    const f = escenas[s.layout];
    if (!f) throw new Error(`Escena desconocida: ${s.layout} en ${pieza.id}`);
    const [html, ultimo] = f(s);
    const dur = s.dur || Math.max(2.6, ultimo + 1.5);
    const ciclo = (temas[pieza.tema] || temas.noche).reel;
    const fondo = s.fondo || (s.layout === "cierre" && pieza.tema !== "papel" ? "oscuro" : ciclo[k % ciclo.length]);
    const oscuro = fondo === "oscuro";
    bloques.push(`<div class="escena ${oscuro ? "oscuro" : `claro f-${fondo}`}" data-ini="${inicio}" data-dur="${dur}" data-tono="${oscuro ? "o" : "c"}">${html}</div>`);
    tiempos.push({ inicio, dur, oscuro });
    inicio += dur;
  });
  const total = inicio;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
    ${bloques.join("")}
    <img class="marca" id="mo" src="${logo.oscuro}"><img class="marca" id="mc" src="${logo.claro}">
    <div class="barra" id="barra"></div>
    <script>
      const total = ${total};
      const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
      const escenas = [...document.querySelectorAll('.escena')];
      window.__t = (t) => {
        document.getElementById('barra').style.width = (100 * t / total) + '%';
        let tono = 'o';
        for (const e of escenas) {
          const ini = +e.dataset.ini, dur = +e.dataset.dur, loc = t - ini;
          const vis = loc >= -0.001 && loc < dur;
          e.style.opacity = vis ? Math.min(1, ease(loc / 0.25)) : 0;
          e.style.zIndex = vis ? 2 : 1;
          if (vis) tono = e.dataset.tono;
          for (const a of e.querySelectorAll('.a')) {
            const p = ease((loc - +a.dataset.in) / 0.45);
            a.style.opacity = p;
            a.style.display = a.tagName === 'SPAN' ? 'inline-block' : '';
            a.style.transform = 'translateY(' + ((1 - p) * (+a.dataset.dy || 36)) + 'px)';
          }
          for (const c of e.querySelectorAll('[data-cuenta]')) {
            const p = ease((loc - 0.2) / 1.3), v = +c.dataset.cuenta * p, d = +c.dataset.dec;
            c.textContent = v.toLocaleString('es-AR', { minimumFractionDigits: d, maximumFractionDigits: d });
          }
        }
        document.getElementById('mo').style.opacity = tono === 'o' ? 1 : 0;
        document.getElementById('mc').style.opacity = tono === 'c' ? 1 : 0;
      };
      window.__t(0);
    </script></body></html>`;
  return { html, total, tiempos };
}
