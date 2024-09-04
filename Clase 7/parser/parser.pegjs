{
  const ARITHMETIC_OP = {
    MAS: 0,
    MENOS: 1,
    MULTIPLICAR: 2,
    DIVIDIR: 3,
    MODULO: 4,
  };

  const RELATIONAL_OP = {
    MENOR_QUE: 0,
    MENOR_IGUAL: 1,
    MAYOR_QUE: 2,
    MAYOR_IGUAL: 3,
    IGUAL: 4,
    NO_IGUAL: 5,
  };

  const LOGICAL_OP = {
    AND: 0,
    OR: 1,
    NOT: 2
  };
}


S
  = instrucciones

instrucciones
  = inst:instruccion list:instruccionesp

instruccionesp
  = list:instrucciones
  / epsilon

instruccion
  = inst:declaracion
  / inst:asignacion
  / inst:funcion


// declaracion -> tipo id = expresion;
declaracion
  = type:tipo id:ID "=" expr:expresion ";" {
    const loc = location()?.start;
    return new Declaracion(loc?.line, loc?.column, id, type, expr);
  }

asignacion
  = id:ID "=" expr:expresion

funcion
  = type:tipo id:ID params:f_params "{" _ inst:instruccionesf _ "}"


f_params
  = "(" l_params ")"

l_params
  = p:param list:l_paramsp  

l_paramsp
  = "," list:l_params
  / epsilon

param
  = type:tipo id:ID   


instruccionesf 
  = inst:instruccionf list:instruccionesfp

instruccionesfp
  = instruccionesf instruccionesfp
  / epsilon

instruccionf
  = declaracion
  / asignacion
  / inst_if


inst_if
  = "if" "(" expr:expresion ")" "{" inst:instruccionesf "}" r_if

r_if
  = b_else
  / epsilon

b_else
  = "else" else_if

else_if
  = "{" inst:instruccionesf "}" 
  / inst_if 

expresion
  = expresion_logica

expresion_logica
  = e:expresion_relacional op:(_("&&"/"||")_) {
    return op.reduce(function(result, element){
      const loc = location()?.start;
      if(element[1] === "&&") return Logical(loc?.line, loc?.column, result, element[3], BOOLEANOP.AND);
      else if(element[1] === "||") return Logical(loc?.line, loc?.column, result, element[3], BOOLEANOP.OR);
    }, e)
  }
  / e:expresion_relacional

expresion_relacional
  = e:expresion_numerica op:(_(">"/"<")_) {
    return op.reduce(function(result, element){
      const loc = location()?.start;
      if(element[1] === ">") return new Relational(loc?.line,loc?.column, result, element[3], RELATIONALOP.MAYOR_QUE);
      else if(element[1] === "<") return new Relational(loc?.line,loc?.column, result, element[3], RELATIONALOP.MENOR_QUE);
    }, e)
  }
  / e:expresion_numerica

expresion_numerica
  = head:Term tail:(_("+"/"-")_ Term)* {
    return tail.reduce(function(result, element) {
      const loc = location()?.start;
        if (element[1] === "+") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MAS);  }
        if (element[1] === "-") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MENOS); }
    }, head);
  }

Term
  = head:Factor tail:(_("*"/"/")_ Factor)*
  {
    return tail.reduce(function(result, element) {
        const loc = location()?.start;
        if (element[1] === "*") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.MULTIPLICAR); }
        if (element[1] === "/") { return new Arithmetic(loc?.line,loc?.column, result, element[3], ARITHMETIC_OP.DIVIDIR); }
      }, head);
  }
// boolean resultado = 2 + 3 > 4 && (1+1 < 3 || 2 + 2 > 1);

Factor
  = "(" _ expr:expresion_numerica ")" { return expr;}
  / "-" expr:expresion_numerica {
    const loc = location()?.start;
    return new Arithmetic(loc?.line, loc?.column, new Literal(loc?.line, loc?.column, -1, Type.INT), expr, ARITHMETIC_OP.MENOS);
  }
  / terminal


terminal
  = valor:INTEGER {
    const loc = location()?.start;
    return new Literal(loc?.line, loc?.column, valor, Type.INT);
  }
  / valor:ID {
    const loc = location()?.start;
    return new Literal(loc?.line, loc?.column, valor, Type.IDENTIFICADOR);
  }
  / valor:FLOAT {
    const loc = location()?.start;
    return new Literal(loc?.line, loc?.column, valor, Type.FLOAT);
  }
  / valor:STRING {
    const loc = location()?.start;
    return new Literal(loc?.line, loc?.column, valor, Type.STRING);
  }

tipo
  = type:(_("int"/"float"/"string"/id:ID/"boolean"/"char")_){
    if(type[1] === "int") return Type.INT;
    else if(type[1] === "float") return Type.FLOAT;
    else  if(type[1] === "string") return Type.STRING;
    else if(type[1] === "boolean") return Type.BOOLEAN;
    else if(type[1] === "char") return Type.CHAR;
    else if(type[1] === "void") return Type.VOID;
  }


// expresiones regulares literal,terminal,primitivo
STRING "string"
  = "\"" chars:[^\"]* "\"" _ 
  {
    return text();
  }

ID "identificador"
  = [a-zA-Z]([a-zA-Z]/[0-9]/"_")* _ { return text(); }

INTEGER "integer"
  = _ [0-9]+ { return parseInt(text(), 10);}


FLOAT "float"
  = INTEGER "." INTEGER { return parseFloat(text());}

SimpleComment
  = "//" (!EndComment .)* EndComment

EndComment
  = "\r" / "\n" / "\r\n"


_ "Whitespace"
  = [ \t\n\r]*

epsilon = ''
