# Documentación del Proyecto — Landing Page Conectando IA

**Proyecto:** Landing Page Oficial de **Conectando IA** (`conectandoia.com`)  
**Carpetas locales sincronizadas:** `d:\IA\Landing page` y `d:\IA\mailo\Landing_page`  
**Última actualización:** 24 de noviembre de 2026  

---

## 1. Propósito e Identidad de Marca

**Conectando IA** es el puente comercial que une a los clientes finales con los productos y servicios de terceros que manejan las empresas aliadas. Combina **estrategias comerciales tradicionales y presenciales** (eventos, prospección/ventas en frío, llamadas telefónicas, pancartas y volantería) con **automatización mediante Inteligencia Artificial**.

- **Eslogan oficial (cápsula superior):** *Impulsamos tus ventas, automatizando el mañana*
- **Lema de marca (logo):** *Tu mundo • Nuestro motor • Sin límites* / *El futuro es ahora*
- **Alianza tecnológica:** **Maylo**, asistente virtual 24/7 en WhatsApp desarrollado por **LOGYX Studio** *(sin enlace externo todavía por decisión del proyecto)*.

---

## 2. Reglas de Negocio y Estrategia Comercial

1. **Experiencia de prueba y adecuación:** se cuenta con opción de **Maylo de 24 horas de prueba** cuando el comerciante desea vivirlo en su operación, y la instalación incluye **dos meses de adecuación** (nunca llamarlos *"dos meses gratis"*).
2. **Agente Consultor Autónomo en Vivo:** en la burbuja flotante de la esquina inferior derecha opera **Maylo** como consultor comercial autosuficiente con IA en vivo (diagnostica negocios, calcula volúmenes de respuestas, recomienda planes y hace simulaciones de atención sin derivar repetitivamente al formulario).
3. **Llamados a la acción (CTA):**
   - Primario: **Agendar Llamada Consultiva / Distribuir mi producto ahora**.
   - Secundario: **Conversar con Maylo en vivo** (abre el consultor flotante).
4. **Regla de trabajo acordada:** ningún texto de las secciones de la página se modifica sin revisión y aprobación previa.

---

## 3. Estructura de Archivos del Proyecto

```text
d:\IA\Landing page\  (sincronizada con d:\IA\mailo\Landing_page\)
├── index.html                  # Estructura HTML completa + barra de chat en vivo de Maylo
├── styles.css                  # Estilos, animaciones, paleta (:root) y panel ampliado del chat
├── script.js                   # Agente Consultor Autónomo Maylo (CONFIG_AGENTE_MAYLO + Prompt Maestro)
├── fondo-flujo.js              # Fondo animado de flujo de datos sobre la cuadrícula (60 FPS)
├── maylo-key.local.js          # Llaves locales de IA protegidas en .gitignore (NO se sube a GitHub)
├── agente-maylo-backend.gs     # Puente seguro Google Apps Script para producción web (en .gitignore)
├── DOCUMENTACION.md            # Documento maestro de respaldo, precios y control del proyecto
├── .gitignore                  # Protege llaves locales, backend .gs y carpeta checkpoints/
├── .nojekyll                   # Despliegue estático directo en GitHub Pages
├── assets/
│   ├── logo-conectando-ia.jpg      # Logo oficial de Conectando IA
│   ├── maylo.png                   # Personaje oficial 3D de Maylo con fondo transparente
│   ├── maylo-animado.mp4           # Rutina animada de Maylo con filtro Chroma Key SVG
│   ├── anuncio-conectando-ia.mp4   # Video institucional de 15 segundos
│   └── maylo-ventas-ia.mp4         # Video demostrativo de Maylo moviendo inventario
└── checkpoints/                # Respaldos históricos locales (checkpoint-0 a checkpoint-6)
```

---

## 4. Paleta Visual Oficial (`styles.css`)

Todos los colores principales están centralizados en `:root` al inicio de `styles.css` para facilitar futuros cambios:

| Variable | Color | Uso |
| :--- | :--- | :--- |
| `--bg-deep` | `#03091b` | Fondo principal azul medianoche |
| `--blue` | `#1e7bff` | Azul eléctrico (botones y acentos) |
| `--cyan` | `#00d2ff` | Cian luminoso (resaltados, bordes y degradados) |
| `--violet` | `#a855f7` | Violeta neón (sincronizado con el logo e infinito) |
| `--wa-green` | `#25d366` | Verde WhatsApp (estado en línea y botón directo) |

---

## 5. Estructura Actual de Secciones (`index.html`)

1. **Cabecera fija (Header):** logo ligero de **Conectando IA**, enlaces de navegación y botón *"Distribuye con nosotros"*.
2. **Sección 1 — Portada Principal (Pantalla 1):**
   - Cápsula destacada con degradado cian/violeta y resplandor: *"Impulsamos tus ventas, automatizando el mañana"*.
   - Titular principal: *"Conectando IA: el puente perfecto que une a tu cliente al producto o servicio que manejas,"*.
   - Párrafo descriptivo: enfoque de unión entre inteligencia artificial (empleados virtuales como Maylo) y estrategias comerciales tradicionales (prospección en frío y eventos).
   - Video institucional oficial (`anuncio-conectando-ia.mp4`) con el logo robusto de portada.
3. **Sección 2 — Maylo: Tu mejor aliado 24/7 (Pantalla 2):**
   - Titular: *"Convierte tu WhatsApp en tu mejor aliado, atención personalizada 24/7."*
   - Ficha de valor de Maylo (cliente calificado, cotización e inventario, agenda y envíos).
4. **Sección 3 — Problema vs. Solución:** comparativa entre operación tradicional manual y operación con Conectando IA + Maylo.
5. **Sección 4 — Capacidades Principales + Video de Maylo:** 4 módulos clave (cotizaciones, inventario, agenda/domicilios, atención 24/7) junto al video `maylo-ventas-ia.mp4`.
6. **Sección 5 — Demostración Controlada:** invitación a interactuar con el Bot de Exhibición flotante.
7. **Sección 6 — Los 5 Pilares de Conectando IA:** Inteligencia Artificial, Productos de Terceros, Ventas Automatizadas, Más Oportunidades, Tu Éxito Nuestra Misión.
8. **Sección 7 — Formulario de Llamada Consultiva y Pie de Página.**
9. **Widget Flotante Estable de Maylo:** burbuja fija en la esquina inferior derecha con respuestas rápidas de demostración y botón listo para conectar a WhatsApp.

---

## 6. Historial de Avances y Checkpoints

- **Checkpoint 0:** limpieza del entorno, definición visual a partir del logo y creación de la estructura base modular (cabecera y portada).
- **Checkpoint 1:** lectura del documento de especificaciones en Google Drive, integración de la estrategia de Maylo (cero pruebas gratuitas, Llamada Consultiva y Bot de Exhibición) y adición del video `maylo-ventas-ia.mp4`.
- **Ajuste 1.1:** corrección de la identidad oficial a **LOGYX Studio** (sin enlace externo) y conversión del chat de Maylo en un **widget flotante estable**.
- **Ajuste 1.2:** reorganización de pantallas — Portada principal con la misión oficial de Conectando IA en Pantalla 1, sección dedicada de Maylo en Pantalla 2 y resto de bloques intactos desde Pantalla 3.
- **Ajuste 1.3:** actualización de la cápsula superior con el eslogan *"Impulsamos tus ventas, automatizando el mañana"* con mayor tamaño, resplandor y degradado sincronizado con el logo, más actualización del párrafo descriptivo debajo del titular principal (*"expandimos tu marca mediante prospección en frío y eventos"*).
- **Ajuste 1.4:** simplificación de la Portada Principal (eliminación del botón secundario y las 3 etiquetas inferiores para dejar únicamente el botón *"Distribuir mi producto ahora"*).
- **Ajuste 1.5:** actualización de la Sección 2 de Maylo:
  - Titular actualizado a *"Convierte tu WhatsApp en tu mejor aliado con Maylo, atención personalizada 24/7."*
  - Párrafo descriptivo actualizado con enfoque en automatización de ventas, cotizaciones, inventario, citas y entregas en tiempo real para cualquier nicho comercial.
  - Eliminación de las 3 etiquetas inferiores (*Atención 24/7 en WhatsApp*, *Sin menús rígidos*, *Bello, Valle de Aburrá y toda Colombia*).
  - Integración de la imagen oficial de **Maylo** (`assets/maylo.png`) en alta resolución sin bordes a tamaño simétrico (`400px`) junto al texto, y reorganización de la tarjeta de 3 indicadores a ancho completo debajo para eliminar espacios vacíos.
- **Checkpoint 2:** respaldo previo en `checkpoints/checkpoint-2/` con Maylo estático a tamaño simétrico (`400px`), listo para recibir el GIF animado oficial creado a medida.
- **Checkpoint 3 y Ajuste 1.7 (Maylo animado en video):** respaldo previo en `checkpoints/checkpoint-3/`. Se integró el video oficial `assets/maylo-animado.mp4` (Maylo caminando, saltando y durmiendo) en la Sección 2, reemplazando la imagen estática. El fondo verde del video se elimina en el navegador con un filtro SVG (`#mayloChromaKey`), sin necesidad de editar el archivo, en reproducción automática y silenciada.
- **Ajuste 1.8:** Maylo agrandado (escala 1.35 en escritorio, 1.15 en móvil). Ahora hace su rutina completa una sola vez y se queda dormido en el último cuadro; vuelve a repetirla solo al pasar el cursor (o tocarlo en móvil) — lógica en `script.js` (`mayloHeroVideo`).
- **Checkpoint 5 y Ajuste 1.9 (Mejoras Visuales Pro sin alterar textos):** respaldo previo en `checkpoints/checkpoint-5/`. Se aplicaron 7 mejoras visuales de alto impacto respetando el 100% de los textos:
  1. **Spotlight interactivo en tarjetas (`.glass-card`):** halo de luz cian/violeta que sigue el cursor sobre las tarjetas.
  2. **Pedestal holográfico 3D y partículas para Maylo (Sección 2):** anillo giratorio, núcleo de energía y partículas flotantes alrededor de Maylo.
  3. **Barrido de luz (`shimmer`) en botones primarios y pulso de radar (`ping`)** en los indicadores en vivo (`.badge-dot`, `.live-dot`, `.maylo-fab-dot`).
  4. **Contraste visual reforzado en Problema vs. Solución (Sección 3):** aura de alerta roja en Operación Tradicional frente a borde luminoso superior cian/violeta en Conectando IA + Maylo.
  5. **Íconos vectoriales SVG con brillo neón** acompañando los números `01–04` (Capacidades) y `01–05` (Pilares).
  6. **Marcos de video con resplandor ambiental reforzado.**
  7. **Barra superior de progreso de lectura, indicador de sección activa en la barra de navegación y animaciones de entrada en cascada al hacer scroll.**
- **Ajuste 2.0 (Fondo de flujo de datos en toda la página):** se reemplazó el fondo plano por una representación de flujo de datos sobre la cuadrícula, aprobada tras una vista previa:
  - **Cuadrícula (`.bg-grid` en `styles.css`):** ahora cubre la página completa de arriba a abajo y **se desplaza junto con el contenido** (antes estaba fija en pantalla). Líneas un poco más visibles (`0.07` de opacidad) y desvanecido suave solo en los bordes laterales.
  - **Flujo animado (`fondo-flujo.js`):** pulsos de luz cian, violeta y azul con estela que recorren las líneas de la cuadrícula y giran en las intersecciones; nodos que se encienden al paso de los pulsos; conexiones curvas punteadas con paquetes viajando entre nodos.
  - El flujo vive en coordenadas de página, alineado con la cuadrícula: cubre **todas las secciones hasta el pie de página**, se mueve con el scroll y **nunca se queda quieto**. La cantidad de pulsos se ajusta al alto total de la página (máx. 140) y solo se dibujan los visibles para cuidar el rendimiento.
  - Accesibilidad: si el visitante tiene activado *"reducir movimiento"* en su sistema, el fondo se muestra estático.
  - Parámetros editables al inicio de `fondo-flujo.js`: `COLORS`, `DENSITY` (cantidad de pulsos), `MAX_PACKETS` y `LINKS_PER_SCREEN`.
  - Para desactivarlo basta con quitar la línea `<script src="fondo-flujo.js"></script>` de `index.html`.
- **Ajuste 2.1 (Optimización de fluidez a 60 FPS al hacer scroll):**
  - Se unificaron la cuadrícula y los pulsos de datos dentro del mismo lienzo (`fondo-flujo.js`) para evitar desfase entre CSS y Canvas al bajar por la página.
  - Se reemplazó `ctx.shadowBlur` en cada fotograma por sprites de brillo pre-renderizados en memoria (`makeGlow`), reduciendo drásticamente el uso de GPU/CPU.
  - Se eliminó `backdrop-filter: blur(16px)` de las 15+ tarjetas `.glass-card` (sustituido por un degradado translúcido de alto contraste) para que el navegador no tenga que recalcular el desenfoque del canvas animado en cada píxel de scroll.
  - El detector de scroll de la barra superior (`script.js`) ahora se ejecuta sincronizado con `requestAnimationFrame`.
- **Ajuste 2.2 (Fondo 100% anclado al documento junto con textos e imágenes):**
  - Se cambió el lienzo del flujo (`.data-flow-canvas`), la cuadrícula (`.bg-grid`) y las esferas ambientales (`.bg-orb`) de `position: fixed` a **`position: absolute` anclados directamente al documento (`body`)**.
  - De esta forma el fondo toma como referencia exacta las imágenes y los textos y **viaja al unísono con ellos de forma nativa en el navegador** (sin depender de `window.scrollY` ni `ctx.translate` al hacer scroll), eliminando cualquier lagueo o tirón al bajar por la página mientras el flujo de datos sigue corriendo sin detenerse.
- **Ajuste 2.3 (Publicación en Internet con Git + GitHub Pages):**
  - **Repositorio oficial:** `https://github.com/androitecni-cmd/conectando-ia` (rama `main`).
  - **URL pública en vivo (GitHub Pages):** `https://androitecni-cmd.github.io/conectando-ia/`
  - **Cómo publicar cambios futuros:** basta con guardar los cambios en `d:\IA\Landing page` (o `d:\IA\mailo\Landing_page`) y ejecutar:
    ```powershell
    git add .
    git commit -m "Descripción del cambio"
    git push
    ```
    GitHub Pages actualizará automáticamente la web en ~30 segundos.
- **Ajuste 2.4 (Sincronización Local y Agente Consultor Autónomo Maylo en Vivo — 24 nov 2026):**
  - **Unificación local + Git:** se sincronizaron las carpetas `d:\IA\Landing page` y `d:\IA\mailo\Landing_page`, ambas conectadas directamente al repositorio `origin/main` en GitHub.
  - **Interfaz del chat en vivo (`index.html` y `styles.css`):**
    - Se agregó la barra de escritura libre (`#mayloChatForm` / `#mayloChatInput`) para conversar abiertamente con Maylo.
    - Se amplió el panel del chat (`415px` de ancho y hasta `360px` de alto) con soporte para listas, negritas y encabezados limpios.
    - Se eliminó la cápsula *"Ejemplo: cotizar iPhone 13"* y se dejaron cápsulas estratégicas conectadas directamente al motor de IA (*¿Cómo me puedes ayudar?*, *Planes y precios*, *Prueba 24h y adecuación*, *Mover stock de mi tienda*).
  - **Tabla Oficial de Precios y Reglas Comerciales (`CONFIG_AGENTE_MAYLO` en `script.js` — Guía LOGYX Studio v1.0 del 19 nov 2026, COP sin IVA):**
    - **Maylo con IA:** instalación de **$2.000.000** en **dos pagos** ($1.000.000 al firmar y $1.000.000 en la entrega oficial), incluyendo **2 meses de adecuación** (Mes 1: $0; Mes 2: $0 hasta 3.000 respuestas, excedente a $93 con techo del plan ideal + informe escrito) más opción de **Maylo de 24 horas de prueba**.
    - **Planes desde el Mes 3** (`1 conversación ≈ 6 respuestas`):
      - **Esencial:** $280.000/mes · 3.000 respuestas (~500 conv.) · adicional $93 (conviene subir desde ~4.200 resp.).
      - **Impulso:** $390.000/mes · 6.000 respuestas (~1.000 conv.) · adicional $65 (conviene subir desde ~8.100 resp.).
      - **Crecimiento:** $525.000/mes · 10.000 respuestas (~1.600 conv.) · adicional $53 (conviene subir desde ~18.600 resp.).
      - **Pro:** $980.000/mes · 25.000 respuestas (~4.000 conv.) · adicional $39.
      - **Particular:** a cotizar (>25.000 respuestas).
    - **Todo plan con IA incluye:** 3 integraciones a elegir entre 4 (Verificación bancaria de transferencias, Google Drive, Agenda de citas / Google Calendar y Meta CAPI), informe mensual de campaña por escrito, documentos legales redactados por abogado de LOGYX y conexión al mismo número de WhatsApp Business sin perder la app ni los estados. Sin cláusula de permanencia.
    - **Asistente adicional:** $100.000/mes (instalación $500.000 misma función / $1.000.000 función distinta con mes 1 de adecuación incluido).
    - **Maylo Chat (sin IA):** instalación **$600.000** en un pago (mes 1 incluido) y **$119.000/mes** desde el mes 2, **sin límite de usuarios** (ascenso a IA en 12 meses abona los $600.000).
  - **Arquitectura de IA Autosuficiente y Segura:**
    - **Prompt Maestro de Consultor Senior:** no deriva repetitivamente al formulario ni a enlaces externos; diagnostica el negocio, calcula matemáticamente el volumen mensual de respuestas, recomienda el plan óptimo y ejecuta simulaciones de rol en vivo dentro del mismo chat.
    - **Respaldo multi-llave y multi-modelo:** usa `gemini-3-flash-preview` (`thinkingLevel: "LOW"`, `maxOutputTokens: 1400`) con failover automático a `gemini-3.5-flash-lite` y `gemini-flash-lite-latest`.
    - **Seguridad de credenciales:** las llaves viven únicamente en `maylo-key.local.js` y `agente-maylo-backend.gs`, ambos excluidos en `.gitignore` para que nunca se publiquen en el repositorio público.

---

## 7. Pendientes para Próximas Fases

- Publicar `agente-maylo-backend.gs` como Aplicación Web en `https://script.google.com` y pegar su URL `/exec` en `CONFIG_AGENTE_MAYLO.geminiProxyUrl` dentro de `script.js` para que el dominio público consulte la IA a través del puente privado.
- Conectar el número oficial de WhatsApp de **Maylo** en la constante `WHATSAPP_MAYLO` dentro de `script.js`.
- Revisar y aprobar los textos de las secciones 3 a 7 detalle a detalle y enlazar el dominio personalizado **conectandoia.com**.
