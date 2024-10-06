class Environment {
  #tabla_simbolos;
  #tabla_funciones;
  #prototipos; // guardado el esquema general.
  constructor(parent) {
    this.parent = parent;
    this.#tabla_simbolos = new Map();
    this.#tabla_funciones = new Map();
    this.#prototipos = new Map();
  }

  // podriamos quitar symbol 
  add_symbol(symbol) {
    if(this.#find_symbol(symbol.id, this.#tabla_simbolos) === null) {
      this.#tabla_simbolos.set(symbol.id, symbol);
      return true;
    }
    return false;
  }

  add_prototype(symbol) {
    if(this.#find_symbol(symbol.id, this.#prototipos) === null) {
      this.#prototipos.set(symbol.id, symbol);
      return true;
    }
    return false;
  }

  list_prototypes() {
    console.log(this.#prototipos);
  }

  #find_symbol(id, ts) {
    for(const iterator of ts) {
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
