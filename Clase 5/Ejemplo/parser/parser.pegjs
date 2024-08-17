S
  = expresion_numerica

expresion_numerica
  = primera:termino resto:(_ ("+" / "-" / "/" / "*" / "%") _ termino)* {
    return resto.reduce((izquierda, [_, operador, __, derecha]) => {
      const loc = location()?.start;
      return new Arithmetic(loc?.line, loc?.column, izquierda, derecha, operador);
    }, primera)
  }
  / terminal


termino = terminal

terminal = _ [0-9]+ {return parseInt(text(), 10)}


_ "Whitespace"
  = [ \t\n\r]*