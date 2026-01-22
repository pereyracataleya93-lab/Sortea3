const numerosDiv = document.getElementById("numeros");
const mensaje = document.getElementById("mensaje");
const pagoDiv = document.getElementById("pago");
const btnPago = document.getElementById("btnPago");
const vendidosTxt = document.getElementById("vendidos");
const progreso = document.getElementById("progreso");

let numeroSeleccionado = null;
let vendidos = 0;

// crear números
for (let i = 1; i <= 20; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.className = "disponible";

  btn.addEventListener("click", () => {
    if (btn.classList.contains("pagado") || btn.classList.contains("revision")) return;

    document.querySelectorAll(".pendiente").forEach(b => b.classList.remove("pendiente"));

    btn.classList.add("pendiente");
    numeroSeleccionado = i;
    mensaje.textContent = `Número ${i} pendiente de pago`;
    pagoDiv.style.display = "block";
  });

  numerosDiv.appendChild(btn);
}

// enviar comprobante
btnPago.addEventListener("click", () => {
  if (!numeroSeleccionado) return;

  const botones = document.querySelectorAll("#numeros button");
  const boton = botones[numeroSeleccionado - 1];

  boton.classList.remove("pendiente");
  boton.classList.add("revision");

  // WhatsApp
  const telefono = CONFIG.telefonoAdmin;
  const texto = `Hola! Envío comprobante del número ${numeroSeleccionado} (${CONFIG.nombreSorteo})`;
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`, "_blank");

  mensaje.textContent = "Número en revisión ⏳";
  pagoDiv.style.display = "none";
  numeroSeleccionado = null;
});

// ---------------- ADMIN ----------------

const btnAdmin = document.getElementById("btnAdmin");
const panelAdmin = document.getElementById("panelAdmin");
const listaRevision = document.getElementById("listaRevision");
btnAdmin.addEventListener("click", () => {
  const pin = prompt("Ingresá el PIN de administrador");
  if (pin !== CONFIG.adminPIN) {
    alert("PIN incorrecto");
    return;
  }
  panelAdmin.style.display = "block";
  cargarRevision();
});

function cerrarAdmin() {
  panelAdmin.style.display = "none";
}

function cargarRevision() {
  listaRevision.innerHTML = "";

  document.querySelectorAll(".revision").forEach(boton => {
    const num = boton.textContent;

    const item = document.createElement("div");
    item.style.marginBottom = "10px";

    const btnConfirmar = document.createElement("button");
    btnConfirmar.textContent = `Confirmar pago Nº ${num}`;
    btnConfirmar.onclick = () => confirmarPago(boton);

    item.appendChild(btnConfirmar);
    listaRevision.appendChild(item);
  });
}

function confirmarPago(boton) {
  boton.classList.remove("revision");
  boton.classList.add("pagado");

  vendidos++;
  vendidosTxt.textContent = `Vendidos: ${vendidos} / 20`;
  progreso.style.width = (vendidos / 20 * 100) + "%";

  cargarRevision();
}
