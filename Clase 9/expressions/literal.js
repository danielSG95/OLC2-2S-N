import Expression from "../abstract/expression.js";
import Type from "../symbol/type.js";

class Literal extends Expression {
  constructor(line, column, value, type) {
    super();
    this.line = line;
    this.column = column;
    this.value = value;
    this.type = type;
  }

  execute(env) {
    let temp = new Literal(this.line, this.column, this.value, this.type);
    switch(this.type) {
      case Type.STRING:
        temp.value = temp.value.toString();
        break;
      case Type.INT:
        temp.value = parseInt(temp.value, 10);
        break;
      case Type.BOOLEAN:
        temp.value = (temp.value === "true" ? true: false);
        break;
      case Type.IDENTIFIER:
        // tiene que ir a buscar a la TS
        let symbol = env.buscar_variable(this.value);
        if(symbol === null) {
          // agregar a la lista de errores
          console.log('error semantico. la varialbe no existe');
          return;
        }
        temp.value = symbol.value;
        // temp.type = symbol.type;
        break;
      case Type.STRUCT:
        // validar todo aqui
        break;
    }
    return temp;
  }
}

export default Literal;
