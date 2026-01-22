// referencias
let vendidos = 0;
document.getElementById("progreso").style.width = (vendidos / 20 * 100) + "%";
const numerosDiv = document.getElementById("numeros");
const mensaje = document.getElementById("mensaje");
const pagoDiv = document.getElementById("pago");
const btnPago = document.getElementById("btnPago");

let numeroSeleccionado = null;

// crear números del 1 al 20
for (let i = 1; i <= 20; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.className = "disponible";

  btn.addEventListener("click", () => {
    // si ya está pagado, no se puede tocar
    if (btn.classList.contains("pagado")) return;

    // quitar pendiente a otros
    document.querySelectorAll(".pendiente").forEach(b => {
      b.classList.remove("pendiente");
    });

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

  // pasar a revisión (NO pagado)
  boton.classList.remove("pendiente");
  boton.classList.add("revision");
  vendidos++;
document.getElementById("vendidos").textContent = `Vendidos: ${vendidos} / 20`;

  // WhatsApp del organizador (configurable)
  const telefonoAdmin = CONFIG.telefonoAdmin;

  const mensajeWA = `Hola! Envío comprobante del número ${numeroSeleccionado} del sorteo ${CONFIG.nombreSorteo}`;
  const urlWA = `https://wa.me/${telefonoAdmin}?text=${encodeURIComponent(mensajeWA)}`;

  window.open(urlWA, "_blank");

  mensaje.textContent = "Comprobante enviado. Número en revisión ⏳";
  pagoDiv.style.display = "none";
  numeroSeleccionado = null;
});
