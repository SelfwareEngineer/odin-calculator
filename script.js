const displayNode = document.querySelector("#displayContent");
let displayValue = "0";
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const mathSyms = ["%", "x", "-", "+"];
updateDisplay();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    const button = e.target.textContent;
    let nodeText = displayNode.textContent;
    const expressionArr = nodeText.split(" ");
    console.log(expressionArr);
    const expressionChars = expressionArr.join("").split("");
    const expressionLast = expressionChars[expressionChars.length - 1];

    if (nodeText === "0") {
      nodeText = "";
    }

    if (button === "C") {
      displayValue = "0";
      updateDisplay();
    } else if (button === "=") {
      displayValue = handleEquals(nodeText, expressionArr);
      updateDisplay();
    } else if (nums.includes(button)) {
      displayValue = handleNumber(nodeText, button, expressionLast);
      updateDisplay();
    } else if (mathSyms.includes(button)) {
      displayValue = handleMathSym(
        nodeText,
        button,
        expressionArr,
        expressionLast,
      );
      updateDisplay();
    } else {
      displayErrorMessage();
    }
  }
});

function handleEquals(nodeText, expressionArr) {
  if (isFullExpression(nodeText)) {
    return operate(expressionArr[0], expressionArr[1], expressionArr[2]);
  }
}

function handleNumber(nodeText, button, expressionLast) {
  if (nums.includes(expressionLast)) {
    return nodeText + button;
  } else {
    return nodeText + " " + button;
  }
}

function handleMathSym(nodeText, button, expressionArr, expressionLast) {
  if (isFullExpression(nodeText)) {
    result = operate(expressionArr[0], expressionArr[1], expressionArr[2]);
    return result + " " + button;
  } else if (nums.includes(expressionLast)) {
    return nodeText + " " + button;
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
      // TODO: - Snark for div/zero
      result = divide(operand1, operand2);
      break;
  }

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
