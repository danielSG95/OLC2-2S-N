import { parse } from "./parser.js";

const input = document.getElementById("input");
const salida = document.getElementById("salida");

document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const texto = input.value;
    const resultado = parse(texto);
    console.log(resultado);
    salida.innerHTML = "Resultado: " + resultado;
  }
});
