# Guía de imágenes — DELE A2 Arcade

Resumen del estilo visual que busca la web y qué imágenes hacen falta para completarla.

---

## 1. Dirección de arte

**Concepto general:** un cruce entre **estética editorial elegante** (como revistas literarias o The New Yorker) y **estética arcade retro** (como máquinas de recreativos de los 80 / pixel art minimalista).

El contraste entre ambos mundos es precisamente el gancho de la marca: el DELE A2 es serio, oficial, trámite legal → pero nuestra herramienta lo convierte en juego.

### Paleta

| Rol | Color | Uso |
|---|---|---|
| Fondo base | `#F7F4EF` (blanco roto beige) | Fondo de página, secciones claras |
| Acento primario | `#C0392B` (rojo castellano profundo) | CTA, badges importantes, títulos de sección |
| Acento arcade | `#39FF14` (verde neón) | Elementos de "gaming", detalles luminosos |
| Fondo arcade | `#1A1108` (marrón muy oscuro, casi negro) | Secciones "juego", cartelas nocturnas |
| Acento dorado | `#B8860B` (ocre) | Detalles de prestigio (diplomas, medallas) |
| Texto principal | `#1a1a1a` | |
| Texto secundario | `#5a5a5a` | |

### Tipografías visuales (si aparecen en imágenes)

- **Playfair Display** — serif elegante, para cualquier texto editorial o "oficial" que aparezca en una ilustración.
- **Press Start 2P** — pixel font, para cualquier texto que aparezca dentro de interfaces arcade (HUD, puntuaciones).
- **Source Sans 3** — cuerpo limpio.

### Tono

- Limpio, con mucho espacio en blanco
- Ilustraciones vectoriales **line-art minimalista** sobre fondo plano, o **fotografía editorial** con color-grading cálido
- Nada de 3D gimmicky, nada de stock photos genéricas de personas con auriculares
- Si hay personajes, mejor **silueta o ilustración estilizada** (no fotografía realista) — así evitamos el efecto "curso online de 2012"

---

## 2. Imágenes que necesita la landing

Hay dos placeholders actualmente en el código, marcados con el componente `<ImagePlaceholder>`. Cuando tengas las imágenes, solo tienes que pasarles el prop `src`.

### 2.1 Imagen · `diploma-ilustracion` (sección "Qué es DELE A2")

- **Ruta destino:** `public/images/diploma-ilustracion.webp` (o .png)
- **Formato:** vertical, proporción **4:5**, mínimo 800×1000 px
- **Concepto:**
  Un diploma oficial DELE A2 estilizado. Opción A: ilustración line-art del diploma con un sello del Instituto Cervantes, tal vez medio en sombra, medio iluminado por un "pixel de luz" verde neón que sale de fuera del encuadre. Opción B: una foto editorial cenital de un diploma real sobre una mesa de madera clara, con una consola arcade pequeña (o un cartucho) al lado — simbolizando la mezcla.
- **Alternativa simple (si no quieres ilustrar):** una foto del libro oficial del DELE A2 abierto, con buena luz natural, sobre papel beige.
- **Emoción que debe transmitir:** "esto es serio y oficial, pero tiene algo divertido".

### 2.2 Imagen · `3-pasos-recorrido` (sección "Cómo funciona")

- **Ruta destino:** `public/images/3-pasos-recorrido.webp`
- **Formato:** cuadrado, proporción **1:1**, mínimo 800×800 px
- **Concepto:**
  Una ilustración que represente visualmente el recorrido de los 3 pasos:
  1. **Abrir y jugar** → icono de "play" o mando
  2. **Probar módulos** → 4 mini-iconos (libro, lápiz, tarjetas, mando)
  3. **Hacer el simulacro** → reloj / diploma
  Un camino serpenteante o un mapa tipo videojuego (estilo Mario Bros world map) conectando los 3 hitos con el fondo beige de la marca y detalles en verde neón.
- **Alternativa simple:** tres viñetas cuadradas una al lado de otra con una ilustración simple cada una.

---

## 3. Imágenes opcionales (nice-to-have)

Ideas para futuro, no urgentes:

- **Hero opcional (en vez del preview arcade):** una foto/ilustración más grande de una consola arcade con el texto "DELE A2" en la pantalla en verde neón. Si se hace, sustituiría al preview CSS actual.
- **Sección testimonial:** 2-3 retratos editoriales de estudiantes (estilo blanco y negro o con color-grading consistente) + cita. Recomiendo no añadir hasta tener testimonios reales, para evitar que parezca falso.
- **Open Graph / Social Card:** 1200×630 px con el hero + logotipo, para cuando se comparta el link en redes/WhatsApp.
- **Favicon mejorado:** hay uno en `public/favicon.svg` — si quieres cambiarlo, un icono cuadrado de 512×512 px con una letra "A" o "Á" estilo arcade.

---

## 4. Cómo colocar las imágenes

1. Guarda los archivos en `public/images/`.
2. En `src/pages/LandingPage.tsx`, pasa el prop `src` al componente `<ImagePlaceholder>`:
   ```tsx
   <ImagePlaceholder
     src="/images/diploma-ilustracion.webp"
     alt="DELE A2 diploma"
     aspect="aspect-[4/5]"
     label="IMG · diploma-ilustracion"
   />
   ```
3. Formato recomendado: **WebP** (mejor compresión) o PNG con fondo transparente si aplica.

---

## 5. Prompt de IA (por si usas Midjourney / DALL-E / Stable Diffusion)

### Para `diploma-ilustracion`

```
Minimalist editorial illustration of a Spanish DELE A2 diploma certificate
on a beige paper background, with a subtle neon green pixel glow coming
from one corner, flat vector style, warm tones, clean lines, Playfair
Display serif typography visible on the diploma, Instituto Cervantes
seal, mood is "official but playful", vertical 4:5 aspect ratio
```

### Para `3-pasos-recorrido`

```
Minimalist vector illustration of a winding path with three milestone
markers, flat design, beige background #F7F4EF, red accents #C0392B,
neon green #39FF14 highlights on pixel-art style elements, Mario-Bros
inspired world map, editorial clean style, square 1:1 aspect ratio,
no text
```
