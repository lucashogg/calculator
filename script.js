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

// Declare variables for operate function
let num1 = '';
let num2 = '';
let operator = '';
let result = '';

// Initialize display
let displayValue = '';

// Listen for any button
btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (btn.id === 'btn-ac') {
            console.log('clear');
            display.innerHTML = '&nbsp;';
            num1 = '';
            num2 = '';
            operator = '';
        }

        if (btn.id === 'btn-del') {
            if (operator != '') {
                if (num2.length > 0) {
                    num2 = num2.slice(0, -1);
                    console.log(`num2: ${num2}`);
                }
            } else {
                if (num1.length > 0) {
                    num1 = num1.slice(0, -1);
                    console.log(`num1: ${num1}`);
                }
            }
        }
    });
});
// Listen for numbered buttons
numberBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (operator === '') {
            if (result != '') {
                num1 = '';
                num2 = '';
                operator = '';
                num1 += e.target.innerText;
                console.log(`num1: ${num1}`);
            } else {
                num1 += e.target.innerText;
                console.log(`num1: ${num1}`);
            }
        } else {
            num2 += e.target.innerText;
            console.log(`num2: ${num2}`);
        }
    });
});
// Listen for operator buttons
operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (operator === '' && btn.id != 'btn-equal' && num1 != '') {
            operator = e.target.innerText;
            console.log(`opr: ${operator}`);
        } else if (btn.id === 'btn-equal') {
            if (num2 != '') {
                result = operate(operator, parseFloat(num1), parseFloat(num2));
                if (result === 'ERROR') {
                    console.log('ERROR');
                    operator = '';
                    num1 = result;
                    num2 = '';
                } else {
                    console.log(`result: ${1 * result.toFixed(3)}`);
                    operator = '';
                    num1 = result;
                    num2 = '';
                }
            }
        } else {
            if (num2 != '') {
                result = operate(operator, parseFloat(num1), parseFloat(num2));
                console.log(`result: ${1 * result.toFixed(3)}`);
                operator = e.target.innerText;
                console.log(`opr: ${operator}`);
                num1 = result;
                num2 = '';
            }
        }
    });
});