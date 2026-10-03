// Arma una hoja de revisión por pieza (salida/<mes>/_revision/<id>.png) para mirar todo de un vistazo.
// En los reels toma un fotograma por escena. Uso: node motor/revision.mjs 2026-10
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";
import { RAIZ } from "./marca.mjs";

const mes = process.argv[2];
const dirOut = path.join(RAIZ, "salida", mes);
const dirRev = path.join(dirOut, "_revision");
fs.mkdirSync(dirRev, { recursive: true });
const nav = await chromium.launch();
for (const id of fs.readdirSync(dirOut).filter((d) => /^\d{4}-/.test(d)).sort()) {
  const dir = path.join(dirOut, id);
  let imgs = fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort().map((f) => path.join(dir, f));
  if (fs.existsSync(path.join(dir, "reel.mp4"))) {
    const dur = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(dir, "reel.mp4")]).toString());
    imgs = [];
    for (let k = 0; k < 8; k++) {
      const t = (dur * (k + 0.85)) / 8, f = path.join(dirRev, `.f${k}.jpg`);
      execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-ss", String(t), "-i", path.join(dir, "reel.mp4"), "-frames:v", "1", "-vf", "scale=360:-1", f]);
      imgs.push(f);
    }
  }
  const page = await nav.newPage({ viewport: { width: 1800, height: 800 } });
  await page.setContent(`<body style="margin:0;background:#888;display:flex;flex-wrap:wrap;gap:6px;padding:6px">${imgs.map((f) => `<img src="data:image/${f.endsWith("png") ? "png" : "jpeg"};base64,${fs.readFileSync(f).toString("base64")}" style="height:380px">`).join("")}</body>`);
  await page.screenshot({ path: path.join(dirRev, `${id}.png`), fullPage: true });
  await page.close();
}
for (const f of fs.readdirSync(dirRev).filter((f) => f.startsWith(".f"))) fs.rmSync(path.join(dirRev, f));
await nav.close();
console.log(`Hojas de revisión en ${dirRev}`);
