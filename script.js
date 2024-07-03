function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return add(operand1, operand2);
      break;

    case "-":
      return subtract(operand1, operand2);
      break;

    case "*":
      return multiply(operand1, operand2);
      break;

    case "/":
      // TODO: - Snark for div/zero
      return divide(operand1, operand2);
      break;
  }
}

let operand1;
let operator;
let operand2;
