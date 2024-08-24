import Instruction from "../abstract/instruction.js";

class Declaracion extends Instruction {
  constructor(line, column, nombre, tipo, expresion) {
    super();
    this.nombre = nombre;
    this.tipo = tipo;
    this.expresion = expresion;
    this.line = line;
    this.column = column;
  }

  execute(env) {
    console.log("Declaracion de variable");
    const result = this.expresion.execute(env);
    // { name: ..., tipo:...}
    if (!result) {
      // reportan el error
    }

    env.guardarVariable(result);
  }
}

export default Declaracion;
