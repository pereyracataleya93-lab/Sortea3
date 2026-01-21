const numerosDiv = document.getElementById("numeros");
const mensaje = document.getElementById("mensaje");
const pagoDiv = document.getElementById("pago");
let numeroSeleccionado = null;

// crear números 1 al 20
for (let i = 1; i <= 20; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.className = "disponible";

  btn.addEventListener("click", () => {
    if (btn.classList.contains("pagado")) return;

    document.querySelectorAll(".pendiente").forEach(b => {
      b.classList.remove("pendiente");
    });

    btn.classList.add("pendiente");
    numeroSeleccionado = i;
    mensaje.textContent = "Número " + i + " pendiente de pago";
    pagoDiv.style.display = "block";
  });

  numerosDiv.appendChild(btn);
}

document.getElementById("btnPago").addEventListener("click", () => {
  if (!numeroSeleccionado) return;

  const botones = document.querySelectorAll("#numeros button");
  botones[numeroSeleccionado - 1].classList.remove("pendiente");
  botones[numeroSeleccionado - 1].classList.add("pagado");

  mensaje.textContent = "Comprobante enviado. Número reservado.";
  pagoDiv.style.display = "none";
  numeroSeleccionado = null;
});
