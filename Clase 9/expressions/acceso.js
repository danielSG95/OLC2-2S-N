import Expression from "../abstract/expression.js"


class Acceso extends Expression {
  constructor(line, column, nombre, acceso){
    super();
    this.line = line;
    this.column = column;
    // persona.nombre;
    this.nombre = nombre;
    this.acceso = acceso;
  }

  execute(env) {
    const resultado = env.find_variable();

    // persona.edad -> int
    // persona.nombre -> string
    // Literal(line, col, edad, resultado.value)

  }

}
