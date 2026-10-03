// Sistema visual único de NexoNegocios. Todo lo que se genera sale de acá.
import { fileURLToPath } from "node:url";
import path from "node:path";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fuente = (pkg, archivo) => `file://${raiz}/node_modules/@fontsource/${pkg}/files/${archivo}`;

export const RAIZ = raiz;

export const color = {
  marino: "#172A33",
  marinoProfundo: "#0F1D24",
  verde: "#41A03C",
  verdeClaro: "#E6F2E3",
  papel: "#F6F4EF",
  blanco: "#FFFFFF",
  tinta: "#172023",
  gris: "#5E6B7A",
  linea: "#D9D4C8",
  rojo: "#B4442C",
};

export const logo = {
  claro: `file://${raiz}/marca/logo-claro.png`,
  oscuro: `file://${raiz}/marca/logo-oscuro.png`,
  isotipo: `file://${raiz}/marca/isotipo-claro.png`,
};

// Fondos posibles. Solo «oscuro» lleva el logo blanco; los demás, el logo negro.
export const fondos = {
  oscuro: color.marino,
  claro: color.papel,
  blanco: "#FFFFFF",
  salvia: "#E4EFE0",
};

// Temas: qué fondo usa cada rol de slide. Se rotan pieza a pieza para que el feed no sea monocromático.
export const temas = {
  noche: { portada: "oscuro", interior: "claro", clave: "oscuro", cierre: "claro", reel: ["oscuro", "claro"] },
  salvia: { portada: "salvia", interior: "blanco", clave: "oscuro", cierre: "salvia", reel: ["salvia", "blanco"] },
  papel: { portada: "claro", interior: "blanco", clave: "salvia", cierre: "claro", reel: ["claro", "salvia"] },
};
export const rotacion = {
  carrusel: ["noche", "salvia", "papel"],
  reel: ["salvia", "noche", "papel"],
  historia: ["papel", "noche", "salvia"],
};

export const firma = {
  nombre: "Natalio Rode",
  cargo: "Ing. Industrial · Fundador de NexoNegocios",
  usuario: "@nexo.negocios",
};

export const cssBase = `
@font-face { font-family: Inter; font-weight: 400; src: url(${fuente("inter", "inter-latin-400-normal.woff2")}); }
@font-face { font-family: Inter; font-weight: 600; src: url(${fuente("inter", "inter-latin-600-normal.woff2")}); }
@font-face { font-family: Inter; font-weight: 800; src: url(${fuente("inter", "inter-latin-800-normal.woff2")}); }
@font-face { font-family: Fraunces; font-weight: 600; src: url(${fuente("fraunces", "fraunces-latin-600-normal.woff2")}); }
@font-face { font-family: Fraunces; font-weight: 700; src: url(${fuente("fraunces", "fraunces-latin-700-normal.woff2")}); }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: ${color.papel}; }
body { font-family: Inter, sans-serif; color: ${color.tinta}; -webkit-font-smoothing: antialiased; }
.serif { font-family: Fraunces, serif; letter-spacing: -0.01em; }
b, strong { font-weight: 800; color: ${color.marino}; }
.oscuro b, .oscuro strong { color: #fff; }
.verde { color: ${color.verde}; }
`;

// **negrita** y saltos de línea
// Evita que «$620 M» o «20 %» se corten en dos renglones
export const sinCorte = (t = "") => String(t).replace(/(\d) (M|%|x|años)(?=[\s.,;:)»]|$)/g, "$1\u00A0$2");

export function md(texto = "") {
  return sinCorte(texto)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/==(.+?)==/g, '<span class="verde">$1</span>')
    .replace(/\n/g, "<br>");
}
