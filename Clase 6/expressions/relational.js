import Expression from "../abstract/expression.js";

class Relational extends Expression {
  constructor(line, column, left, right, op) {
    super();
    this.left = left;
    this.right = right;
    this.op = op;
    this.line = line;
    this.column = column;
  }

  execute(env) {
    // Implement the execution logic for the RELATIONAL expression
    console.log("Executing RELATIONAL expression...");
  }
}

export default Relational;
