import Expression from "../abstract/expression.js";

class Literal extends Expression {
  constructor(line, column, value, type) {
    super();
    this.line = line;
    this.column = column;
    this.value = value;
    this.type = type;
  }

  execute(env) {
    console.log("literal");
  }
}

export default Literal;
