const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const mathSyms = ["%", "x", "-", "+"];

const displayNode = document.querySelector("#displayContent");
let displayValue = "0";
updateDisplay();

// Record of operation history to determine behavior related to = button
let lastButton = null;
let lastOperator = null;
let lastOperand = null;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    const button = e.target.textContent;
    const expressionArr = displayValue.split(" ");
    console.log(expressionArr);
    const expressionChars = expressionArr.join("").split("");
    const expressionLast = expressionChars[expressionChars.length - 1];

    if (displayValue === "0") {
      displayValue = "";
    }

    if (button === "C") {
      displayValue = "0";
      updateDisplay();
    } else if (button === "=") {
      displayValue = handleEquals(displayValue, expressionArr);
      updateDisplay();
    } else if (nums.includes(button)) {
      displayValue = handleNumber(displayValue, button, expressionLast);
      updateDisplay();
    } else if (mathSyms.includes(button)) {
      displayValue = handleMathSym(
        displayValue,
        button,
        expressionArr,
        expressionLast,
      );
      updateDisplay();
    }
    lastButton = button;
  }
});

function handleEquals(displayValue, expressionArr) {
  if (isFullExpression(displayValue)) {
    return operate(expressionArr[0], expressionArr[1], expressionArr[2]);
  } else if (expressionArr.length === 1) {
    return operate(expressionArr[0], lastOperator, lastOperand);
  }
}

function handleNumber(displayValue, button, expressionLast) {
  if (nums.includes(expressionLast)) {
    if (lastButton === "=") {
      return button;
    } else {
      return displayValue + button;
    }
  } else {
    return displayValue + " " + button;
  }
}

function handleMathSym(displayValue, button, expressionArr, expressionLast) {
  if (isFullExpression(displayValue)) {
    result = operate(expressionArr[0], expressionArr[1], expressionArr[2]);
    return result + " " + button;
  } else if (nums.includes(expressionLast)) {
    return displayValue + " " + button;
  }
}

// prevents calculatar display from overflowing
function updateDisplay() {
  if (displayValue.length > 15) {
    result = displayValue.slice(displayValue.length - 15);
  } else {
    result = displayValue;
  }

  displayNode.textContent = result;
}

function displayErrorMessage() {
  toggleDisableButtons();
  displayNode.textContent = "ERROR";

  setTimeout(() => {
    toggleDisableButtons();
    displayNode.textContent = "0";
  }, 2000);
}

function isFullExpression(str) {
  if (str.split(" ").length === 3) {
    return true;
  }
  return false;
}

function toggleDisableButtons() {
  const allButtons = document.querySelectorAll(".button");

  for (const button of allButtons) {
    button.toggleAttribute("disabled");
  }
}

function operate(operand1, operator, operand2) {
  operand1 = Number(operand1);
  operand2 = Number(operand2);
  console.log(`operand1: ${operand1}, operand2: ${operand2}`);

  switch (operator) {
    case "+":
      result = add(operand1, operand2);
      break;

    case "-":
      result = subtract(operand1, operand2);
      break;

    case "x":
      result = multiply(operand1, operand2);
      break;

    case "%":
      result = divide(operand1, operand2);
      break;
  }
  lastOperator = operator;
  lastOperand = `${operand2}`;

  return `${result}`;
}

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
