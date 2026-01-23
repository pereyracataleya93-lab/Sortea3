const numerosDiv = document.getElementById("numeros");
const mensaje = document.getElementById("mensaje");
const pagoDiv = document.getElementById("pago");
const btnPago = document.getElementById("btnPago");
const vendidosTxt = document.getElementById("vendidos");
const progreso = document.getElementById("progreso");

const btnAdmin = document.getElementById("btnAdmin");
const panelAdmin = document.getElementById("panelAdmin");
const listaRevision = document.getElementById("listaRevision");

let numeroSeleccionado = null;
let vendidos = 0;

vendidosTxt.textContent = `Vendidos: 0 / ${CONFIG.totalNumeros}`;
document.getElementById("alias").textContent = CONFIG.aliasPago;

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

btnPago.onclick = () => {
  if (!numeroSeleccionado) return;

  const btn = numerosDiv.children[numeroSeleccionado - 1];
  btn.className = "revision";

  const texto = `Hola! Envío comprobante del número ${numeroSeleccionado} (${CONFIG.nombreSorteo})`;
  window.open(`https://wa.me/${CONFIG.telefonoAdmin}?text=${encodeURIComponent(texto)}`, "_blank");

  pagoDiv.style.display = "none";
  mensaje.textContent = "Número en revisión ⏳";
  numeroSeleccionado = null;

  cargarRevision();
};

btnAdmin.onclick = () => {
  const pin = prompt("PIN admin:");
  if (pin !== CONFIG.adminPIN) return alert("PIN incorrecto");
  panelAdmin.style.display = "block";
  cargarRevision();
};

function cerrarAdmin() {
  panelAdmin.style.display = "none";
}

function cargarRevision() {
  listaRevision.innerHTML = "";
  document.querySelectorAll(".revision").forEach(btn => {
    const b = document.createElement("button");
    b.textContent = `Confirmar Nº ${btn.textContent}`;
    b.onclick = () => {
      btn.className = "pagado";
      vendidos++;
      vendidosTxt.textContent = `Vendidos: ${vendidos} / ${CONFIG.totalNumeros}`;
      progreso.style.width = (vendidos / CONFIG.totalNumeros * 100) + "%";
      cargarRevision();
    };
    listaRevision.appendChild(b);
  });
                                                    }
