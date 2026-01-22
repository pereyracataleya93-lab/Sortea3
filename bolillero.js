const btnBolilla = document.getElementById("btnBolilla");
const bolillaActual = document.getElementById("bolillaActual");
const contador = document.getElementById("contador");
const ganador = document.getElementById("ganador");

let conteo = {};
let finalizado = false;

btnBolilla.addEventListener("click", () => {
  if (finalizado) return;

  const numero = Math.floor(Math.random() * 20) + 1;

  bolillaActual.textContent = `🎱 Salió el número ${numero}`;

  conteo[numero] = (conteo[numero] || 0) + 1;

  contador.textContent = `El ${numero} salió ${conteo[numero]} veces`;

  if (conteo[numero] === 3) {
    ganador.textContent = `🎉 GANADOR: número ${numero}`;
    finalizado = true;
  }
});
