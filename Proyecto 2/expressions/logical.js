import Expression from "../abstract/expression.js";

class Logica extends Expression {
  constructor(line, column, left, right, op) {
    super();
    this.line = line;
    this.column = column;
    this.left = left;
    this.right = right;
    this.op = op;
  }

  execute(env) {
    // Implement the execution logic for the LOGICA expression
    // Example:
    // return this.left.execute(env) && this.right.execute(env);
    console.log("Expresion logica");
  }
}

export default Logica;
