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