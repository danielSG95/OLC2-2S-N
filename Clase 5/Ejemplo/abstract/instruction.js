class Instruction {
  execute(env) {
    throw new Error("Subclasses must implement execute() method");
  }
}

export default Instruction;
