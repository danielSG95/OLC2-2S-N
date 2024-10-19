import Instruction from "../abstract/instruction.js";
import Symbol from "../symbol/symbol.js";
import Type from "../symbol/type.js";

class Declaracion extends Instruction {
  constructor(line, column, nombre, tipo, expresion) {
    super();
    this.nombre = nombre;
    this.tipo = tipo;
    this.expresion = expresion;
    this.line = line;
    this.column = column;
  }

  execute(env, gen) {
    gen.comment(`Declarando variable: ${this.nombre}`);
    if (this.tipo === Type.INT) {
      gen.addData(`\t${this.nombre}: .word 0\n`);
    } else if (this.tipo === Type.STRING) {
      gen.addData(`\t${this.nombre}: .asciiz ""\n`);
    }

    gen.comment(
      "Cargando la direccion de memoria de la variable: " + this.nombre
    );
    gen.addLa("t3", this.nombre);

    const result = this.expresion.execute(env, gen);

    if (!result) {
      // reportan el error
    }

    gen.addSw(result.value, "0(t3)");

    env.add_symbol(new Symbol(this.nombre, result, result.type));
  }
}

export default Declaracion;
