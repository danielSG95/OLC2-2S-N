import Instruction from "../abstract/instruction.js"
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

  execute(env) {
    console.log('Declaracion de If');

    const resultado = this.expresion.execute(env);

    console.log(resultado);

    if (resultado.value === true) {
      const inner_env = new Environment(env);
      for (let i = 0; i < this.bloqueSi.length(); i++) {
        this.bloqueSi[i].execute(inner_env);
      }
    } else {
      // si la condicion no se cumple. 

      if (this.rif !== undefined || this.rif !== null) {
        this.rif.execute(env);
      }

      if (this.bloqueNo !== undefined || this.bloqueNo !== null) {
        const inner_env = new Environment(env);
        for (let i = 0; i < this.bloqueNo.length(); i++) {
          this.bloqueNo[i].execute(inner_env);
        }
      }

    }
  }
}

export default If;
