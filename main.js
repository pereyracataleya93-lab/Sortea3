// ================= CONFIG =================
const total = CONFIG.totalNumeros;

// ================= ELEMENTOS =================
const numerosDiv = document.getElementById("numeros");
const mensaje = document.getElementById("mensaje");
const pagoDiv = document.getElementById("pago");
const btnPago = document.getElementById("btnPago");
const vendidosTxt = document.getElementById("vendidos");
const progreso = document.getElementById("progreso");

const btnAdmin = document.getElementById("btnAdmin");
const panelAdmin = document.getElementById("panelAdmin");
const listaRevision = document.getElementById("listaRevision");

const sorteoDiv = document.getElementById("sorteo");
const btnSortear = document.getElementById("btnSortear");
const bolaGanadora = document.getElementById("bolaGanadora");

// ================= ESTADO =================
let numeroSeleccionado = null;
let vendidos = 0;
let yaSorteado = false;

// ================= INICIAL =================
vendidosTxt.textContent = `Vendidos: 0 / ${total}`;
progreso.style.width = "0%";

// ================= CREAR NÚMEROS =================
for (let i = 1; i <= total; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.className = "disponible";

  btn.addEventListener("click", () => {
    if (
      btn.classList.contains("pagado") ||
      btn.classList.contains("revision")
    ) return;

    document
      .querySelectorAll(".pendiente")
      .forEach(b => b.classList.remove("pendiente"));

    btn.classList.add("pendiente");
    numeroSeleccionado = i;
    mensaje.textContent = `Número ${i} pendiente de pago`;
    pagoDiv.style.display = "block";
  });

  numerosDiv.appendChild(btn);
}

// ================= ENVIAR COMPROBANTE =================
btnPago.addEventListener("click", () => {
  if (!numeroSeleccionado) return;

  const boton = numerosDiv.children[numeroSeleccionado - 1];

  boton.classList.remove("pendiente");
  boton.classList.add("revision");

  const texto = `Hola! Envío comprobante del número ${numeroSeleccionado} (${CONFIG.nombreSorteo})`;
  window.open(
    `https://wa.me/${CONFIG.telefonoAdmin}?text=${encodeURIComponent(texto)}`,
    "_blank"
  );

  mensaje.textContent = "Número en revisión ⏳";
  pagoDiv.style.display = "none";
  numeroSeleccionado = null;
});

// ================= ADMIN =================
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

// ================= REVISIÓN =================
function cargarRevision() {
  listaRevision.innerHTML = "";

  document.querySelectorAll(".revision").forEach(boton => {
    const item = document.createElement("div");
    item.style.marginBottom = "10px";

    const btn = document.createElement("button");
    btn.textContent = `Confirmar pago Nº ${boton.textContent}`;
    btn.onclick = () => confirmarPago(boton);

    item.appendChild(btn);
    listaRevision.appendChild(item);
  });
}

// ================= CONFIRMAR PAGO =================
function confirmarPago(boton) {
  boton.classList.remove("revision");
  boton.classList.remove("pendiente");
  boton.classList.add("pagado");

  if (!boton.dataset.vendido) {
    vendidos++;
    boton.dataset.vendido = "true";
  }

  vendidosTxt.textContent = `Vendidos: ${vendidos} / ${total}`;
  progreso.style.width = (vendidos / total) * 100 + "%";

  mensaje.textContent = "";

  cargarRevision();

  if (vendidos === total) {
    sorteoDiv.style.display = "block";
  }
}

// ================= SORTEO =================
btnSortear.addEventListener("click", () => {
  if (yaSorteado) return;
  yaSorteado = true;

  let vueltas = 0;
  const anim = setInterval(() => {
    bolaGanadora.textContent =
      Math.floor(Math.random() * total) + 1;
    vueltas++;
  }, 100);

  setTimeout(() => {
    clearInterval(anim);
    const ganador =
      Math.floor(Math.random() * total) + 1;
    bolaGanadora.textContent = ganador;
    alert("🎉 Número ganador: " + ganador);
  }, 3000);
});
const btnSortear = document.getElementById("btnSortear");
const bolillero = document.getElementById("bolillero");
const bolaGanadora = document.getElementById("bolaGanadora");

let yaSorteado = false;

btnSortear.addEventListener("click", () => {
  if (yaSorteado) return;

  // opcional: validar vendidos
  if (vendidos < CONFIG.totalNumeros) {
    alert("Todavía no están vendidos todos los números");
    return;
  }

  bolillero.style.display = "flex";
  yaSorteado = true;

  let vueltas = 0;
  const anim = setInterval(() => {
    bolaGanadora.textContent =
      Math.floor(Math.random() * CONFIG.totalNumeros) + 1;
    vueltas++;
  }, 100);

  setTimeout(() => {
    clearInterval(anim);
    const ganador =
      Math.floor(Math.random() * CONFIG.totalNumeros) + 1;
    bolaGanadora.textContent = ganador;
    alert("🎉 Número ganador: " + ganador);
  }, 3000);
});
document.addEventListener("DOMContentLoaded", () => {
  const btnSortear = document.getElementById("btnSortear");
  const bolillero = document.getElementById("bolillero");
  const bolaGanadora = document.getElementById("bolaGanadora");

  if (!btnSortear) {
    console.error("❌ No existe btnSortear");
    return;
  }

  btnSortear.addEventListener("click", () => {
    bolillero.style.display = "block";

    let vueltas = 0;
    const anim = setInterval(() => {
      bolaGanadora.textContent =
        Math.floor(Math.random() * CONFIG.totalNumeros) + 1;
      vueltas++;
    }, 100);

    setTimeout(() => {
      clearInterval(anim);
      const ganador =
        Math.floor(Math.random() * CONFIG.totalNumeros) + 1;
      bolaGanadora.textContent = ganador;
      alert("🎉 Ganador: " + ganador);
    }, 3000);
  });
});
