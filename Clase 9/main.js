import { parse } from "./parser/parser.js";
import Environment from "./symbol/env.js";

let executeBtn = document.getElementById("executeBtn");

executeBtn.onclick = function() {
  const codigo = `
    struct persona{
      string:nombre;
      string:apellido;
      string:test
    };
`;

  const resultado = parse(codigo);
  const global = new Environment(null);
  console.log(resultado);
  for (let i = 0; i < resultado.length; i++) {
    if (typeof resultado[i] == "string") {
      continue;
    }
    resultado[i].execute(global);
  }
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
