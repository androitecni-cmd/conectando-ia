// =========================================================
// FONDO DE FLUJO DE DATOS — Conectando IA (Ajuste 2.2)
// Lienzo ANCLADO AL DOCUMENTO (position: absolute) junto con
// la cuadrícula .bg-grid, las imágenes y los textos.
//
// Al estar pegado físicamente al cuerpo de la página (y no "fixed"
// recalculando window.scrollY), el navegador mueve el fondo, la
// cuadrícula, los textos y las imágenes 100% AL UNÍSONO en la GPU
// con CERO lagueo ni desfase al bajar o subir, mientras los pulsos
// siguen fluyendo sin detenerse en toda la página.
// =========================================================
(() => {
  const CELL = 48; // Mismo tamaño exacto que .bg-grid en styles.css
  const COLORS = ["0, 210, 255", "168, 85, 247", "30, 123, 255"]; // cian, violeta, azul
  const DENSITY = 48000; // px² por pulso
  const MAX_PACKETS = 120;
  const LINKS_COUNT = 16;

  const canvas = document.createElement("canvas");
  canvas.className = "data-flow-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d", { alpha: true });

  let docW = 0;
  let docH = 0;
  let cols = 0;
  let rows = 0;
  let packets = [];
  let links = [];
  const nodes = new Map(); // clave numérica -> brillo (0..1)

  const rand = (n) => Math.floor(Math.random() * n);
  const pickColor = () => (Math.random() < 0.6 ? 0 : Math.random() < 0.6 ? 1 : 2);
  const nodeKey = (x, y) => Math.round(y / CELL) * 10000 + Math.round(x / CELL);

  // Sprites de brillo pre-renderizados en memoria (ultralivianos)
  function makeGlow(rgb, radius) {
    const c = document.createElement("canvas");
    c.width = c.height = radius * 2;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(radius, radius, 0, radius, radius, radius);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.2, `rgba(${rgb},0.95)`);
    grad.addColorStop(0.5, `rgba(${rgb},0.35)`);
    grad.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, radius * 2, radius * 2);
    return c;
  }

  const GLOWS = COLORS.map((rgb) => makeGlow(rgb, 11));
  const NODE_GLOW = makeGlow(COLORS[0], 9);

  function measure() {
    const newW = document.documentElement.clientWidth || window.innerWidth;
    const newH = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );

    if (newW === docW && Math.abs(newH - docH) < 4) return;

    docW = newW;
    docH = newH;
    canvas.width = docW;
    canvas.height = docH;
    canvas.style.width = `${docW}px`;
    canvas.style.height = `${docH}px`;

    cols = Math.ceil(docW / CELL);
    rows = Math.ceil(docH / CELL);

    const target = Math.max(24, Math.min(Math.round((docW * docH) / DENSITY), MAX_PACKETS));
    while (packets.length < target) packets.push(makePacket());
    packets.length = target;

    while (links.length < LINKS_COUNT) links.push(makeLink(Math.random()));
    links.length = LINKS_COUNT;
  }

  function makePacket() {
    const x = rand(cols + 1) * CELL;
    const y = rand(rows + 1) * CELL;
    return {
      x,
      y,
      horizontal: Math.random() < 0.5,
      dir: Math.random() < 0.5 ? 1 : -1,
      speed: 0.75 + Math.random() * 1.45,
      len: 44 + Math.random() * 84,
      color: pickColor(),
      turns: [{ x, y }]
    };
  }

  function makeLink(t = 0) {
    const ay = rand(rows + 1) * CELL;
    const by = Math.min(Math.max(ay + (Math.random() - 0.5) * 600, CELL), docH - CELL);
    return {
      a: { x: rand(cols + 1) * CELL, y: ay },
      b: { x: rand(cols + 1) * CELL, y: Math.round(by / CELL) * CELL },
      t,
      speed: 0.0025 + Math.random() * 0.003,
      color: rand(2)
    };
  }

  function stepPacket(p) {
    if (p.horizontal) p.x += p.speed * p.dir;
    else p.y += p.speed * p.dir;

    if (Math.abs(p.x % CELL) < p.speed && Math.abs(p.y % CELL) < p.speed) {
      const gx = Math.round(p.x / CELL) * CELL;
      const gy = Math.round(p.y / CELL) * CELL;
      nodes.set(nodeKey(gx, gy), 1);
      if (Math.random() < 0.28) {
        p.x = gx;
        p.y = gy;
        p.horizontal = !p.horizontal;
        p.dir = Math.random() < 0.5 ? 1 : -1;
        p.turns.push({ x: gx, y: gy });
        if (p.turns.length > 5) p.turns.shift();
      }
    }

    if (p.x < -CELL * 2 || p.x > docW + CELL * 2 || p.y < -CELL * 2 || p.y > docH + CELL * 2) {
      Object.assign(p, makePacket());
    }
  }

  function drawPacket(p, minY, maxY) {
    if (p.y < minY || p.y > maxY) return;

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    let remaining = p.len;
    let cx = p.x;
    let cy = p.y;

    for (let i = p.turns.length - 1; i >= 0 && remaining > 0; i--) {
      const t = p.turns[i];
      const d = Math.abs(cx - t.x) + Math.abs(cy - t.y);
      if (d >= remaining) {
        const k = remaining / (d || 1);
        ctx.lineTo(cx + (t.x - cx) * k, cy + (t.y - cy) * k);
        remaining = 0;
      } else {
        ctx.lineTo(t.x, t.y);
        remaining -= d;
        cx = t.x;
        cy = t.y;
      }
    }

    ctx.strokeStyle = `rgba(${COLORS[p.color]}, 0.58)`;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.drawImage(GLOWS[p.color], p.x - 11, p.y - 11);
  }

  function drawNodes(minY, maxY) {
    nodes.forEach((glow, key) => {
      const y = Math.floor(key / 10000) * CELL;
      if (y >= minY && y <= maxY) {
        const x = (key % 10000) * CELL;
        ctx.globalAlpha = glow * 0.68;
        ctx.drawImage(NODE_GLOW, x - 9, y - 9);
      }
      const next = glow - 0.014;
      if (next <= 0) nodes.delete(key);
      else nodes.set(key, next);
    });
    ctx.globalAlpha = 1;
  }

  function drawLinks(minY, maxY) {
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    for (let i = 0; i < links.length; i++) {
      const l = links[i];
      const inView = (l.a.y >= minY && l.a.y <= maxY) || (l.b.y >= minY && l.b.y <= maxY);
      if (inView) {
        const mx = (l.a.x + l.b.x) / 2;
        const my = Math.min(l.a.y, l.b.y) - 80;
        ctx.strokeStyle = `rgba(${COLORS[l.color]}, 0.12)`;
        ctx.beginPath();
        ctx.moveTo(l.a.x, l.a.y);
        ctx.quadraticCurveTo(mx, my, l.b.x, l.b.y);
        ctx.stroke();

        const t = l.t;
        const px = (1 - t) * (1 - t) * l.a.x + 2 * (1 - t) * t * mx + t * t * l.b.x;
        const py = (1 - t) * (1 - t) * l.a.y + 2 * (1 - t) * t * my + t * t * l.b.y;
        ctx.drawImage(GLOWS[l.color], px - 11, py - 11);
      }
      l.t += l.speed;
      if (l.t >= 1) {
        nodes.set(nodeKey(l.b.x, l.b.y), 1);
        Object.assign(l, makeLink(0));
      }
    }
    ctx.setLineDash([]);
  }

  function frame() {
    // Rango actualmente visible (con margen superior e inferior para que nunca parpadee al bajar rápido)
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const margin = 420;
    const minY = Math.max(0, scrollY - margin);
    const maxY = Math.min(docH, scrollY + vh + margin);

    // Solo limpiamos y redibujamos la franja activa del documento
    ctx.clearRect(0, minY, docW, maxY - minY);

    drawLinks(minY, maxY);
    for (let i = 0; i < packets.length; i++) {
      const p = packets[i];
      stepPacket(p);
      drawPacket(p, minY, maxY);
    }
    drawNodes(minY, maxY);

    requestAnimationFrame(frame);
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 120);
  });
  window.addEventListener("load", measure);

  measure();
  frame();
})();
