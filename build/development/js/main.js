"use strict";

var entry = $("#entrypoint");
var operation = $("#operation");
var contpoint = 0;
var firstoperand = 0;
var secondoperand = 0;
var operator = "";

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
  }
  if (operator == "-") {
    entry.val(substract(firstoperand, secondoperand));
  }
  if (operator == "x") {
    entry.val(multiply(firstoperand, secondoperand));
  }
  if (operator == "/") {
    entry.val(divide(firstoperand, secondoperand));
  }
  if (operator == "sqrt") {
    entry.val(sqrt_bab(firstoperand, secondoperand));
  }
  if (operator == "e^x") {
    entry.val(pow(firstoperand, secondoperand));
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

function pow(num, error) {
  var result = 1;
  var x;
  for (x = 1; x <= error; x++) {
    result = parseFloat(result) * parseFloat(num);
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