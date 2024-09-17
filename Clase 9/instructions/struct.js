import Instruction from "../abstract/instruction.js";
import Symbol from "../symbol/symbol.js";
import Type from "../symbol/type.js";

class Struct extends Instruction {
  constructor(linea, columna, nombre, props) {
    super();
    this.linea = linea;
    this.columna = columna;
    this.nombre = nombre;
    this.props = props;
  }

  execute(env) {
    console.log('Definicion de Struct');
    const symbol = new Symbol(this.nombre, this.props, Type.STRUCT);
    env.add_prototype(symbol);

    env.list_prototypes();
  }

}

export default Struct;
