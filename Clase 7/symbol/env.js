class Environment {
  #tabla_simbolos;
  #tabla_funciones;
  constructor(parent) {
    this.parent = parent;
    this.#tabla_simbolos = new Map();
    this.#tabla_funciones = new Map();
  }

  // podriamos quitar symbol 
  add_symbol(symbol) {
    if(this.#find_symbol(symbol.id) === null) {
      this.#tabla_simbolos.set(symbol.id, symbol);
    }
  }

  #find_symbol(id) {
    for(const iterator of this.#tabla_simbolos) {
      if(iterator[0] === id) {
        console.log(iterator[1]);
        return iterator[1];
      }
    }

    return null;
  }

  buscar_variable(id) {
    return this.#find_variable(id, this);
  }

  #find_variable(id, root) {
    if(root === null || root === undefined) {
      return null;
    }

    let current = root.#tabla_simbolos;
    for(const element of current) {
      if(element[0] === id) {
        return element[1];
      }
    }

    return this.#find_variable(id, root.parent);
  }

}

export default Environment;
