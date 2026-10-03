// Genera todas las piezas de un mes a partir de contenido/<mes>/*.json
// Uso: node motor/generar.mjs 2026-10 [id-de-pieza]
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import { RAIZ, rotacion } from "./marca.mjs";
import { htmlEstatico } from "./plantillas.mjs";
import { construirReel } from "./reel.mjs";

const [mes, soloId] = process.argv.slice(2);
if (!mes) { console.error("Uso: node motor/generar.mjs AAAA-MM [id]"); process.exit(1); }

const dirIn = path.join(RAIZ, "contenido", mes);
const dirOut = path.join(RAIZ, "salida", mes);
const tmp = path.join(RAIZ, ".tmp");
fs.mkdirSync(tmp, { recursive: true });

// Si una pieza no trae «tema», se le asigna rotando por tipo para variar el feed.
const contador = {};
const piezas = fs.readdirSync(dirIn).filter((f) => f.endsWith(".json")).sort()
  .map((f) => JSON.parse(fs.readFileSync(path.join(dirIn, f), "utf8")))
  .sort((a, b) => a.fecha.localeCompare(b.fecha))
  .map((p) => { const r = rotacion[p.tipo]; const k = (contador[p.tipo] = (contador[p.tipo] ?? -1) + 1); return { ...p, tema: p.tema || r[k % r.length] }; })
  .filter((p) => !soloId || p.id === soloId);

const navegador = await chromium.launch();
const FPS = 30;

async function abrir(html, ancho, alto) {
  const page = await navegador.newPage({ viewport: { width: ancho, height: alto } });
  const archivo = path.join(tmp, `p${Math.random().toString(36).slice(2)}.html`);
  fs.writeFileSync(archivo, html);
  await page.goto(`file://${archivo}`);
  await page.evaluate(() => document.fonts.ready);
  return { page, cerrar: async () => { await page.close(); fs.rmSync(archivo); } };
}

async function estatica(p, ancho, alto, dir) {
  for (const [i, s] of p.slides.entries()) {
    const { page, cerrar } = await abrir(htmlEstatico(p, s, i, p.slides.length, ancho, alto), ancho, alto);
    await page.screenshot({ path: path.join(dir, `${String(i + 1).padStart(2, "0")}.png`) });
    await cerrar();
  }
}

async function reel(p, dir) {
  const { html, total, tiempos } = construirReel(p);
  const { page, cerrar } = await abrir(html, 1080, 1920);
  const salida = path.join(dir, "reel.mp4");
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-shortest", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", salida]);
  const cuadros = Math.ceil(total * FPS);
  for (let f = 0; f < cuadros; f++) {
    await page.evaluate((t) => window.__t(t), f / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await new Promise((r, x) => ff.on("close", (c) => (c === 0 ? r() : x(new Error(`ffmpeg ${c}`)))));
  // portada: primera escena con todo visible
  await page.evaluate((t) => window.__t(t), tiempos[0].dur - 0.05);
  await page.screenshot({ path: path.join(dir, "portada.jpg"), type: "jpeg", quality: 92 });
  await cerrar();
  return total;
}

for (const p of piezas) {
  const dir = path.join(dirOut, p.id);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const t0 = Date.now();
  let extra = "";
  if (p.tipo === "carrusel") await estatica(p, 1080, 1350, dir);
  else if (p.tipo === "historia") await estatica(p, 1080, 1920, dir);
  else if (p.tipo === "reel") extra = ` (${(await reel(p, dir)).toFixed(1)} s)`;
  else throw new Error(`Tipo desconocido: ${p.tipo}`);
  fs.writeFileSync(path.join(dir, "texto.txt"), [p.caption, "", (p.hashtags || []).join(" ")].join("\n").trim() + "\n");
  console.log(`✓ ${p.id} [${p.tema}]${extra} — ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}
await navegador.close();
