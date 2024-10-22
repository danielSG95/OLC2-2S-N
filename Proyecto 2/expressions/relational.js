import Expression from "../abstract/expression.js";
import Type from "../symbol/type.js";
import Value from "../symbol/Value.js";

class Relational extends Expression {
  constructor(line, column, left, right, op) {
    super();
    this.left = left;
    this.right = right;
    this.op = op;
    this.line = line;
    this.column = column;
  }

  execute(env, gen) {
    // Implement the execution logic for the RELATIONAL expression
    gen.comment("Iniciando operacion relacional");
    let result_izdo = this.left.execute(env, gen);

    if (this.left instanceof Relational === false) {
      // sigue la misma logica que el relacional
      gen.comment("Moviendo el valor cargado al registro t1");
      gen.addMove("t1", "t0");
    }

    let result_derecho = this.right.execute(env, gen);
    gen.comment("Moviendo el valor cargado al registro t2");
    gen.addMove("t2", "t0");

    gen.addBr();

    let trueLvl = "";
    let falseLvl = "";
    let result = undefined;
    switch (this.op) {
      case 0:
        gen.comment(`${result_izdo} < ${result_derecho}`);
        gen.addSlt("t0", "t1", "t2");
        result = new Value("t0", false, Type.BOOLEAN, [], [], []);
        return result;
      case 1:
        gen.comment(`${result_izdo} <= ${result_derecho}`);
        gen.addSlt("t0", "t1", "t2");
        gen.addMove("t3", "t0");
        gen.addOperation("sub", "t4", "t1", "t2");
        gen.addSeqz("t4", "t4");
        gen.addOperation("or", "t0", "t3", "t4");
        result = new Value("t0", false, Type.BOOLEAN, [], [], []);
        return result;
        break;
      case 2:
        gen.comment(`${result_izdo} > ${result_derecho}`);
        // se invierte el sentido de la comparacion.
        gen.addSlt("t0", "t2", "t1");
        result = new Value("t0", false, Type.BOOLEAN, [], [], []);
        return result;
      case 3:
        gen.comment(`${result_izdo} >= ${result_derecho}`);
        break;
      case 4:
        gen.comment(`${result_izdo} == ${result_derecho}`);
        break;
      case 5:
        gen.comment(`${result_izdo} != ${result_derecho}`);
        break;
      default:
        break;
    }
  }
}

export default Relational;
