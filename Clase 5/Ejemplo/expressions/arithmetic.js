import Expression from "../abstract/expression.js";

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
    console.log("Expresion Aritmetica");
  }
}

export default Arithmetic;
