let inputNum = document.getElementById('enterNum');




const elementsArray = Array.from(document.querySelectorAll(".numberAdd, .condition, .mathSymbol, .equal, .percent, .plusM"));

const handleClick = (event) => {
  const { target } = event;
  let currentShadow = target.style.boxShadow;

  if (target.matches('.numberAdd, .condition, .mathSymbol, .equal, .percent, .plusM')) {
        target.style.boxShadow = "none";
        setTimeout(() => {
          target.style.boxShadow = currentShadow;
        }, 150);
      }
};

elementsArray.forEach((element) => {
    element.addEventListener("click", handleClick);
  });

// 

const calculator = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

function inputDigit(digit) {
const { displayValue, waitingForSecondOperand } = calculator;

if(waitingForSecondOperand === true) {
  calculator.displayValue = digit;
  calculator.waitingForSecondOperand = false;
} else {
  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}
};
  
function inputOperator(nextOperator){
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  
  if(operator && calculator.waitingForSecondOperand){
    calculator.operator = nextOperator;
    return;
  }
  
  if(firstOperand === null){
    calculator.firstOperand = inputValue;
  
  } else if(operator) {
  const result = performCalculation[operator](firstOperand, inputValue);
  calculator.displayValue = String(result);
  calculator.firstOperand = result;
  }
   calculator.waitingForSecondOperand = true;
   calculator.operator = nextOperator;
  };

  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
    
    };
    

const updateDisplay = () => {
  const display = document.querySelector(".screen")
  display.value = calculator.displayValue;
};
updateDisplay();

const keys = document.querySelector('.container');

keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('numberAdd')) {
    inputDigit(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('condition')) {
    inputOperator(target.value);
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }


  if(target.value === 'all-clear'){
    resetCalculator();
   updateDisplay();
   return;
  }

  if(target.value === '='){
    handleEquals();
    updateDisplay();
    return;
  }

  if(target.value === '%'){
    handlePercent();
    updateDisplay();
    return;
  }

  if (target.value === 'plus-minus'){
    toggleSign();
    updateDisplay();
    return;
  }
});

function resetCalculator(){
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
}

function inputDecimal(dot){
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if(!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleEquals(){
  const { firstOperand, displayValue, operator} = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.firstOperand !== null){
    const result = performCalculation[operator](calculator.firstOperand, inputValue);
    calculator.displayValue = String(result);
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    
  }
};

function handlePercent(){
  const {firstOperand, displayValue, operator} = calculator;
  const inputValue = parseFloat(displayValue);

  if(firstOperand !== null){
    const percentValue = (firstOperand * inputValue) / 100;
    const result = performCalculation[operator](firstOperand, percentValue);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
  }
}
// console.log(handleEquals());

function toggleSign(){
  calculator.displayValue = (parseFloat(calculator.displayValue) * -1).toString();
}
