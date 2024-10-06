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
    const resultado_izdo = this.left.execute(env, gen);
    const resultado_derecho = this.right.execute(env, gen);

    gen.addBr();
    gen.comment(`Realizando operacion: ${this.op}`);

    if (resultado_izdo.value.includes("t")) {
      gen.addMove("t3", resultado_izdo.value);
    }

    gen.addLw("t1", "0(t3)");

    if (resultado_derecho.value.includes("t")) {
      gen.addMove("t3", resultado_derecho.value);
    }

    gen.addLw("t2", "0(t3)");

    let temp = gen.newTemp();

    if (this.op === 0) {
      gen.addOperation("add", "t0", "t1", "t2");
      gen.addLi("t3", temp.toString());
      gen.addSw("t0", "0(t3)");

      return Value(temp.toString(), true, Type.INTEGER, [], [], []);
    } else if (this.op === 1) {
      return new Literal(
        this.line,
        this.column,
        resultado_izdo.value - resultado_derecho.value,
        Type.INT
      );
    } else if (this.op === 2) {
      return new Literal(
        this.line,
        this.column,
        resultado_izdo.value * resultado_derecho.value,
        Type.INT
      );
    } else if (this.op === 3) {
      return new Literal(
        this.line,
        this.column,
        resultado_izdo.value / resultado_derecho.value,
        Type.INT
      );
    }
  }
}

export default Arithmetic;
