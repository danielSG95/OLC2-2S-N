/*
@abstract
*/
class Expression {
  /**
   * @param env clase Environment
   * @param gen clase Generator
   */
  execute(env, gen) {
    throw new Error("Subclasses must implement execute() method");
  }
}

export default Expression;
