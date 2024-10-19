import Instruction from "../abstract/instruction.js";
import Environment from "../symbol/env.js";

class If extends Instruction {
  constructor(linea, columna, expresion, bloqueSi, bloqueNo, rif) {
    this.linea = linea;
    this.columna = columna;
    this.expresion = expresion;
    this.bloqueSi = bloqueSi;
    this.bloqueNo = bloqueNo;
    this.rif = rif;
  }

  execute(env, gen) {
    gen.comment("Generando If");

    const resultado = this.expresion.execute(env); // Value

    let newLabel = gen.newLabel();
    resultado.truelvl.forEach((element) => gen.addBodyLabel(element));

    let new_env = new Environment(env);
    // recorrer los bloques SI.
    for (let i = 0; i < this.bloqueSi.length; i++) {
      this.bloqueSi[i].execute(new_env);
    }

    // crear los bodys para el false.
    // recorrer los bloques NO.
  }
}

export default If;
