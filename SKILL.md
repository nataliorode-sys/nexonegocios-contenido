---
name: contenido-nexonegocios
description: Fábrica de contenido de autoridad para el Instagram de NexoNegocios (@nexo.negocios), boutique de M&A para PyMEs argentinas. Usar SIEMPRE que haya que planificar, escribir o generar posts, carruseles, reels, historias o captions para NexoNegocios; para armar el lote del mes; o cuando Natalio pase una idea, un caso o una empresa en venta para convertir en contenido. Genera las piezas terminadas (PNG y MP4) con el motor de este repo.
---

# Contenido de autoridad · NexoNegocios

Este repositorio produce, sin que Natalio se filme, todo el contenido de Instagram de NexoNegocios: carruseles, reels de texto animado e historias, con su texto listo para pegar y un calendario de publicación.

## 1. Posicionamiento

**NexoNegocios es quien explica, con números, cómo se valúa, se prepara y se vende una PyME en Argentina.**

- Autor: **Natalio Rode**, ingeniero industrial, posgrado en Economía (UCEMA), 10 años en multinacionales, fundador de NexoNegocios.
- Audiencia principal: dueños de PyMEs y empresas familiares (45-70 años) que piensan en vender, sumar un socio o resolver la sucesión.
- Audiencia secundaria: compradores e inversores que buscan empresas en marcha; contadores y abogados que pueden derivar clientes.
- Objetivo de cada pieza: que el dueño **aprenda algo concreto** y piense «estos saben». No vender en cada pieza.

## 2. Reglas que no se rompen

1. **Una idea por pieza**, explicada con un **número, un ejemplo, un criterio o un esquema**. Si la pieza no enseña nada, no se publica.
2. **No inventar datos de mercado** (múltiplos promedio, porcentajes de operaciones, estadísticas). Los ejemplos numéricos se marcan como «Ejemplo ilustrativo». Si hace falta un dato real, se pide a Natalio o se omite.
3. **Confidencialidad absoluta.** Nunca nombres de clientes, empresas, ciudades chicas ni detalles que identifiquen a alguien. Las empresas en venta se describen solo con lo que Natalio autorice publicar.
4. **CTA comercial como máximo en 1 de cada 4 piezas.** El resto cierra con: «Guardalo», «Compartilo con tu socio», una pregunta para comentar, o nada.
5. **Voz:** voseo rioplatense, frases cortas, tono de consultor que explica a un dueño en una reunión. Primera persona plural para la firma («en las valuaciones que hacemos»), primera singular solo si es una opinión de Natalio.
6. **Términos técnicos bien usados y explicados la primera vez:** EBITDA normalizado, múltiplo, valor empresa vs. valor de las acciones, deuda neta, due diligence, NDA, carta de intención (LOI), earn-out, fondo de comercio, cesión de cuotas/acciones.
7. **Máximo 1 emoji por caption** (o ninguno). Sin signos de exclamación en serie. Sin mayúsculas sostenidas.
8. Ortografía impecable. Un error de tipeo le resta autoridad a un experto.
9. Sin promociones de Nexo Directo en el feed.

### Frases prohibidas (copy de agencia)
«te acompañamos en la decisión más importante de tu vida», «profesionalismo, certeza y confidencialidad», «los pequeños detalles hacen la diferencia», «estamos para vos», «no te lo pierdas», «¿sabías que…?» como gancho, «increíble oportunidad», «🚀», «🤯». Si una frase la podría firmar cualquier consultora, se reescribe con algo específico.

## 3. Pilares y proporción mensual

| Pilar | % | Qué cubre |
|---|---|---|
| **Valor** | 35% | Cómo se valúa: EBITDA normalizado, múltiplos, qué sube y qué baja el valor, deuda y caja, por qué el dueño sobreestima. |
| **Proceso** | 30% | Cómo se vende/compra: etapas, NDA, teaser, carta de intención, due diligence, estructura (acciones vs. fondo), formas de pago, earn-out, plazos. |
| **Errores y mitos** | 20% | Lo que hace caer operaciones, creencias falsas de dueños y compradores. |
| **Mercado** | 15% | Sucesión en empresas familiares, quién compra hoy, comprar vs. empezar de cero, y **1 empresa en venta por mes**. |

El banco de temas está en `referencias/banco-de-temas.md`. Se marca cada tema usado con la fecha para no repetir.

## 4. Grilla semanal

| Día | Pieza | Hora |
|---|---|---|
| Lunes | Carrusel (7 slides) | 9:00 |
| Miércoles | Reel de texto animado (25-40 s) | 12:30 |
| Jueves | Historias: encuesta + enlace al carrusel | 10:00 |
| Viernes | Reel de texto animado | 12:30 |

Una vez por mes, el reel del viernes de la semana 3 es una **empresa en venta** con el gancho «Gente del sector X…» (el formato que mejor le funcionó a la cuenta). Si Natalio no pasó una empresa autorizada, se reemplaza por un reel del pilar Mercado.

## 5. Cómo se escribe cada formato

**Carrusel (1080×1350):** portada con promesa concreta → desarrollo (un concepto por slide) → slide «clave» con la idea en una frase → cierre con resumen y firma. Siempre 6 a 8 slides.

**Reel (1080×1920, sin voz):** gancho que contradice una creencia o muestra un número (máx. 15 palabras) → 3-4 escenas de desarrollo → cierre. Texto grande, pocas palabras por escena. La música se agrega en Instagram.

**Historias:** 1) encuesta o pregunta (se deja espacio vacío para el sticker), 2) dato breve que lleva al post de la semana.

**Caption:** primera línea = el gancho (es lo único que se ve sin tocar «más»). Después 4-8 líneas cortas que desarrollan la idea y agregan algo que no está en las imágenes. Cierre: pregunta o «Guardalo». 4-6 hashtags específicos, siempre `#NexoNegocios`.

### Ganchos que funcionan
- Número que contradice: «Tu contador dice que ganás $180 M. El comprador va a ver otro número.»
- Comparación: «Dos empresas facturan lo mismo. Una vale el doble.»
- Error caro: «El error que más baja el precio de una PyME (y nadie te avisa).»
- Pregunta de dueño real: «¿Me tengo que quedar trabajando después de vender?»
- Sector directo (empresas en venta): «Gente del sector farmacéutico: …»

## 6. Formato de las piezas (JSON)

Cada pieza es un archivo en `contenido/AAAA-MM/NN-<tipo>-<tema>.json`. Campos comunes: `id` (`AAAA-MM-DD-<tipo>-<tema>`), `tipo` (`carrusel` | `reel` | `historia`), `fecha`, `hora`, `pilar`, `titulo_interno`, `caption`, `hashtags`, `nota_publicacion`; los reels además llevan `musica`.

**Variedad de color.** Hay tres temas (`motor/marca.mjs`): `noche` (portada oscura, interior papel), `salvia` (portada verde claro, interior blanco) y `papel` (todo claro, frase clave en verde claro). Las portadas claras usan el logo negro y la N de la marca como marca de agua. Si la pieza no trae el campo `tema`, el motor lo asigna rotando por tipo, así dos publicaciones seguidas nunca se ven iguales en el feed. Usar `tema` solo para forzar uno puntual; `fondo` por slide o escena (`oscuro` | `claro` | `blanco` | `salvia`) solo como excepción.

**Slides de carrusel/historia** (`slides`, cada una con `layout`). En los textos, `**así**` resalta y `==así==` pinta de verde. 
- `portada`: kicker, titulo, bajada, tam
- `texto`: paso («01») o kicker, titulo, cuerpo (párrafos separados por línea en blanco)
- `dato`: kicker, dato («4,5x»), label, cuerpo
- `tabla`: kicker, titulo, filas `[[concepto, valor, "mas"|"menos"|"total"]]`, nota
- `lista`: kicker, titulo, items `[{t, d}]`
- `comparacion`: kicker, titulo, izq `{titulo, items[]}`, der `{titulo, items[]}`
- `clave`: kicker, texto
- `cierre`: titulo, cuerpo, cta
- Historias: `encuesta` (kicker, titulo, cuerpo) y `teaser` (kicker, titulo, cuerpo)

**Escenas de reel** (`escenas`, cada una con `layout`; `dur` opcional en segundos):
- `gancho`: kicker, texto
- `texto`: kicker, titulo, lineas[]
- `dato`: kicker, valor (número), antes/despues («$», « M»), decimales, label, linea
- `tabla`: kicker, titulo, filas
- `lista`: kicker, titulo, items `[{t, d}]`
- `comparacion`: titulo, izq `{titulo, texto}`, der `{titulo, texto}`
- `cierre`: texto

Ejemplos completos en `contenido/2026-10/`.

## 7. Proceso para armar un mes

1. Leer `referencias/banco-de-temas.md` y los meses anteriores en `contenido/` para no repetir.
2. Si Natalio pasó ideas, casos o empresas en venta (en el chat o en `ideas.md`), tienen prioridad.
3. Armar el plan del mes respetando la grilla y la proporción de pilares. Hay que cubrir todos los lunes, miércoles, jueves y viernes del mes.
4. Escribir los JSON. Revisar cada texto contra las reglas de la sección 2.
5. Generar: `node motor/generar.mjs AAAA-MM` (todo el mes) o `node motor/generar.mjs AAAA-MM <id>` (una pieza).
6. **Revisar lo generado:** `node motor/revision.mjs AAAA-MM` arma una hoja por pieza en `salida/AAAA-MM/_revision/` (los reels, con un fotograma por tramo). Mirarlas todas: nada cortado, nada fuera de pantalla, texto legible en un celular, ortografía. Corregir el JSON y regenerar esa pieza.
7. **Armar la entrega:** `node motor/entrega.mjs AAAA-MM` genera `salida/AAAA-MM/index.html` y `archivos.json`. Publicarla **siempre en la misma página**, https://claude.ai/artifact/BH8NPZ5ydFxdKjKw8QLncE (herramienta Artifact con `url`, `file_path` = ese index.html, `root` = la carpeta `salida/`, y `files` = el mapa de `archivos.json` más `null` para cada ruta publicada antes que ya no esté). Desde el día 22, la entrega incluye el mes en curso y el siguiente: `node motor/entrega.mjs 2026-10 2026-11`, así la última semana del mes sigue visible. Los recordatorios del Google Calendar de Natalio ya existen (domingo 19:00 «Programar la semana», jueves 10:00 «Subir historias») y apuntan a esa página: no hace falta crear nuevos.
8. Marcar en el banco los temas usados.

## 8. Publicación (lo que hace Natalio, ~15 min por semana)

Una vez por semana, en Meta Business Suite → Planificador: por cada pieza de la semana, descargar desde la página del calendario, subir, pegar el texto, elegir fecha y hora, y en los reels sumar música. Las historias con sticker (encuesta o enlace) se suben desde el celular el día indicado, porque Business Suite no permite stickers.
