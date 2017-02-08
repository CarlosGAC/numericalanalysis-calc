"use strict";

var entry = $("#entrypoint");
var operation = $("#operation");

//Contador de puntos decimales
var contpoint = 0;

//Variables donde se guardan los operandos
var firstoperand = 0;
var secondoperand = 0;

//Variable donde se guarda el operador
var operator = "";

//Declaracion de la constante pi
var pi = 3.141592653;

//Boton clear
$("#c").click(function () {
  //Limpieza de la calculadora
  entry.val("");
  operation.val("");
  contpoint = 0;
  //Limpieza de la tabla
  $('.table').empty();
  //Animacion
  $(this).addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass("animated pulse");
  });
});

//Funcion para los botones numericos y de punto decimal
function buttons(idbutton) {
  var value = idbutton.val();
  $(idbutton).click(function () {
    console.log("Puntos: " + contpoint);
    if (entry == null) {
      entry.val(value);
    } else if (entry.val().length >= 12) {
      console.log("Esta full");
    } else if (value == "." && contpoint == 0) {
      contpoint++;
      entry.val(entry.val() + value);
    } else if (value == "." && contpoint > 0) {
      console.log("Hay mas de un punto");
    } else {
      entry.val(entry.val() + value);
    }
    $(this).addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass("animated pulse");
    });
  });
}

//Funcion para la operacion de los botones de operador
function operations(idbutton) {
  $(idbutton).click(function () {
    contpoint = 0;

    if ($(this).attr('id') == 'minus') {
      //Manejo del boton menos para diferenciar entre negativo y menos
      if (entry.val() == "") {
        entry.val("-");
      } else {
        firstoperand = entry.val();
        entry.val("");
        operation.val(firstoperand + idbutton.val());
        operator = idbutton.val();
      }
    } else {
      //Operacion del resto de botones
      firstoperand = entry.val();
      entry.val("");
      operation.val(firstoperand + idbutton.val());
      operator = idbutton.val();
    }
    //Animacion
    $(this).addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass("animated pulse");
    });
  });
}

//Funcion especial de click para el boton de igual
$('#equals').click(function () {

  secondoperand = entry.val();
  if (operator == "+") {
    entry.val(add(firstoperand, secondoperand));
  } else if (operator == "-") {
    //Comportamiento especial para el boton de menos
    if (operation.val() != null) {
      entry.val(substract(firstoperand, secondoperand));
    }
  } else if (operator == "x") {
    entry.val(multiply(firstoperand, secondoperand));
  } else if (operator == "/") {
    entry.val(divide(firstoperand, secondoperand));
  } else if (operator == "sqrt") {
    entry.val(sqrt_bab(firstoperand, secondoperand));
  } else if (operator == "e^x") {
    entry.val(pow(firstoperand, secondoperand));
  } else if (operator == "sin") {
    entry.val(sine(firstoperand, secondoperand, 1).toFixed(secondoperand));
  } else if (operator == "cos") {
    entry.val(cosine(firstoperand, secondoperand, 1).toFixed(secondoperand));
  } else if (operator == "tan") {
    entry.val(tangent(firstoperand, secondoperand, 1).toFixed(secondoperand));
  } else {
    entry.val(firstoperand);
  }
  //Animacion
  $(this).addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass("animated pulse");
  });

  //Si hay un error aritmetico, marcar en la pantalla de la calculadora
  if (isNaN(entry.val()) || entry.val() == 'Infinity' || entry.val() == '-Infinity') {
    entry.val("ERROR");
    //Animacion
    $(entry).addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(entry).removeClass("animated flash");
    });
  }
  //Reinicio de variables
  firstoperand = 0;
  secondoperand = 0;
  operator = "";
  operation.val("");
});

//Se anida la funcion buttons a los botones del area izquierda
buttons($('#one'));
buttons($('#two'));
buttons($('#three'));
buttons($('#four'));
buttons($('#five'));
buttons($('#six'));
buttons($('#seven'));
buttons($('#eight'));
buttons($('#nine'));
buttons($('#zero'));
buttons($('#d_zero'));
buttons($('#point'));

//Se anida la funcion opeartions a los botones del area derecha
operations($('#plus'));
operations($('#minus'));
operations($('#times'));
operations($('#divide'));
operations($('#root'));
operations($('#exponential'));
operations($('#sine'));
operations($('#cosine'));
operations($('#tangent'));

//Funcion suma
function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
};

//Funcion resta
function substract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
};

//Funcion multiplicacion
function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
};

//Funcion division
function divide(num1, num2) {
  return parseFloat(num1) / parseFloat(num2);
};

//Funcion para potencias
function pow(num, times) {
  var result = 1;
  var x;
  if (times > 0) {
    //Numeros positivos
    for (x = 1; x <= times; x++) {
      result = parseFloat(result) * parseFloat(num);
    }
  } else if (times == 0) {
    //Cero
    result = 1;
  } else {
    //Numeros negativos
    for (x = times; x <= 0; x++) {
      result = parseFloat(result) / parseFloat(num);
    }
  }
  return result;
}

//Funcion factorial
function factorial(num) {
  var fact = 1;
  for (var i = 1; i <= num; i++) {
    fact *= i;
  }
  return fact;
}

//Funcion raiz cuadrada
function sqrt_bab(num, error) {

  var b = x;
  var h = 0;

  while (parseFloat(b) != parseFloat(h)) {
    b = (parseFloat(h) + parseFloat(b)) / 2;
    h = parseFloat(x) / parseFloat(b);
  }
  return b;
}

//Funcion para calcular error meta
function error_s(num) {
  return 0.5 * pow(10, 2 - num);
}

//Funcion para comprobar el estado del slider de grados-radianes
function checkunits() {
  return $('#unchecked').prop('checked');
}

//Funcion que calcula el valor absoluto
function abs(num) {
  if (num < 0) {
    return num * -1;
  } else {
    return num;
  }
}

//Funcion seno
function sine(num, error, printable) {

  //Conversion a radianes si es necesaria
  if (!checkunits()) {
    num = parseFloat(num * pi / 180);
  }

  var es = parseFloat(error_s(error));
  var firstvalue = parseFloat(num);
  var secondvalue = parseFloat(0);
  var i = parseInt(1);
  var ea = parseFloat(100);
  var operation = parseFloat(0);
  var printednum = 0;
  //Si se requiere imprimir la tabla de iteraciones, imprime titulos
  if (printable == 1) {
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><th class='table-title wow bounceInUp' data-wow-delay='0.6s'>t</th><th class='table-title wow bounceInUp' data-wow-delay='0.7s'>sin(x)</th><th class='table-title wow bounceInUp' data-wow-delay='0.8s'>ea</th></tr>");
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + 1 + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + num.toFixed(error) + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>-</td></tr>");
  }
  while (ea >= es) {
    operation = pow(-1, i) * pow(num, 2 * i + 1) / factorial(2 * i + 1);
    secondvalue = firstvalue + operation;
    ea = abs((secondvalue - firstvalue) / secondvalue * 100);
    firstvalue = secondvalue;
    i++;
    printednum = secondvalue.toFixed(error);
    //Si se requiere imprimir la tabla de iteraciones, imprime las iteraciones
    if (printable == 1) {
      $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + i + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + printednum + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>" + ea + "</td></tr>");
    }
  }
  return secondvalue;
}

//Funcion coseno
function cosine(num, error, printable) {

  //Conversion a radianes si es necesaria
  if (!checkunits()) {
    num = parseFloat(num * pi / 180);
  }

  var es = parseFloat(error_s(error));
  var firstvalue = parseFloat(1);
  var secondvalue = parseFloat(0);
  var i = parseInt(1);
  var ea = parseFloat(100);
  var operation = parseFloat(0);
  var printednum = 0;
  //Si se requiere imprimir la tabla de iteraciones, imprime titulos
  if (printable == 1) {
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><th class='table-title wow bounceInUp' data-wow-delay='0.6s'>t</th><th class='table-title wow bounceInUp' data-wow-delay='0.7s'>cos(x)</th><th class='table-title wow bounceInUp' data-wow-delay='0.8s'>ea</th></tr>");
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + 1 + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + num.toFixed(error) + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>-</td></tr>");
  }
  while (ea >= es) {
    operation = pow(-1, i) * pow(num, 2 * i) / factorial(2 * i);
    secondvalue = firstvalue + operation;
    ea = abs((secondvalue - firstvalue) / secondvalue * 100);
    firstvalue = secondvalue;
    i++;
    printednum = secondvalue.toFixed(error);
    //Si se requiere imprimir la tabla de iteraciones, imprime iteraciones
    if (printable == 1) {
      $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + i + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + printednum + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>" + ea + "</td></tr>");
    }
  }
  return secondvalue;
}

//Funcion tangente
function tangent(num, error) {
  return sine(num, error, 1) / cosine(num, error, 1);
}