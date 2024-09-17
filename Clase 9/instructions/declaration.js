import Instruction from "../abstract/instruction.js";
import Symbol from "../symbol/symbol.js";

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

    if (!result) {
      // reportan el error
    }

    env.add_symbol(new Symbol( this.nombre, result, result.type));
  }
}

export default Declaracion;
