import Instruction from "../abstract/instruction.js";
import Type from "../symbol/type.js";

class Print extends Instruction {
  constructor(line, column, expresion) {
    super();
    this.line = line;
    this.column = column;
    this.expresion = expresion;
  }

  execute(env, gen) {
    gen.comment("Imprimiendo valor en pantalla:");
    const value = this.expresion.execute(env, gen);
    console.log(value);
    if (value.type === Type.INT || value.type === Type.BOOLEAN) {
      gen.addMove("a0", value.value);
      gen.addLi("a7", "1");
      gen.addSystemCall();
      gen.addLi("a0", "10");
      gen.addLi("a7", "11");
      gen.addSystemCall();
    } else if (value.type === Type.STRING) {
    }
  }
}

export default Print;
