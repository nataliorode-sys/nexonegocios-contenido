// Arma la página del calendario del mes (salida/<mes>/index.html) y el mapa de archivos a publicar.
// Uso: node motor/entrega.mjs 2026-10 [2026-11 …]  (varios meses en la misma página; la salida queda en el último)
import fs from "node:fs";
import path from "node:path";
import { RAIZ } from "./marca.mjs";

const meses = process.argv.slice(2);
const mes = meses.at(-1);
const dirOut = path.join(RAIZ, "salida", mes);
const piezas = [];
const archivos = {};

for (const m of meses) for (const f of fs.readdirSync(path.join(RAIZ, "contenido", m)).filter((x) => x.endsWith(".json")).sort()) {
  const p = JSON.parse(fs.readFileSync(path.join(RAIZ, "contenido", m, f), "utf8"));
  const dir = path.join(RAIZ, "salida", m, p.id);
  if (!fs.existsSync(dir)) { console.error(`Falta generar ${p.id}`); process.exit(1); }
  const propios = fs.readdirSync(dir).filter((x) => /\.(png|jpg|mp4)$/.test(x)).sort().map((x) => `${p.id}/${x}`);
  for (const a of propios) archivos[a] = path.relative(path.join(RAIZ, "salida"), path.join(dir, path.basename(a)));
  const texto = p.caption ? [p.caption, "", (p.hashtags || []).join(" ")].join("\n").trim() : "";
  piezas.push({
    id: p.id, tipo: p.tipo, fecha: p.fecha, hora: p.hora, pilar: p.pilar, titulo: p.titulo_interno,
    nota: [p.nota_publicacion, p.musica ? `Música: ${p.musica}` : ""].filter(Boolean).join(" "),
    texto,
    imagenes: propios.filter((a) => a.endsWith(".png")),
    video: propios.find((a) => a.endsWith(".mp4")),
    portada: propios.find((a) => a.endsWith("portada.jpg")),
    archivos: p.tipo === "reel" ? [propios.find((a) => a.endsWith(".mp4")), propios.find((a) => a.endsWith("portada.jpg"))] : propios,
  });
}

const plantilla = fs.readFileSync(path.join(RAIZ, "motor", "pagina.html"), "utf8");
const json = JSON.stringify({ meses, piezas }).replace(/</g, "\\u003c");
fs.writeFileSync(path.join(dirOut, "index.html"), plantilla.replace("__DATOS__", () => json));
fs.writeFileSync(path.join(dirOut, "archivos.json"), JSON.stringify(archivos, null, 1));
console.log(`Página: ${path.join(dirOut, "index.html")} · ${piezas.length} piezas · ${Object.keys(archivos).length} archivos`);
