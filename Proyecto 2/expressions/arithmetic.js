import Expression from "../abstract/expression.js";
import Type from "../symbol/type.js";
import Literal from "../expressions/literal.js";
import Value from "../symbol/Value.js";

class Arithmetic extends Expression {
  constructor(line, column, left, right, op) {
    super();
    this.left = left;
    this.right = right;
    this.op = op;
    this.line = line;
    this.column = column;
  }

  execute(env, gen) {
    // manejarlo a nivel de stack.
    const resultado_izdo = this.left.execute(env, gen);
    if (this.left instanceof Arithmetic === false) {
      gen.comment("Moviendo el valor cargado al registo temporal t1");
      gen.addMove("t1", "t0");
    }

    const resultado_derecho = this.right.execute(env, gen);
    gen.comment("Moviendo el valor cargado al registo temporal t2");
    gen.addMove("t2", "t0");

    gen.addBr();
    gen.comment(`Realizando operacion: ${this.op}`);

    if (this.op === 0) {
      gen.addOperation("add", "t1", "t1", "t2");

      return new Value("t1", true, Type.INTEGER, [], [], []);
    } else if (this.op === 1) {
      gen.addOperation("sub", "t1", "t1", "t2");
      return new Value("t1", true, Type.INTEGER, [], [], []);
    } else if (this.op === 2) {
      gen.addOperation("mul", "t1", "t1", "t2");
      return new Value("t1", true, Type.INTEGER, [], [], []);
    } else if (this.op === 3) {
      if (resultado_derecho.value === 0) {
        throw new Error("Division por cero");
      }

      gen.addOperation("div", "t1", "t1", "t2");
      return new Value("t1", true, Type.INTEGER, [], [], []);
    }
  }
}

export default Arithmetic;
