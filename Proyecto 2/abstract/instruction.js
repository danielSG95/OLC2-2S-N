class Instruction {
  execute(env, gen) {
    throw new Error("Subclasses must implement execute() method");
  }
}

export default Instruction;
