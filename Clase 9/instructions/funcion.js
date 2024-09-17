import Instruction from "../abstract/instruction.js";



class Funcion extends Instruction {
  constructor(linea, columna, tipo, lparams, nombre, linst) {
    this.linea = linea
    this.columna = columna;
    this.nombre = nombre;
    this.linst = linst;
    this.tipo = tipo;
    this.lparams = lparams;
  }

  execute(env) {
    console.log(`Se define la funcion : ${this.nombre}`);
  }

}

export default Funcion;
