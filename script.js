// =========================================================
// CHECKPOINT 1.1 — Conectando IA + Widget Flotante de Maylo
// =========================================================

// Cuando tengas el número oficial de WhatsApp para Maylo, escríbelo aquí
// con código de país, sin "+" ni espacios. Ejemplo Colombia: "573001234567"
const WHATSAPP_MAYLO = "";

// Respuestas del Bot de Exhibición dentro del widget flotante
const MAYLO_SCENARIOS = {
  pantalla: {
    question: "Hola, ¿cuánto cuesta cambiar la pantalla de un iPhone 13?",
    answer:
      "¡Hola! Soy Maylo ⚡ Tengo pantalla OLED para iPhone 13 disponible en inventario ($340.000 COP con instalación y garantía). Queda lista en 45 minutos. ¿Agendamos recepción o domicilio en Bello?"
  },
  inventario: {
    question: "¿Tienen batería Samsung A54 y domicilio hoy en Bello?",
    answer:
      "¡Sí! Hay 4 unidades en stock ($145.000 COP instalada) ✅ y contamos con ruta de domicilio hoy en Bello y Valle de Aburrá. ¿A qué dirección programamos la recogida?"
  },
  retail: {
    question: "Tengo un negocio y quiero mover mi inventario por WhatsApp.",
    answer:
      "¡Perfecto! Con Conectando IA y Maylo atendemos a tus clientes 24/7, cotizamos tu catálogo y programamos envíos automáticamente. Agenda tu Llamada Consultiva para activar tu empresa."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Año automático en el pie de página
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================================================
  // WIDGET FLOTANTE ESTABLE DE MAYLO
  // =========================================================
  const mayloPanel = document.getElementById("mayloPanel");
  const mayloFab = document.getElementById("mayloFab");
  const mayloCloseBtn = document.getElementById("mayloCloseBtn");
  const mayloBody = document.getElementById("mayloWidgetBody");
  const mayloStatus = document.getElementById("mayloWidgetStatus");
  const mayloWhatsappLink = document.getElementById("mayloWhatsappLink");
  const openFromHero = document.getElementById("openMayloFromHero");
  const openFromSpotlight = document.getElementById("openMayloFromSpotlight");
  const openFromSection = document.getElementById("openMayloFromSection");

  let widgetInitialized = false;

  function addMessage(sender, text, time = "Ahora") {
    if (!mayloBody) return;
    const div = document.createElement("div");
    div.className = `wa-msg ${sender}`;
    div.innerHTML = `${text}<span class="wa-time">${time}</span>`;
    mayloBody.appendChild(div);
    mayloBody.scrollTop = mayloBody.scrollHeight;
  }

  function addTyping() {
    if (!mayloBody) return null;
    const div = document.createElement("div");
    div.className = "wa-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    mayloBody.appendChild(div);
    mayloBody.scrollTop = mayloBody.scrollHeight;
    return div;
  }

  function initWidgetMessages() {
    if (widgetInitialized || !mayloBody) return;
    widgetInitialized = true;
    addMessage(
      "maylo",
      "¡Hola! Soy <strong>Maylo</strong>, el asistente virtual de <strong>Conectando IA</strong> 👋 Elige una opción abajo para ver cómo atiendo y cotizo en segundos.",
      "Ahora"
    );
  }

  function openWidget() {
    if (!mayloPanel || !mayloFab) return;
    mayloPanel.classList.add("open");
    mayloPanel.setAttribute("aria-hidden", "false");
    mayloFab.setAttribute("aria-expanded", "true");
    initWidgetMessages();
  }

  function closeWidget() {
    if (!mayloPanel || !mayloFab) return;
    mayloPanel.classList.remove("open");
    mayloPanel.setAttribute("aria-hidden", "true");
    mayloFab.setAttribute("aria-expanded", "false");
  }

  if (mayloFab) {
    mayloFab.addEventListener("click", () => {
      if (mayloPanel && mayloPanel.classList.contains("open")) {
        closeWidget();
      } else {
        openWidget();
      }
    });
  }

  if (mayloCloseBtn) mayloCloseBtn.addEventListener("click", closeWidget);
  if (openFromHero) openFromHero.addEventListener("click", openWidget);
  if (openFromSpotlight) openFromSpotlight.addEventListener("click", openWidget);
  if (openFromSection) openFromSection.addEventListener("click", openWidget);

  // Preguntas rápidas del widget
  document.querySelectorAll(".chip-btn").forEach((chip) => {
    chip.addEventListener("click", () => {
      const scenario = MAYLO_SCENARIOS[chip.dataset.scenario];
      if (!scenario) return;

      addMessage("client", scenario.question, "Ahora");
      if (mayloStatus) mayloStatus.textContent = "Maylo está escribiendo...";
      const typing = addTyping();

      setTimeout(() => {
        if (typing) typing.remove();
        if (mayloStatus) mayloStatus.textContent = "En línea • Atención 24/7";
        addMessage("maylo", scenario.answer, "Ahora");
      }, 650);
    });
  });

  // Vincular botón de WhatsApp directo cuando WHATSAPP_MAYLO tenga número
  if (mayloWhatsappLink && WHATSAPP_MAYLO) {
    const msg = encodeURIComponent(
      "Hola Maylo, vengo desde Conectando IA y quiero información para mi negocio."
    );
    mayloWhatsappLink.href = `https://wa.me/${WHATSAPP_MAYLO}?text=${msg}`;
    mayloWhatsappLink.target = "_blank";
    mayloWhatsappLink.rel = "noopener noreferrer";
  }

  // Maylo animado: hace su rutina una vez, se queda dormido
  // y vuelve a repetirla solo cuando se pasa el cursor (o se toca) sobre él
  const mayloVideo = document.getElementById("mayloHeroVideo");
  const mayloStage = mayloVideo ? mayloVideo.closest(".maylo-figure-stage") : null;
  if (mayloVideo && mayloStage) {
    mayloVideo.loop = false;
    const replayMaylo = () => {
      if (!mayloVideo.paused && !mayloVideo.ended) return;
      mayloVideo.currentTime = 0;
      mayloVideo.play().catch(() => {});
    };
    mayloStage.addEventListener("mouseenter", replayMaylo);
    mayloStage.addEventListener("click", replayMaylo);
  }

  // Animación suave al hacer scroll (con entrada en cascada para tarjetas hermanas)
  document.querySelectorAll(".compare-grid, .cap-grid, .pillars-grid, .spotlight-metrics").forEach((grid) => {
    Array.from(grid.children).forEach((child, idx) => {
      child.style.setProperty("--reveal-delay", `${idx * 90}ms`);
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Efecto Spotlight (luz que sigue al cursor sobre las tarjetas glass-card)
  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });

  // Barra de progreso de lectura superior y resaltado de sección activa en el menú (optimizado con requestAnimationFrame)
  const scrollProgress = document.getElementById("scrollProgress");
  const trackedSections = Array.from(document.querySelectorAll("main section[id]"));
  const navMenuLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]:not(.btn)'));

  let scrollTicking = false;
  const updateScrollUI = () => {
    scrollTicking = false;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollProgress) {
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      scrollProgress.style.transform = `scaleX(${progress})`;
    }

    let currentId = "";
    const triggerPoint = scrollTop + window.innerHeight * 0.32;
    for (let i = 0; i < trackedSections.length; i++) {
      if (trackedSections[i].offsetTop <= triggerPoint) {
        currentId = trackedSections[i].id;
      }
    }

    navMenuLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(updateScrollUI);
      }
    },
    { passive: true }
  );
  updateScrollUI();

  // Formulario de Llamada Consultiva
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const empresa = document.getElementById("empresa").value.trim();
      const whatsapp = document.getElementById("whatsapp").value.trim();
      const objetivo = document.getElementById("objetivo").value.trim();

      if (!nombre || !empresa || !whatsapp) {
        formStatus.style.color = "#f87171";
        formStatus.textContent = "Por favor completa tu nombre, tipo de negocio y WhatsApp.";
        return;
      }

      if (WHATSAPP_MAYLO) {
        const text = encodeURIComponent(
          `Hola Conectando IA, soy ${nombre} (${empresa}). Quiero agendar una Llamada Consultiva para Maylo. Mi WhatsApp: ${whatsapp}.${
            objetivo ? ` Objetivo: ${objetivo}` : ""
          }`
        );
        window.open(`https://wa.me/${WHATSAPP_MAYLO}?text=${text}`, "_blank", "noopener,noreferrer");
      }

      formStatus.style.color = "#00d2ff";
      formStatus.textContent = `¡Solicitud recibida, ${nombre}! Coordinaremos tu Llamada Consultiva para "${empresa}".`;
      contactForm.reset();
    });
  }
});
