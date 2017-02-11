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
    $(idbutton).addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(idbutton).removeClass("animated pulse");
    });
  });
}

//Funcion para la operacion de los botones de operador
function operations(idbutton) {
  $(idbutton).click(function () {
    contpoint = 0;
    console.log($(idbutton).attr('id'));
    if ($(idbutton).attr('id') == 'minus') {
      //Manejo del boton menos para diferenciar entre negativo y menos
      if (entry.val() == "") {
        entry.val("-");
        console.log("Aqui andamos brother");
      } else {
        console.log("Aqui no deberiamos de andar brother");
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
    $(idbutton).addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(idbutton).removeClass("animated pulse");
    });
  });
}

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

//Boton clear
$("#c").click(function () {
  //Limpieza de la calculadora
  entry.val("");
  operation.val("");
  contpoint = 0;
  //Limpieza de la tabla
  $('.table').empty();
  //Animacion
  $('#c').addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $('#c').removeClass("animated pulse");
  });
});

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
    if (sqrt_bab(firstoperand, secondoperand, 0) != null) {
      entry.val(sqrt_bab(firstoperand, secondoperand, 1).toFixed(abs(secondoperand)));
    } else {
      entry.val("NaN");
    }
  } else if (operator == "e^x") {
    entry.val(exponential(firstoperand, secondoperand, 1).toFixed(abs(secondoperand)));
  } else if (operator == "sin") {
    entry.val(sine(firstoperand, secondoperand, 1).toFixed(abs(secondoperand)));
  } else if (operator == "cos") {
    entry.val(cosine(firstoperand, secondoperand, 1).toFixed(abs(secondoperand)));
  } else if (operator == "tan") {
    if (tangent(firstoperand, secondoperand, 0) != null) {
      entry.val(tangent(firstoperand, secondoperand, 1).toFixed(abs(secondoperand)));
    } else {
      entry.val("NaN");
    }
  } else if (operator == "ln") {
    if (logarithm(firstoperand, secondoperand, 0) != null) {
      entry.val(logarithm(firstoperand, secondoperand, 1).toFixed(abs(secondoperand)));
    } else {
      entry.val("NaN");
    }
  } else {
    entry.val(firstoperand);
  }
  //Animacion
  $('#equals').addClass("animated pulse").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $('#equals').removeClass("animated pulse");
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

//Se anida la funcion operations a los botones del area derecha
operations($('#plus'));
operations($('#minus'));
operations($('#times'));
operations($('#divide'));
operations($('#root'));
operations($('#exponential'));
operations($('#sine'));
operations($('#cosine'));
operations($('#tangent'));
operations($('#ln'));

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
  var err = abs(error);

  if (num > 360) {
    num = num % 360;
  }
  //Conversion a radianes si es necesaria
  if (!checkunits()) {
    num = parseFloat(num * pi / 180);
  }

  var es = parseFloat(error_s(err));
  var firstvalue = parseFloat(num);
  var secondvalue = parseFloat(0);
  var i = parseInt(1);
  var ea = parseFloat(100);
  var operation = parseFloat(0);
  var printednum = 0;
  //Si se requiere imprimir la tabla de iteraciones, imprime titulos
  if (printable == 1) {
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><th class='table-title wow bounceInUp' data-wow-delay='0.6s'>t</th><th class='table-title wow bounceInUp' data-wow-delay='0.7s'>sin(x)</th><th class='table-title wow bounceInUp' data-wow-delay='0.8s'>ea</th></tr>");
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + 1 + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + parseFloat(num).toFixed(err) + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>-</td></tr>");
  }
  while (ea >= es) {
    operation = pow(-1, i) * pow(num, 2 * i + 1) / factorial(2 * i + 1);
    secondvalue = firstvalue + operation;
    ea = abs((secondvalue - firstvalue) / secondvalue * 100);
    firstvalue = secondvalue;
    i++;
    printednum = secondvalue.toFixed(err);
    //Si se requiere imprimir la tabla de iteraciones, imprime las iteraciones
    if (printable == 1) {
      $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + i + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + printednum + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>" + ea + "</td></tr>");
    }
  }
  return secondvalue;
}

//Funcion coseno
function cosine(num, error, printable) {
  var err = abs(error);

  if (num > 360 || num < -360) {
    num = num % 360;
  }

  //Conversion a radianes si es necesaria
  if (!checkunits()) {
    num = parseFloat(num * pi / 180);
  }

  var es = parseFloat(error_s(err));
  var firstvalue = parseFloat(1);
  var secondvalue = parseFloat(0);
  var i = parseInt(1);
  var ea = parseFloat(100);
  var operation = parseFloat(0);
  var printednum = 0;
  //Si se requiere imprimir la tabla de iteraciones, imprime titulos
  if (printable == 1) {
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><th class='table-title wow bounceInUp' data-wow-delay='0.6s'>t</th><th class='table-title wow bounceInUp' data-wow-delay='0.7s'>cos(x)</th><th class='table-title wow bounceInUp' data-wow-delay='0.8s'>ea</th></tr>");
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + 1 + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + parseFloat(num).toFixed(err) + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>-</td></tr>");
  }
  while (ea >= es) {
    operation = pow(-1, i) * pow(num, 2 * i) / factorial(2 * i);
    secondvalue = firstvalue + operation;
    ea = abs((secondvalue - firstvalue) / secondvalue * 100);
    firstvalue = secondvalue;
    i++;
    printednum = secondvalue.toFixed(err);
    //Si se requiere imprimir la tabla de iteraciones, imprime iteraciones
    if (printable == 1) {
      $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + i + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + printednum + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>" + ea + "</td></tr>");
    }
  }
  return secondvalue;
}

//Funcion tangente
function tangent(num, error, printable) {

  var err = abs(error);

  if (num > 360 || num < -360) {
    num = num % 360;
  }

  if (num % 90 == 0) {
    if (num / 90 % 2 != 0) {
      return null;
    }
  }
  if (printable == 1) {
    return sine(num, err, 1) / cosine(num, err, 1);
  } else {
    return sine(num, err, 0) / cosine(num, err, 0);
  }
}

//Funcion exponencial de x
function exponential(num, error, printable) {
  var err = abs(error);
  var es = parseFloat(error_s(err));
  var firstvalue = parseFloat(1);
  var secondvalue = parseFloat(0);
  var i = parseInt(1);
  var ea = parseFloat(100);
  var operation = parseFloat(0);
  var printednum = 0;
  //Si se requiere imprimir la tabla de iteraciones, imprime titulos
  if (printable == 1) {
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><th class='table-title wow bounceInUp' data-wow-delay='0.6s'>t</th><th class='table-title wow bounceInUp' data-wow-delay='0.7s'>e^x</th><th class='table-title wow bounceInUp' data-wow-delay='0.8s'>ea</th></tr>");
    $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + 1 + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + parseFloat(num).toFixed(err) + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>-</td></tr>");
  }
  while (ea >= es) {
    operation = pow(num, i) / factorial(i);
    secondvalue = firstvalue + operation;
    ea = abs((secondvalue - firstvalue) / secondvalue * 100);
    firstvalue = secondvalue;
    i++;
    console.log("Second value ex: " + secondvalue);
    printednum = parseFloat(secondvalue).toFixed(err);
    //Si se requiere imprimir la tabla de iteraciones, imprime iteraciones
    if (printable == 1) {
      $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.6s'>" + i + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.7s'>" + printednum + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.8s'>" + ea + "</td></tr>");
    }
  }
  return secondvalue;
}

//Funcion para calcular el logaritmo de un numero
function logarithm(num, error, printable) {
  var result = 0;
  var y = 0;
  var a = 0;
  var b = 0;
  var c = 0;
  var f = 0;
  var err = abs(error);
  var es = parseFloat(error_s(err));
  var ea = 100;
  var i = 0;
  var firstvalue = 100;
  var secondvalue = 1;
  var printednum = 0;

  if (num > 0) {
    if (printable == 1) $('.table').append("<tr class='table-row'><th class='table-title'>t</th><th class='table-title'>ln(x)</th><th class='table-title'>ea</th></tr>");
    while (ea >= es) {
      f = 2 * i + parseFloat(1);
      a = 1 / f;
      b = (num - 1) / (parseFloat(num) + parseFloat(1));
      c = pow(b, 2 * i + 1);
      y = a * c;
      result = parseFloat(result) + parseFloat(y);
      ea = abs((secondvalue - firstvalue) / secondvalue * 100);
      printednum = result.toFixed(err);
      if (i == 1) {
        if (printable == 1) $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.5s'>" + i + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.5s'>" + printednum * 2 + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.5s'>" + "----" + "</td></tr>");
      } else {
        if (printable == 1) $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><td class='table-column wow bounceInUp' data-wow-delay='0.5s'>" + i + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.5s'>" + printednum * 2 + "</td><td class='table-column wow bounceInUp' data-wow-delay='0.5s'>" + ea + "</td></tr>");
      }
      firstvalue = secondvalue;
      secondvalue = result;
      i++;
    }
    result = result * 2;
    return result;
  } else {
    return null;
  }
}

//Funcion raiz cuadrada
function sqrt_bab(x, error, printable) {
  var err = abs(error);
  var b = x;
  var h = 0;
  var es = parseFloat(error_s(err));
  var i = 1;
  var ea = 1000;
  var operation = 0;
  var printednum = 0;
  if (printable == 1) $('.table').append("<tr class='table-row wow bounceInUp' data-wow-delay='0.5s'><th class='table-title wow bounceInUp' data-wow-delay='0.5s'>t</th><th class='table-title wow bounceInUp' data-wow-delay='0.5s'>sqrt(x)</th><th class='table-title wow bounceInUp' data-wow-delay='0.5s'>ea</th></tr>");

  if (x < 0) {
    printednum = null;
    b = null;
  } else {
    while (ea >= es) {
      ea = (b - h) / h * 100;
      b = (parseFloat(h) + parseFloat(b)) / 2;
      h = x / b;
      printednum = b.toFixed(err);
      if (printable == 1) {
        if (i == 1) $('.table').append("<tr class='table-row'><td class='table-column'>" + i + "</td><td class='table-column'>" + printednum + "</td><td class='table-column'>" + "----" + "</td></tr>");else {
          $('.table').append("<tr class='table-row'><td class='table-column'>" + i + "</td><td class='table-column'>" + printednum + "</td><td class='table-column'>" + ea + "</td></tr>");
        }
      }
      i++;
    }
  }
  return b;
}