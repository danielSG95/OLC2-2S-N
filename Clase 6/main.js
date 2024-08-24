import { parse } from "./parser/parser.js";
import Environment from "./symbol/env.js";

let executeBtn = document.getElementById("executeBtn");

executeBtn.onclick = function () {
  const codigo = `int suma=2+2;`;

  const resultado = parse(codigo);
  const global = new Environment(null);
  resultado.forEach((element) => {
    element.execute(global);
  });
};

// document.getElementById("input").addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     const texto = input.value;
//     const resultado = parse(texto);
//     const global = new Environment(null);
//     for (let i = 0; i < resultado.length; i++) {
//       resultado[i].execute(global);
//     }
//     console.log(resultado);
//     resultado.execute();
//     salida.innerHTML = "Resultado: " + resultado;
//   }
// });
