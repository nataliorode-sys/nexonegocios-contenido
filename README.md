# NexoNegocios · Fábrica de contenido

Genera el contenido de Instagram de @nexo.negocios (carruseles, reels de texto animado e historias) a partir de archivos de texto, con la identidad visual fija de la marca. Las reglas editoriales, los formatos y el proceso mensual están en [SKILL.md](SKILL.md).

## Estructura

| Carpeta | Qué hay |
|---|---|
| `SKILL.md` | La skill: posicionamiento, voz, reglas, grilla y formato de las piezas |
| `referencias/banco-de-temas.md` | Temas por pilar, con los ya usados marcados |
| `ideas.md` | Ideas, casos y empresas en venta que pase Natalio (tienen prioridad) |
| `contenido/AAAA-MM/` | Una pieza por archivo JSON |
| `motor/` | Plantillas y generadores (Playwright + ffmpeg) |
| `marca/` | Logos e isotipo (la N) |
| `salida/AAAA-MM/` | Piezas terminadas (PNG, MP4, portada y texto) y la página del calendario |

## Uso

```bash
npm install                      # fuentes y Playwright (usa el Chromium del sistema)
npm run generar -- 2026-10       # genera todas las piezas del mes
npm run generar -- 2026-10 <id>  # regenera una sola pieza
npm run revision -- 2026-10      # hojas de revisión para controlar el resultado
npm run entrega -- 2026-10       # arma salida/2026-10/index.html (calendario) y archivos.json
```

Requisitos: Node 22, ffmpeg con libx264 y Chromium para Playwright.

## Publicación

El calendario se publica como página privada en claude.ai (siempre la misma dirección), con cada pieza para descargar y su texto para copiar. Natalio programa cada domingo la semana en Meta Business Suite y sube las historias del jueves desde el celular; los recordatorios están en su Google Calendar.
