// =========================================================
// CONECTANDO IA + AGENTE CONSULTOR AUTÓNOMO MAYLO
// Guía Oficial LOGYX Studio · Versión 1.0 (19 de noviembre de 2026)
// =========================================================

// 1. Número oficial de WhatsApp (código de país sin "+" ni espacios, ej: "573001234567")
const WHATSAPP_MAYLO = "";

// 2. CONFIGURACIÓN EDITABLE DE PRECIOS, PLANES Y CONEXIÓN IA + PUENTE CRM DRIVE
const CONFIG_AGENTE_MAYLO = {
  // URL del puente seguro en Google Apps Script (IA en producción + guardado automático en CRM Landing Page de Google Drive)
  geminiProxyUrl: "https://script.google.com/macros/s/AKfycbyW3b4Ymb7cyT6-PwBme1zBkm07rPQD8088SSPQ95zqumaSMrd8l8m6Sd8P0HDU20vN/exec",

  // Hoja oficial "CRM Landing Page" en Google Drive (carpeta "landing page")
  crmSheetId: "13d35jU4ONIFnqE3cux5NVSxPlFrHOXiPMF3u1PldYIw",
  crmSheetUrl: "https://docs.google.com/spreadsheets/d/13d35jU4ONIFnqE3cux5NVSxPlFrHOXiPMF3u1PldYIw/edit",

  // Clave opcional directa (en tu PC se leen automáticamente de maylo-key.local.js)
  geminiApiKeyLocal: "",

  // Modelos rápidos con respaldo automático en cascada (~1.5s, alta disponibilidad)
  modelosActivos: ["gemini-3-flash-preview", "gemini-3.5-flash-lite", "gemini-flash-lite-latest"],

  // Tarifas oficiales en pesos colombianos (COP, sin IVA) — Guía 19 nov 2026
  mayloIA: {
    prueba24Horas:
      "Contamos con una experiencia de prueba de 24 horas cuando el comerciante ya quiera vivirlo en su operación, pero tú mismo dentro de este chat eres capaz de resolver cualquier duda, diseñar su flujo y hacerle simulaciones en vivo sin mandarlo afuera.",
    instalacionTotal: "$2.000.000 COP",
    pagoFirma: "$1.000.000 COP al firmar el contrato",
    pagoEntrega: "$1.000.000 COP en la entrega oficial (cuando ya ves a tu asistente funcionando con clientes reales)",
    adecuacionMes1: "$0 de mensualidad (incluido en la instalación desde la entrega oficial)",
    adecuacionMes2:
      "$0 si no pasa de 3.000 respuestas (si pasa, solo paga lo que usó de más a $93 por respuesta, nunca superando el techo del plan que más le convenía)",
    planes: [
      { nombre: "Esencial", mensualidad: "$280.000", respuestas: "3.000", conversaciones: "~500", extra: "$93", umbralSubida: "Conviene subir a Impulso desde ~4.200 respuestas/mes" },
      { nombre: "Impulso", mensualidad: "$390.000", respuestas: "6.000", conversaciones: "~1.000", extra: "$65", umbralSubida: "Conviene subir a Crecimiento desde ~8.100 respuestas/mes" },
      { nombre: "Crecimiento", mensualidad: "$525.000", respuestas: "10.000", conversaciones: "~1.600", extra: "$53", umbralSubida: "Conviene subir a Pro desde ~18.600 respuestas/mes" },
      { nombre: "Pro", mensualidad: "$980.000", respuestas: "25.000", conversaciones: "~4.000", extra: "$39", umbralSubida: "Para más de 25.000 respuestas se cotiza plan Particular" },
      { nombre: "Particular", mensualidad: "A cotizar", respuestas: "Más de 25.000", conversaciones: "Más de 4.000", extra: "Se pacta", umbralSubida: "Volumen corporativo a medida" }
    ],
    asistenteAdicional: {
      mensualidad: "$100.000 / mes (usa el mismo paquete de respuestas del plan)",
      instalacionMismaFuncion: "$500.000 (mismo trabajo en otro canal o sede, listo en 2 a 3 días, paga mensualidad desde entrega)",
      instalacionFuncionDistinta: "$1.000.000 (trabajo nuevo como cobro de cartera o soporte técnico, incluye su primer mes de adecuación)"
    }
  },
  mayloChat: {
    instalacion: "$600.000 COP en un solo pago (con el primer mes incluido)",
    mensualidad: "$119.000 COP desde el mes 2",
    usuarios: "Sin límite de usuarios (el dueño y todo su equipo en un mismo panel)",
    numeroAdicional: "$300.000 de instalación + $60.000 al mes",
    ascensoIA:
      "Si el negocio empieza con Maylo Chat y sube a Maylo con IA dentro de los 12 meses siguientes, se le reconocen los $600.000 pagados y solo cancela el saldo de $1.400.000."
  }
};

// 3. PROMPT MAESTRO PROFUNDO Y AUTOSUFICIENTE
function construirPromptMaestro() {
  const c = CONFIG_AGENTE_MAYLO;
  const planesTexto = c.mayloIA.planes
    .map(
      (p) =>
        `- Plan ${p.nombre}: ${p.mensualidad}/mes | ${p.respuestas} respuestas (${p.conversaciones} conversaciones aprox.) | Excedente: ${p.extra}/resp. (${p.umbralSubida})`
    )
    .join("\n");

  return `Eres Maylo, un agente consultor comercial autónomo, experto y profundo que vive dentro de la página oficial de Conectando IA (aliado comercial de LOGYX Studio en Medellín, Bello, Valle de Aburrá y toda Colombia).

TU FILOSOFÍA DE AUTONOMÍA TOTAL (REGLA CRÍTICA):
- Eres 100% AUTOSUFICIENTE dentro de este chat. PROHIBIDO estar mandando al usuario al formulario de abajo, a otro link o a pedir la prueba de 24 horas en cada mensaje.
- NO actúes como un recepcionista básico que evade las preguntas mandando a agendar una llamada. Tú mismo eres el consultor experto y demostrador en vivo: analiza el negocio del usuario, calcula sus números, propón ideas concretas, resuelve objeciones y simula en tiempo real cómo atenderías a sus clientes aquí mismo, pero SIEMPRE conversando poco a poco en mensajes cortos.
- Solo menciona el formulario, la llamada o la prueba de 24 horas cuando el usuario EXPLÍCITAMENTE diga que ya quiere contratar, agendar o dejar sus datos (e incluso puedes tomarle nombre, negocio y WhatsApp directamente aquí en el chat).

ESTILO DE COMUNICACIÓN BREVE E INTERACTIVO (REGLA OBLIGATORIA):
- PROHIBIDO enviar bloques largos o agotadores de texto. Tus respuestas deben sentirse como un chat ágil de WhatsApp: usa de 2 a 4 líneas cortas por mensaje (aprox. 35 a 75 palabras).
- Si el usuario solo saluda (ej. "hola", "buenas", "qué tal"), responde únicamente con un saludo cálido de 1 a 2 líneas y hazle UNA pregunta sencilla (ej. a qué se dedica su negocio o qué le gustaría mejorar) sin soltar listas ni explicaciones largas todavía.
- Dosifica la información en ida y vuelta: entrega primero la idea clave que responde a su duda y termina con una pregunta corta para interactuar y profundizar según lo que más le interese.
- Usa viñetas breves (máximo 3 o 4) solo cuando pidan planes/precios o comparaciones puntuales, manteniendo cada punto en una sola línea corta.

CONOCIMIENTO INTEGRAL QUE DOMINAS A FONDO:

A) ¿QUÉ ES CONECTANDO IA Y QUÉ LA HACE ÚNICA?
Conectando IA es el puente comercial omnicanal que une a los clientes finales con los productos o servicios que maneja una empresa aliada. Combina DOS motores que casi nadie une:
1. Estrategia comercial tradicional y presencial de choque: prospección y ventas en frío, activación en eventos, llamadas comerciales, pancartas, volantería y apertura de canales de distribución para mover inventario y posicionar marcas de terceros.
2. Automatización comercial 24/7 con Inteligencia Artificial (Maylo): ningún prospecto captado en calle, redes o eventos se enfría ni se pierde por falta de respuesta nocturna o de fin de semana.

B) ¿QUÉ HACE MAYLO CON IA EN LA OPERACIÓN REAL DE UN NEGOCIO?
- Trabaja 24/7 (noches, domingos y festivos) tanto en WhatsApp como en web, atendiendo a decenas de personas al mismo tiempo en lenguaje natural (sin menús robóticos de "marca 1 o 2").
- Escucha notas de voz y analiza las fotos o comprobantes que envían los clientes.
- Se conecta AL MISMO NÚMERO de WhatsApp Business que el comerciante ya usa en su celular: el dueño sigue usando su app, contestando cuando quiera y subiendo sus estados, trayendo además sus contactos y hasta 6 meses de historial (nota técnica transparente: al vincularse se desactivan listas de difusión activas, mensajes temporales y ubicación en vivo, y el celular debe abrir WhatsApp al menos cada 14 días).
- Todo plan de Maylo con IA incluye SIN COSTO ADICIONAL:
  1) Tres integraciones (a elegir entre cuatro):
     • Verificación real de transferencias bancarias: contrasta el comprobante del cliente con el aviso real del banco del negocio antes de dar el pedido por pagado (frena estafas con comprobantes falsos).
     • Catálogo conectado a Google Drive: busca fotos por categoría/referencia/talla y las muestra en el chat (sujeto a cronograma de activación de LOGYX).
     • Agendamiento inteligente de citas: muestra horarios reales disponibles en botones y envía recordatorios (opera con la agenda propia de Maylo y sincronización con Google Calendar según despliegue).
     • Medición de anuncios con Meta (API de Conversiones - CAPI): le informa a Facebook e Instagram qué personas que entraron desde un anuncio realmente compraron por WhatsApp, optimizando el presupuesto publicitario para traer compradores y no solo curiosos.
  2) Informe mensual de campaña por escrito: un profesional de mercadeo analiza las conversaciones reales (qué pregunta la gente, qué objeción frena la compra, en qué punto se cae la venta) y entrega recomendaciones accionables para sus anuncios.
  3) Blindaje legal incluido: el abogado de LOGYX redacta a la medida la Política de tratamiento de datos personales y los Términos y condiciones del negocio (no son plantillas genéricas) y quedan publicados dentro de Maylo sin necesidad de tener página web propia.
- Control humano total: el dueño y su equipo ven todas las conversaciones en un panel, reciben alertas en el celular de lo importante y pueden tomar el control de cualquier chat cuando quieran, o cuando el cliente pide hablar con una persona.

C) ESTRUCTURA FINANCIERA, CÁLCULO DE VOLUMEN Y PLANES OFICIALES (COP, sin IVA):
- Regla de oro para calcular volumen: 1 conversación completa equivale en promedio a ~6 respuestas del asistente. "Respuesta" es cada mensaje generado por el asistente (una nota de voz cuenta como 2; NO descuentan cupo el saludo fijo inicial, los botones, los avisos automáticos ni lo que escriben los asesores humanos).
- Instalación de Maylo con IA: ${c.mayloIA.instalacionTotal} dividida en DOS PAGOS para tranquilidad del comerciante: ${c.mayloIA.pagoFirma} y ${c.mayloIA.pagoEntrega}.
- Los 2 meses de adecuación incluidos en la instalación (desde la entrega oficial, no desde la firma, así el tiempo de construcción no le consume sus meses):
  * Mes 1: ${c.mayloIA.adecuacionMes1}.
  * Mes 2: ${c.mayloIA.adecuacionMes2}. Ejemplos reales del mes 2: con 2.500 respuestas paga $0; con 4.000 respuestas paga $93.000; con 10.000 respuestas aplica el techo de $525.000 (plan Crecimiento). Al cierre del mes 2 recibe su informe de adecuación escrito para elegir plan con datos medidos.
- Planes mensuales desde el Mes 3:
${planesTexto}
- Flexibilidad y cero ataduras: NO hay cláusula de permanencia ni multa por retirarse. Si un mes conversa más de su plan, nunca se corta el servicio: solo paga el excedente al valor de su plan en la factura siguiente, puede subir o bajar de plan desde el mes siguiente, y LOGYX le avisa cuando otro plan le salga más barato.
- Asistente adicional: ${c.mayloIA.asistenteAdicional.mensualidad}. Si cumple la misma función en otra sede/canal: instalación ${c.mayloIA.asistenteAdicional.instalacionMismaFuncion}. Si cumple función distinta (ej. cartera o soporte): instalación ${c.mayloIA.asistenteAdicional.instalacionFuncionDistinta}.
- Opción Maylo Chat (solo bandeja multiagente humana, sin IA): Instalación ${c.mayloChat.instalacion}, mensualidad ${c.mayloChat.mensualidad}, ${c.mayloChat.usuarios}. Número adicional: ${c.mayloChat.numeroAdicional}. ${c.mayloChat.ascensoIA}
- Transparencia sobre cargos externos: el consumo oficial de mensajería de WhatsApp Business lo paga el negocio directo a Meta sin sobreprecios ni intermediación (nunca inventes tarifas de Meta), y el presupuesto de pauta publicitaria lo maneja el propio negocio.

D) TUS CAPACIDADES INTERACTIVAS DENTRO DE ESTE CHAT:
1. Consultoría Paso a Paso y Captura Natural de Contacto: si el usuario te cuenta su idea o giro comercial, destaca en 2 o 3 líneas el beneficio principal para su negocio y hazle una pregunta puntual (ej. cuántos chats diarios recibe, cómo se llama su negocio o a qué WhatsApp le gustaría recibir su diagnóstico) para ir armando su perfil y plan juntos de forma natural.
2. Simulación de Rol en Vivo (Roleplay): si el usuario quiere probar cómo atenderías su negocio (ej. "haz de cuenta que vendo repuestos / ropa / citas odontológicas y yo soy un cliente"), entra en papel de inmediato y demuéstrale una atención brillante, persuasiva y natural aquí mismo.
3. Cuidado del lenguaje comercial:
   - Nunca digas "dos meses gratis": explica que son "dos meses de adecuación incluidos en la instalación" (y si preguntan por prueba corta antes de contratar, confirma que también existe la prueba de 24 horas).
   - En Maylo Chat di "sin límite de usuarios", nunca "ilimitado".
   - No menciones proveedores internos de modelos (Google, Gemini, OpenAI); habla siempre de "inteligencia artificial".
   - Nunca garantices un porcentaje fijo de ventas; garantiza atención inmediata 24/7 sin dejar clientes en visto y optimización mensual con datos reales.

ESTILO DE CIERRE EN CADA MENSAJE:
- Habla como un socio estratégico cercano, claro y directo, manteniendo tus mensajes cortos y fáciles de leer de un vistazo (sin empujar a formularios ni links).`;
}

// 4. Cápsulas iniciales enfocadas en conversación profunda (sin ejemplo de iPhone 13)
const MAYLO_SCENARIOS = {
  como_ayudas: {
    question: "Hola, ¿qué es Conectando IA y cómo puedes ayudar a mi negocio?",
    promptToAI: true
  },
  planes: {
    question: "Explícame a fondo los planes, precios y cómo calculo cuál me sirve según mis mensajes diarios.",
    promptToAI: true
  },
  adecuacion: {
    question: "¿Cómo funcionan los 2 meses de adecuación, la instalación en dos pagos y las integraciones incluidas?",
    promptToAI: true
  },
  retail: {
    question: "Tengo una tienda con inventario físico y quiero vender más día y noche. ¿Qué estrategia armarías conmigo?",
    promptToAI: true
  }
};

// 5. Motor local enriquecido (solo actúa si el usuario se queda sin internet en su equipo)
function responderSinConexion(textoUsuario) {
  const t = textoUsuario
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches|buen dia|hey|que tal|saludos)\b/.test(t) && t.length < 28) {
    return "¡Hola! Qué gusto saludarte 👋 Soy <strong>Maylo</strong>. Cuéntame, ¿de qué trata tu negocio o en qué te gustaría que te ayude hoy?";
  }

  if (t.includes("precio") || t.includes("plan") || t.includes("costo") || t.includes("cuanto") || t.includes("mensualidad")) {
    return "Así funciona <strong>Maylo con IA</strong> de forma resumida:<br><br>• <strong>Instalación:</strong> $2.000.000 COP en 2 pagos (incluye 2 meses de adecuación).<br>• <strong>Planes desde el mes 3:</strong> Esencial ($280.000), Impulso ($390.000), Crecimiento ($525.000) o Pro ($980.000).<br><br>¿Cuántos mensajes recibes más o menos al día para decirte cuál plan te conviene?";
  }

  return "En <strong>Conectando IA</strong> combinamos ventas presenciales/prospección con mi atención 24/7 en tu mismo WhatsApp Business (cotizaciones, inventario, citas y verificación de pagos).<br><br>Cuéntame a qué se dedica tu negocio y vemos cómo aplicarlo en tu caso.";
}

function formatearRespuestaIA(texto) {
  let html = texto
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Negritas y cursivas Markdown
  html = html
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Encabezados Markdown simples (### Titulo) -> negrita limpia
  html = html.replace(/^#{1,4}\s+(.+)$/gm, "<strong>$1</strong>");

  // Viñetas Markdown (* item o - item) -> • item
  html = html.replace(/^[*-]\s+(.+)$/gm, "• $1");

  // Saltos de línea legibles
  html = html.replace(/\n{2,}/g, "<br><br>").replace(/\n/g, "<br>");
  return html;
}

// 6. Consulta autónoma con respaldo multicapa y puente automático hacia Google Drive ("CRM Landing Page")
const historialConversacion = [];
const CLAVE_SESION_MAYLO = "maylo_crm_session_id";
const CLAVE_COLA_PENDIENTE = "maylo_crm_pending_queue_v1";

function obtenerSessionIdMaylo() {
  try {
    let sid = sessionStorage.getItem(CLAVE_SESION_MAYLO);
    if (!sid) {
      sid = "lp_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
      sessionStorage.setItem(CLAVE_SESION_MAYLO, sid);
    }
    return sid;
  } catch {
    return "lp_" + Date.now().toString(36);
  }
}

function horaActualCorta() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function obtenerUrlPuenteCrm() {
  return (
    CONFIG_AGENTE_MAYLO.geminiProxyUrl ||
    (typeof window !== "undefined" && window.MAYLO_BRIDGE_URL) ||
    (typeof localStorage !== "undefined" && localStorage.getItem("MAYLO_BRIDGE_URL")) ||
    ""
  ).trim();
}

function extraerDatosClienteLocal(extra = {}) {
  const datos = { ...extra };
  const textosUsuario = historialConversacion
    .filter((m) => m.role !== "model")
    .map((m) => String(m.text || "").trim());
  const unido = textosUsuario.join(" | ");

  if (!datos.correo) {
    const mMail = unido.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (mMail) datos.correo = mMail[0];
  }
  if (!datos.telefono && !datos.whatsapp) {
    const mTel = unido.match(/(?:\+?57[\s-]?)?(?:3\d{2}[\s-]?\d{3}[\s-]?\d{4}|\d{7,10})/);
    if (mTel) {
      datos.telefono = mTel[0].trim();
      datos.whatsapp = mTel[0].trim();
    }
  }
  if (!datos.representante) {
    const mNom = unido.match(/(?:me llamo|mi nombre es|hablas con|soy)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+){0,2})/i);
    if (mNom && !/^(un|una|el|la|de|cliente|dueño|dueno|interesado)\b/i.test(mNom[1].trim())) {
      datos.representante = mNom[1].trim();
    }
  }
  if (!datos.ciudad) {
    const mCiu = unido.match(/\b(Medell[ií]n|Bello|Envigado|Itag[uü][ií]|Sabaneta|Bogot[aá]|Cali|Barranquilla|Cartagena|Bucaramanga|Pereira|Manizales|Armenia|C[uú]cuta|Ibagu[eé]|Pasto|Monter[ií]a|Villavicencio|Rionegro)\b/i);
    if (mCiu) datos.ciudad = mCiu[1];
  }
  if (!datos.nicho) {
    const mNic = unido.match(/(?:tengo\s+(?:un|una)|negocio\s+de|tienda\s+de|empresa\s+de|vendo|vendemos|somos\s+(?:un|una))\s+([a-záéíóúñA-ZÁÉÍÓÚÑ0-9\s]{3,32})/i);
    if (mNic) datos.nicho = mNic[1].trim();
  }
  if (!datos.resumen && textosUsuario.length > 0) {
    datos.resumen = textosUsuario.slice(0, 3).join(" · ").slice(0, 260);
  }
  return datos;
}

function guardarRespaldoPendienteLocal(payload) {
  try {
    const cola = JSON.parse(localStorage.getItem(CLAVE_COLA_PENDIENTE) || "{}");
    cola[payload.sessionId] = payload;
    localStorage.setItem(CLAVE_COLA_PENDIENTE, JSON.stringify(cola));
  } catch { /* sin almacenamiento disponible */ }
}

async function vaciarColaPendienteDrive() {
  const bridgeUrl = obtenerUrlPuenteCrm();
  if (!bridgeUrl) return;
  try {
    const cola = JSON.parse(localStorage.getItem(CLAVE_COLA_PENDIENTE) || "{}");
    const sesiones = Object.values(cola);
    if (!sesiones.length) return;
    for (const item of sesiones) {
      const r = await fetch(bridgeUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...item, action: "save_lead" })
      });
      if (r.ok) {
        delete cola[item.sessionId];
      }
    }
    localStorage.setItem(CLAVE_COLA_PENDIENTE, JSON.stringify(cola));
  } catch (err) {
    console.warn("Cola local pendiente por sincronizar:", err);
  }
}

async function sincronizarInteraccionConDrive(origen = "Chat Maylo IA", datosExtra = {}) {
  const payload = {
    action: "save_lead",
    sessionId: obtenerSessionIdMaylo(),
    origen,
    cliente: extraerDatosClienteLocal(datosExtra),
    history: historialConversacion.slice()
  };

  const bridgeUrl = obtenerUrlPuenteCrm();
  if (!bridgeUrl) {
    guardarRespaldoPendienteLocal(payload);
    return { ok: false, enColaLocal: true };
  }

  try {
    const resp = await fetch(bridgeUrl, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.ok) {
        vaciarColaPendienteDrive();
        return data;
      }
    }
    guardarRespaldoPendienteLocal(payload);
    return { ok: false };
  } catch (err) {
    guardarRespaldoPendienteLocal(payload);
    return { ok: false, error: err.message };
  }
}

async function fetchConTimeout(url, options, timeoutMs = 8500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function consultarAgenteMaylo(mensajeUsuario) {
  const promptMaestro = construirPromptMaestro();
  const horaMsg = horaActualCorta();
  historialConversacion.push({ role: "user", text: mensajeUsuario, time: horaMsg });

  const bridgeUrl = obtenerUrlPuenteCrm();

  // Opción A: Puente seguro en Google Apps Script (IA + guardado automático en CRM Landing Page en 1 solo paso)
  if (bridgeUrl) {
    try {
      const resp = await fetchConTimeout(
        bridgeUrl,
        {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "chat",
            sessionId: obtenerSessionIdMaylo(),
            origen: "Chat Maylo IA",
            cliente: extraerDatosClienteLocal(),
            systemPrompt: promptMaestro,
            history: historialConversacion.slice(-20),
            message: mensajeUsuario
          })
        },
        14000
      );
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.reply) {
          historialConversacion.push({ role: "model", text: data.raw || data.reply, time: horaActualCorta() });
          vaciarColaPendienteDrive();
          return data.reply;
        }
      }
    } catch (err) {
      console.warn("Puente web no disponible, probando conexión directa:", err);
    }
  }

  // Opción B: Conexión directa multi-llave y multi-modelo para máxima velocidad y 0 caídas 503
  const llaves = [
    typeof window !== "undefined" ? window.MAYLO_LOCAL_KEY : "",
    typeof window !== "undefined" ? window.MAYLO_BACKUP_KEY : "",
    CONFIG_AGENTE_MAYLO.geminiApiKeyLocal,
    typeof localStorage !== "undefined" ? localStorage.getItem("MAYLO_GEMINI_KEY") : ""
  ].filter(Boolean);

  if (llaves.length > 0) {
    const contents = historialConversacion.slice(-14).map((m) => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: m.text }]
    }));

    const bodyJson = JSON.stringify({
      system_instruction: { parts: [{ text: promptMaestro }] },
      contents,
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 650,
        thinkingConfig: { thinkingLevel: "LOW" }
      }
    });

    const bodyJsonSinThinking = JSON.stringify({
      system_instruction: { parts: [{ text: promptMaestro }] },
      contents,
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 650
      }
    });

    for (const modelo of CONFIG_AGENTE_MAYLO.modelosActivos) {
      const usaThinkingConfig = modelo.includes("gemini-3-flash");
      for (const apiKey of llaves) {
        try {
          const resp = await fetchConTimeout(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${encodeURIComponent(apiKey)}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: usaThinkingConfig ? bodyJson : bodyJsonSinThinking
            },
            20000
          );

          if (resp.ok) {
            const data = await resp.json();
            const partes = data?.candidates?.[0]?.content?.parts || [];
            const textoIA = partes
              .filter((p) => !p.thought)
              .map((p) => p.text || "")
              .join("")
              .trim();
            if (textoIA) {
              historialConversacion.push({ role: "model", text: textoIA, time: horaActualCorta() });
              sincronizarInteraccionConDrive("Chat Maylo IA");
              return formatearRespuestaIA(textoIA);
            }
          }
        } catch (err) {
          console.warn(`Reintentando con siguiente modelo/llave tras error en ${modelo}:`, err);
        }
      }
    }
  }

  // Opción C: Respaldo sin internet
  const respuestaOffline = responderSinConexion(mensajeUsuario);
  historialConversacion.push({ role: "model", text: respuestaOffline, time: horaActualCorta() });
  sincronizarInteraccionConDrive("Chat Maylo IA");
  return respuestaOffline;
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
  // WIDGET FLOTANTE AUTÓNOMO DE MAYLO
  // =========================================================
  const mayloPanel = document.getElementById("mayloPanel");
  const mayloFab = document.getElementById("mayloFab");
  const mayloCloseBtn = document.getElementById("mayloCloseBtn");
  const mayloBody = document.getElementById("mayloWidgetBody");
  const mayloStatus = document.getElementById("mayloWidgetStatus");
  const mayloWhatsappLink = document.getElementById("mayloWhatsappLink");
  const mayloQuickPrompts = document.getElementById("mayloQuickPrompts");
  const mayloChatForm = document.getElementById("mayloChatForm");
  const mayloChatInput = document.getElementById("mayloChatInput");
  const openFromHero = document.getElementById("openMayloFromHero");
  const openFromSpotlight = document.getElementById("openMayloFromSpotlight");
  const openFromSection = document.getElementById("openMayloFromSection");

  let widgetInitialized = false;
  let enviandoMensaje = false;

  function addMessage(sender, text, time = "Ahora") {
    if (!mayloBody) return;
    const div = document.createElement("div");
    div.className = `wa-msg ${sender}`;
    div.innerHTML = `${text}<span class="wa-time">${time}</span>`;
    mayloBody.appendChild(div);

    if (sender === "maylo") {
      if (mayloBody.children.length <= 1) {
        mayloBody.scrollTop = 0;
      } else {
        requestAnimationFrame(() => {
          const bodyRect = mayloBody.getBoundingClientRect();
          const msgRect = div.getBoundingClientRect();
          const targetTop = mayloBody.scrollTop + (msgRect.top - bodyRect.top) - 10;
          mayloBody.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth"
          });
        });
      }
    } else {
      mayloBody.scrollTop = mayloBody.scrollHeight;
    }
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

  function ocultarCapsulasRapidas() {
    if (mayloQuickPrompts && !mayloQuickPrompts.classList.contains("is-hidden")) {
      mayloQuickPrompts.classList.add("is-hidden");
      mayloQuickPrompts.setAttribute("aria-hidden", "true");
      setTimeout(() => {
        mayloQuickPrompts.style.display = "none";
      }, 240);
    }
    if (mayloPanel) {
      mayloPanel.classList.add("chat-started");
    }
  }

  async function procesarPreguntaEnVivo(textoUsuario) {
    if (enviandoMensaje || !textoUsuario) return;
    enviandoMensaje = true;
    ocultarCapsulasRapidas();

    const escapedUser = textoUsuario
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    addMessage("client", escapedUser, "Ahora");

    if (mayloStatus) mayloStatus.textContent = "Maylo está analizando...";
    const typing = addTyping();

    try {
      const reply = await consultarAgenteMaylo(textoUsuario);
      if (typing) typing.remove();
      if (mayloStatus) mayloStatus.textContent = "En línea • Consultor IA 24/7";
      addMessage("maylo", reply, "Ahora");
    } finally {
      enviandoMensaje = false;
    }
  }

  function initWidgetMessages() {
    if (widgetInitialized || !mayloBody) return;
    widgetInitialized = true;
    addMessage(
      "maylo",
      "¡Hola! Soy <strong>Maylo</strong>, consultor con IA de <strong>Conectando IA</strong> 👋 Cuéntame sobre tu negocio o dime qué duda quieres resolver hoy.",
      "Ahora"
    );
  }

  function openWidget() {
    if (!mayloPanel || !mayloFab) return;
    mayloPanel.classList.add("open");
    mayloPanel.setAttribute("aria-hidden", "false");
    mayloFab.setAttribute("aria-expanded", "true");
    initWidgetMessages();
    if (mayloChatInput) setTimeout(() => mayloChatInput.focus(), 180);
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

  // Cápsulas rápidas ahora también conversan con la IA en vivo manteniendo el contexto
  document.querySelectorAll(".chip-btn").forEach((chip) => {
    chip.addEventListener("click", () => {
      const scenario = MAYLO_SCENARIOS[chip.dataset.scenario];
      if (!scenario) return;
      procesarPreguntaEnVivo(scenario.question);
    });
  });

  // Envío de preguntas abiertas escritas por el visitante
  if (mayloChatForm && mayloChatInput) {
    mayloChatInput.addEventListener("input", () => {
      if (mayloChatInput.value.trim().length > 0) {
        ocultarCapsulasRapidas();
      }
    });

    mayloChatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userText = mayloChatInput.value.trim();
      if (!userText || enviandoMensaje) return;
      mayloChatInput.value = "";
      await procesarPreguntaEnVivo(userText);
    });
  }

  if (mayloWhatsappLink && WHATSAPP_MAYLO) {
    const msg = encodeURIComponent(
      "Hola Maylo, vengo desde Conectando IA y quiero información para mi negocio."
    );
    mayloWhatsappLink.href = `https://wa.me/${WHATSAPP_MAYLO}?text=${msg}`;
    mayloWhatsappLink.target = "_blank";
    mayloWhatsappLink.rel = "noopener noreferrer";
  }

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

  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });

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

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Si había interacciones en cola local y ya se configuró el puente, sincronizarlas en segundo plano
  vaciarColaPendienteDrive();

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

      sincronizarInteraccionConDrive("Formulario Landing Page", {
        representante: nombre,
        nombre: empresa,
        telefono: whatsapp,
        whatsapp,
        resumen: objetivo ? `Formulario: ${objetivo}` : "Solicitó Llamada Consultiva en formulario"
      });

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
