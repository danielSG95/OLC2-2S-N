import { parse } from "./parser/parser.js";
import Environment from "./symbol/env.js";
import Generator from "./symbol/Generator.js";

let executeBtn = document.getElementById("executeBtn");

executeBtn.onclick = function () {
  const codigo = `int suma= 2 + 2 * 3;
  boolean result = 4>3;
  println(12);
  println(result);`;

  const resultado = parse(codigo);
  const global = new Environment(null);

  const gen = new Generator();

  try {
    for (let i = 0; i < resultado.length; i++) {
      if (typeof resultado[i] == "string") {
        continue;
      }
      resultado[i].execute(global, gen);
    }

    console.log(gen.getFinalCode()); // escribirlo en un archivo .s | imprimir en la consola.
  } catch (error) {
    console.error(error);
    return;
  } finally {
    // generar de erores y de TS.
  }
};
