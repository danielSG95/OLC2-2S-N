class Environment {
  constructor(parent) {
    this.parent = parent;
    this.variables = {};
    this.funciones = {};
  }
}

export default Environment;
