import Expression from "../abstract/expression.js";
import Type from "../symbol/type.js";

class Arithmetic extends Expression {
  constructor(line, column, left, right, op) {
    super();
    this.left = left;
    this.right = right;
    this.op = op;
    this.line = line;
    this.column = column;
  }

  execute(env) {
    const resultado_izdo = this.left.execute(env);
    const resultado_derecho = this.right.execute(env);
    console.log("Expresion Aritmetica");

    // int a = 2+2;
    switch (this.op) {
      case this.op === 0:
        return new Literal(this.line, this.column, resultado_izdo.value + resultado_derecho.value, Type.INT);
      case this.op === 1:
        return new Literal(this.line, this.column, resultado_izdo.value - resultado_derecho.value, Type.INT);
      case this.op === 2:
        return new Literal(this.line, this.column, resultado_izdo.value / resultado_derecho.value, Type.INT);
    }
  }
}

export default Arithmetic;
