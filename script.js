// REFERENCIAS
const numerosDiv = document.getElementById("numeros");
const mensaje = document.getElementById("mensaje");
const pagoDiv = document.getElementById("pago");
const btnPago = document.getElementById("btnPago");
const vendidosTxt = document.getElementById("vendidos");
const progreso = document.getElementById("progreso");
const aliasSpan = document.getElementById("alias");

const btnAdmin = document.getElementById("btnAdmin");
const panelAdmin = document.getElementById("panelAdmin");
const listaRevision = document.getElementById("listaRevision");

aliasSpan.textContent = CONFIG.aliasPago;

let numeroSeleccionado = null;
let vendidos = 0;

// CREAR NÚMEROS
for (let i = 1; i <= CONFIG.totalNumeros; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.className = "disponible";

  btn.onclick = () => {
    if (btn.classList.contains("pagado") || btn.classList.contains("revision")) return;

    document.querySelectorAll(".pendiente").forEach(b => b.classList.remove("pendiente"));

    btn.classList.add("pendiente");
    numeroSeleccionado = i;
    mensaje.textContent = `Número ${i} pendiente de pago`;
    pagoDiv.style.display = "block";
  };

  numerosDiv.appendChild(btn);
}

// ENVIAR COMPROBANTE → WHATSAPP
btnPago.onclick = () => {
  if (!numeroSeleccionado) return;

  const boton = numerosDiv.children[numeroSeleccionado - 1];
  boton.classList.remove("pendiente");
  boton.classList.add("revision");

  const texto = `Hola! Envío comprobante del número ${numeroSeleccionado} (${CONFIG.nombreSorteo})`;
  location.href = `https://wa.me/${CONFIG.telefonoAdmin}?text=${encodeURIComponent(texto)}`;

  mensaje.textContent = "Número en revisión ⏳";
  pagoDiv.style.display = "none";
  numeroSeleccionado = null;
};

// ADMIN
btnAdmin.onclick = () => {
  const pin = prompt("Ingresá el PIN");
  if (pin !== CONFIG.adminPIN) {
    alert("PIN incorrecto");
    return;
  }
  panelAdmin.style.display = "block";
  cargarRevision();
};

function cerrarAdmin() {
  panelAdmin.style.display = "none";
}

function cargarRevision() {
  listaRevision.innerHTML = "";
  document.querySelectorAll(".revision").forEach(boton => {
    const div = document.createElement("div");
    const btn = document.createElement("button");
    btn.textContent = `Confirmar Nº ${boton.textContent}`;
    btn.onclick = () => confirmarPago(boton);
    div.appendChild(btn);
    listaRevision.appendChild(div);
  });
}

function confirmarPago(boton) {
  boton.classList.remove("revision");
  boton.classList.add("pagado");
  vendidos++;
  vendidosTxt.textContent = `Vendidos: ${vendidos} / ${CONFIG.totalNumeros}`;
  progreso.style.width = (vendidos / CONFIG.totalNumeros * 100) + "%";
  cargarRevision();
    }
