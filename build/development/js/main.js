"use strict";

var entry = $("#entrypoint");
var operation = $("#operation");
var contpoint = 0;
var firstoperand = 0;
var secondoperand = 0;
var operator = "";

var pi = 3.141592653;

$("#c").click(function () {
  entry.val("");
  contpoint = 0;
});

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
  });
}

function operations(idbutton) {

  $(idbutton).click(function () {
    contpoint = 0;
    firstoperand = entry.val();
    entry.val("");
    operation.val(firstoperand + idbutton.val());
    operator = idbutton.val();
  });
}
$('#equals').click(function () {

  secondoperand = entry.val();
  console.log(firstoperand);
  console.log(secondoperand);
  if (operator == "+") {
    entry.val(add(firstoperand, secondoperand));
  } else if (operator == "-") {
    entry.val(substract(firstoperand, secondoperand));
  } else if (operator == "x") {
    entry.val(multiply(firstoperand, secondoperand));
  } else if (operator == "/") {
    entry.val(divide(firstoperand, secondoperand));
  } else if (operator == "sqrt") {
    entry.val(sqrt_bab(firstoperand, secondoperand));
  } else if (operator == "e^x") {
    entry.val(pow(firstoperand, secondoperand));
  } else if (operator == "sin") {
    entry.val(sine(firstoperand, secondoperand));
  } else if (operator == "cos") {
    entry.val(cosine(firstoperand, secondoperand));
  }
  firstoperand = 0;
  secondoperand = 0;
  operator = "";
  operation.val("");
});

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

operations($('#plus'));
operations($('#minus'));
operations($('#times'));
operations($('#divide'));
operations($('#root'));
operations($('#exponential'));
operations($('#sine'));
operations($('#cosine'));
operations($('#tangent'));

function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
};

function substract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
};

function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
};

function divide(num1, num2) {
  return parseFloat(num1) / parseFloat(num2);
};

function pow(num, times) {
  var result = 1;
  var x;
  if (times > 0) {
    for (x = 1; x <= times; x++) {
      result = parseFloat(result) * parseFloat(num);
    }
  } else if (times == 0) {
    result = 1;
  } else {
    for (x = times; x <= 0; x++) {
      result = parseFloat(result) / parseFloat(num);
    }
  }
  return result;
}

function factorial(num) {
  var fact = 1;
  for (var i = 1; i <= num; i++) {
    fact *= i;
  }
  return fact;
}

function sqrt_bab(num, error) {

  var b = x;
  var h = 0;

  while (parseFloat(b) != parseFloat(h)) {
    b = (parseFloat(h) + parseFloat(b)) / 2;
    h = parseFloat(x) / parseFloat(b);
  }
  return b;
}

function error_s(num) {
  return 0.5 * pow(10, 2 - num);
}

function checkunits() {
  return $('#unchecked').prop('checked');
}
function abs(num) {
  if (num < 0) {
    return num * -1;
  } else {
    return num;
  }
}

function sine(num, error) {
  if (!checkunits()) {
    num = parseFloat(num * pi / 180);
  }
  var es = parseFloat(error_s(error));
  var firstvalue = parseFloat(num);
  var secondvalue = parseFloat(0);
  var i = parseInt(1);
  var ea = parseFloat(100);
  var operation = parseFloat(0);

  while (ea >= es) {
    console.log("num: " + num);
    console.log("t: " + i);
    operation = pow(-1, i) * pow(num, 2 * i + 1) / factorial(2 * i + 1);
    console.log("Primer pow: " + pow(-1, i));
    console.log("Segundo pow: " + pow(num, 2 * i + 1));
    console.log("Factorial: " + factorial(2 * i + 1));
    console.log("Operation: " + operation);
    secondvalue = firstvalue + operation;
    console.log("sin(x): " + secondvalue);
    ea = abs((secondvalue - firstvalue) / secondvalue * 100);
    console.log("ea: " + ea);
    firstvalue = secondvalue;
    i++;
  }
  return secondvalue;
}

function cosine(num, error) {
  if (!checkunits()) {
    num = parseFloat(num * pi / 180);
  }
  console.log("Error: " + error);
  var es = parseFloat(error_s(error));
  var firstvalue = parseFloat(1);
  var secondvalue = parseFloat(0);
  var i = parseInt(1);
  var ea = parseFloat(100);
  var operation = parseFloat(0);
  console.log("es: " + es);
  while (ea >= es) {
    console.log("num: " + num);
    console.log("t: " + i);
    operation = pow(-1, i) * pow(num, 2 * i) / factorial(2 * i);
    console.log("Primer pow: " + pow(-1, i));
    console.log("Segundo pow: " + pow(num, 2 * i));
    console.log("Factorial: " + factorial(2 * i));
    console.log("Operation: " + operation);
    secondvalue = firstvalue + operation;
    console.log("cos(x): " + secondvalue);
    ea = abs((secondvalue - firstvalue) / secondvalue * 100);
    console.log("ea: " + ea);
    firstvalue = secondvalue;
    i++;

    return secondvalue;
  }
}