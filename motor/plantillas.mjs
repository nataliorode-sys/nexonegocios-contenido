// Plantillas fijas de carrusel (1080x1350) e historia (1080x1920).
import { color, cssBase, logo, firma, md, fondos, temas } from "./marca.mjs";

const css = `
${cssBase}
.lienzo { position: relative; overflow: hidden; display: flex; flex-direction: column; padding: 96px 92px 0; }
.lienzo.oscuro { background: ${color.marino}; color: #fff; }
.lienzo.claro { background: ${color.papel}; }
.lienzo.f-blanco { background: ${fondos.blanco}; }
.lienzo.f-salvia { background: ${fondos.salvia}; }
.f-salvia .col.mal { background: rgba(255,255,255,.7); }
.f-salvia table.t td, .f-salvia ol.items li { border-color: #C9DCC4; }
.f-salvia .etiqueta-paso { color: #BCD8B5; }
.isotipo { position: absolute; right: -70px; bottom: 150px; height: 560px; opacity: .07; pointer-events: none; }
.story .isotipo { bottom: 330px; height: 700px; }
.kicker { display: inline-flex; align-items: center; gap: 14px; font-weight: 800; font-size: 26px; letter-spacing: .16em; text-transform: uppercase; color: ${color.verde}; }
.kicker::before { content: ""; width: 44px; height: 4px; background: ${color.verde}; }
.pie { position: absolute; left: 92px; right: 92px; bottom: 64px; display: flex; align-items: center; justify-content: space-between; font-size: 24px; color: ${color.gris}; }
.oscuro .pie { color: rgba(255,255,255,.62); }
.pie img { height: 54px; }
.pie .num { font-weight: 600; letter-spacing: .08em; }
.titulo { font-family: Fraunces, serif; font-weight: 700; line-height: 1.04; letter-spacing: -0.015em; }
.cuerpo { font-size: 44px; line-height: 1.4; color: ${color.tinta}; }
.oscuro .cuerpo { color: rgba(255,255,255,.88); }
.cuerpo p + p { margin-top: 26px; }
.regla { height: 3px; width: 120px; background: ${color.verde}; margin: 40px 0; }
.etiqueta-paso { font-family: Fraunces, serif; font-weight: 700; font-size: 150px; line-height: .9; color: #CFE6CB; }
.oscuro .etiqueta-paso { color: rgba(255,255,255,.12); }
table.t { width: 100%; border-collapse: collapse; font-size: 38px; margin-top: 36px; }
table.t td { padding: 22px 0; border-bottom: 2px solid ${color.linea}; }
table.t td.v { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; padding-left: 24px; }
table.t tr.mas td.v { color: ${color.verde}; }
table.t tr.menos td.v { color: ${color.rojo}; }
table.t tr.total td { border-bottom: none; border-top: 4px solid ${color.marino}; font-weight: 800; font-size: 38px; color: ${color.marino}; }
.nota { font-size: 26px; color: ${color.gris}; margin-top: 28px; line-height: 1.4; }
.oscuro .nota { color: rgba(255,255,255,.6); }
ol.items { list-style: none; margin-top: 30px; }
ol.items li { display: grid; grid-template-columns: 76px 1fr; gap: 10px; padding: 24px 0; border-bottom: 2px solid ${color.linea}; }
.oscuro ol.items li { border-color: rgba(255,255,255,.16); }
ol.items .n { font-family: Fraunces, serif; font-weight: 700; font-size: 44px; color: ${color.verde}; line-height: 1.1; }
ol.items .it { font-size: 40px; font-weight: 800; color: ${color.marino}; line-height: 1.2; }
.oscuro ol.items .it { color: #fff; }
ol.items .id { font-size: 33px; color: ${color.gris}; line-height: 1.35; margin-top: 6px; }
.oscuro ol.items .id { color: rgba(255,255,255,.7); }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 40px; }
.col { border-radius: 22px; padding: 38px 34px; }
.col.mal { background: #fff; border: 2px solid ${color.linea}; }
.col.bien { background: ${color.marino}; color: #fff; }
.col h3 { font-size: 26px; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 22px; }
.col.mal h3 { color: ${color.rojo}; }
.col.bien h3 { color: #8FD18F; }
.col li { list-style: none; font-size: 35px; line-height: 1.32; padding: 14px 0; }
.col.mal li { color: ${color.tinta}; }
.dato { white-space: nowrap; font-family: Fraunces, serif; font-weight: 700; font-size: 230px; line-height: .95; color: ${color.marino}; letter-spacing: -0.03em; }
.oscuro .dato { color: #fff; }
.dato-label { font-size: 40px; font-weight: 800; color: ${color.verde}; margin-top: 18px; }
.firma { display: flex; flex-direction: column; gap: 6px; margin-top: 56px; font-size: 30px; }
.centrado { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 150px; }
.firma .nom { font-weight: 800; color: ${color.marino}; font-size: 32px; }
.oscuro .firma .nom { color: #fff; }
.firma .car { color: ${color.gris}; }
.oscuro .firma .car { color: rgba(255,255,255,.65); }
.guardalo { display: inline-flex; align-items: center; gap: 16px; background: ${color.verde}; color: #fff; font-weight: 800; font-size: 30px; padding: 20px 30px; border-radius: 100px; margin-top: 44px; align-self: flex-start; }
.titulo b { color: ${color.verde}; }
.marco-sticker { height: 300px; }
.story .cuerpo { font-size: 54px; }
.story .kicker { font-size: 32px; }
.story .pie img { height: 66px; }
.story .pie { font-size: 30px; } /* espacio vacío reservado para el sticker de Instagram */
`;

const pie = (s, i, n, oscuro, story) => `
  <div class="pie" ${story ? 'style="bottom:150px"' : ""}>
    <img src="${oscuro ? logo.oscuro : logo.claro}">
    <span class="num">${n > 1 && !story ? `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}${i === 0 ? " &nbsp;·&nbsp; Deslizá →" : ""}` : firma.usuario}</span>
  </div>`;

const parrafos = (t) => String(t || "").split(/\n\n+/).map((p) => `<p>${md(p)}</p>`).join("");

const layouts = {
  portada: (s) => `
    <div class="kicker">${md(s.kicker || "")}</div>
    <div style="flex:1; display:flex; flex-direction:column; justify-content:center; padding-bottom: 120px;">
      <div class="titulo" style="font-size:${s.tam || 104}px">${md(s.titulo)}</div>
      ${s.bajada ? `<div class="regla"></div><div class="cuerpo" style="font-size:40px">${md(s.bajada)}</div>` : ""}
    </div>`,
  texto: (s) => `
    ${s.paso ? `<div class="etiqueta-paso">${s.paso}</div>` : s.kicker ? `<div class="kicker">${md(s.kicker)}</div>` : ""}
    <div class="titulo" style="font-size:${s.tam || 78}px; margin-top:${s.paso ? 10 : 40}px">${md(s.titulo)}</div>
    <div class="regla"></div>
    <div class="cuerpo">${parrafos(s.cuerpo)}</div>`,
  dato: (s) => `
    ${s.kicker ? `<div class="kicker">${md(s.kicker)}</div>` : ""}
    <div style="flex:1; display:flex; flex-direction:column; justify-content:center; padding-bottom:140px">
      <div class="dato" style="font-size:${s.tam || 230}px">${md(s.dato)}</div>
      <div class="dato-label">${md(s.label)}</div>
      <div class="regla"></div>
      <div class="cuerpo">${parrafos(s.cuerpo)}</div>
    </div>`,
  tabla: (s) => `
    ${s.kicker ? `<div class="kicker">${md(s.kicker)}</div>` : ""}
    <div class="titulo" style="font-size:${s.tam || 60}px; margin-top:36px">${md(s.titulo)}</div>
    <table class="t">${s.filas.map(([a, b, tipo]) => `<tr class="${tipo || ""}"><td>${md(a)}</td><td class="v">${md(b)}</td></tr>`).join("")}</table>
    ${s.nota ? `<div class="nota">${md(s.nota)}</div>` : ""}`,
  lista: (s) => `
    ${s.kicker ? `<div class="kicker">${md(s.kicker)}</div>` : ""}
    <div class="titulo" style="font-size:${s.tam || 60}px; margin-top:36px">${md(s.titulo)}</div>
    <ol class="items">${s.items.map((it, k) => `<li><div class="n">${k + 1}</div><div><div class="it">${md(it.t ?? it)}</div>${it.d ? `<div class="id">${md(it.d)}</div>` : ""}</div></li>`).join("")}</ol>`,
  comparacion: (s) => `
    ${s.kicker ? `<div class="kicker">${md(s.kicker)}</div>` : ""}
    <div class="titulo" style="font-size:${s.tam || 58}px; margin-top:36px">${md(s.titulo)}</div>
    <div class="cols">
      <div class="col mal"><h3>${md(s.izq.titulo)}</h3><ul>${s.izq.items.map((x) => `<li>${md(x)}</li>`).join("")}</ul></div>
      <div class="col bien"><h3>${md(s.der.titulo)}</h3><ul>${s.der.items.map((x) => `<li>${md(x)}</li>`).join("")}</ul></div>
    </div>`,
  clave: (s) => `
    <div class="kicker">${md(s.kicker || "La clave")}</div>
    <div style="flex:1; display:flex; align-items:center; padding-bottom:140px">
      <div class="titulo" style="font-size:${s.tam || 80}px">${md(s.texto)}</div>
    </div>`,
  cierre: (s) => `
    <div class="kicker">${md(s.kicker || "En resumen")}</div>
    <div class="titulo" style="font-size:${s.tam || 58}px; margin-top:36px">${md(s.titulo)}</div>
    <div class="regla"></div>
    <div class="cuerpo">${parrafos(s.cuerpo)}</div>
    ${s.cta ? `<div class="guardalo">${md(s.cta)}</div>` : ""}
    <div class="firma"><span class="nom">${firma.nombre}</span><span class="car">${firma.cargo}</span></div>`,
  // historias
  encuesta: (s) => `
    <div class="kicker">${md(s.kicker || "Encuesta")}</div>
    <div class="titulo" style="font-size:${s.tam || 112}px; margin-top:60px">${md(s.titulo)}</div>
    ${s.cuerpo ? `<div class="cuerpo" style="margin-top:40px">${parrafos(s.cuerpo)}</div>` : ""}
    <div style="margin-top:70px" class="marco-sticker"></div>`,
  teaser: (s) => `
    <div class="kicker">${md(s.kicker || "Nuevo post")}</div>
    <div style="flex:1; display:flex; flex-direction:column; justify-content:center; padding-bottom:200px">
      <div class="titulo" style="font-size:${s.tam || 116}px">${md(s.titulo)}</div>
      ${s.cuerpo ? `<div class="regla"></div><div class="cuerpo">${parrafos(s.cuerpo)}</div>` : ""}
      <div style="margin-top:60px" class="marco-sticker"></div>
    </div>`,
};

export function htmlEstatico(pieza, s, i, n, ancho, alto) {
  const story = pieza.tipo === "historia";
  const tema = temas[pieza.tema] || temas.noche;
  const rol = s.layout === "clave" ? "clave" : s.layout === "cierre" ? "cierre" : (i === 0 && !story) || s.layout === "encuesta" ? "portada" : "interior";
  const fondo = s.fondo || tema[rol];
  const oscuro = fondo === "oscuro";
  const marcaAgua = !oscuro && (rol === "portada" || s.layout === "teaser") ? `<img class="isotipo" src="${logo.isotipo}">` : "";
  const f = layouts[s.layout];
  if (!f) throw new Error(`Layout desconocido: ${s.layout} en ${pieza.id}`);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
  <body><div class="lienzo ${oscuro ? "oscuro" : `claro f-${fondo}`} ${story ? "story" : ""}" style="width:${ancho}px;height:${alto}px;${story ? "padding-top:250px" : ""}">
    ${marcaAgua}
    ${["texto","tabla","lista","comparacion","cierre","encuesta"].includes(s.layout) ? `<div class="centrado">${f(s)}</div>` : f(s)}
    ${pie(s, i, n, oscuro, story)}
  </div></body></html>`;
}
