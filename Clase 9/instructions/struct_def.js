
import Instruction from "../abstract/instruction.js";
import Symbol from "../symbol/symbol.js";
import Type from "../symbol/type.js";

class Struct_def extends Instruction {
  constructor(linea, columna, tipo, nombre, definicion) {
    super();
    this.linea = linea;
    this.columna = columna;
    this.tipo = tipo;
    this.nombre = nombre;
    this.props = props;
  }

  execute(env) {
    // Persona persona = Persona{
    //
    // };
    const prototype = env.getPrototype(tipo);

    /**
     * validar que sean la misma cantidad de props
     * Tengan los mismos nombres
     * y tengan los mismos tipos
     * */

    env.add_symbol(new Symbol(nombre, definicion, Type.STRUCT));
  }

}

export default Struct_def;
