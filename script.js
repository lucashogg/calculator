// Add function
const add = (a, b) => a + b;
// Subtract function
const subtract = (a, b) => a - b;
// Multiply function
const multiply = (a, b) => a * b;
// Divide function
const divide = (a, b) => a / b;

// Operate calculator function
const operate = (operator, num1, num2) => {
    const operatorsArr = ['+', '-', 'x', '/'];
    let opr = operatorsArr.find(item => item === operator);
    let result = 0;

    switch (opr) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case 'x':
            result = multiply(num1, num2);
            break;
        case '/':
            if (num2 === 0) {
                return 'ERROR';
            } else {
                result = divide(num1, num2);
                break;
            }
        default:
            return 'ERROR';
    }
    return result;
}

// Get DOM elements
const btns = document.querySelectorAll('.btn');
const numberBtns = document.querySelectorAll('.btn-number');
const operatorBtns = document.querySelectorAll('.btn-opr');
const display = document.querySelector('.display');

// Declare variables for operate function and HTML display
let num1 = '';
let num2 = '';
let operator = '';
let result = '';

// Listen for AC and Delete buttons
btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // If AC button, clear all values
        if (btn.id === 'btn-ac') {
            display.innerHTML = '&nbsp;';
            num1 = '';
            num2 = '';
            operator = '';
            result = '';
        }
        // If Delete button...
        if (btn.id === 'btn-del') {
            // If operator, only delete num2
            if (operator != '') {
                // If num2 has values, delete until empty, then insert placeholder
                if (num2.length > 0) {
                    num2 = num2.slice(0, -1);
                    if (num2.length === 0) {
                        display.innerHTML = '&nbsp;';
                    } else {
                        display.innerText = num2;
                    }
                }
            } else {
                // If num1 has values, delete until empty, then insert placeholder
                if (num1.length > 0) {
                    num1 = num1.slice(0, -1);
                    if (num1.length === 0) {
                        display.innerHTML = '&nbsp;';
                    } else {
                        display.innerText = num1;
                    }

                }
            }
        }
    });
});
// Listen for numbered buttons
numberBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // Only update num1 if no operator selected, otherwise update num2
        if (operator === '') {
            // Remove all values if result from previous calculation is true (start over)
            if (result != '') {
                result = '';
                num1 = '';
                num2 = '';
                operator = '';
                num1 += e.target.innerText;
                display.innerText = num1;
            } else {
                num1 += e.target.innerText;
                display.innerText = num1;
            }
        } else {
            num2 += e.target.innerText;
            display.innerText = num2;
        }
    });
});
// Listen for operator buttons
operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // Check if only num1 has value, then select operator
        if (operator === '' && btn.id != 'btn-equal' && num1 != '') {
            operator = e.target.innerText;
            display.innerText += operator;
        } else if (btn.id === 'btn-equal') {
            // If equals is selected, make sure num2 has a value
            if (num2 != '') {
                result = operate(operator, parseFloat(num1), parseFloat(num2));
                // Display error if operate function fails
                if (result === 'ERROR') {
                    display.innerText = 'ERROR';
                    operator = '';
                    num1 = result;
                    num2 = '';
                } else {
                    // Display result and make sure to preserve result in num1 if user continues to calculate
                    display.innerText = (1 * result.toFixed(3));
                    operator = '';
                    num1 = result;
                    num2 = '';
                }
            }
        } else {
            // If user selects operator instead of equals, continue calculating and updating result
            if (num2 != '') {
                result = operate(operator, parseFloat(num1), parseFloat(num2));
                display.innerText = (1 * result.toFixed(3));
                operator = e.target.innerText;
                display.innerText += operator;
                num1 = result;
                num2 = '';
            }
        }
    });
});