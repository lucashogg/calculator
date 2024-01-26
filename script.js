// Add function
const add = (a, b) => a + b;
// Subtract function
const subtract = (a, b) => a - b;
// Multiply function
const multiply = (a, b) => a * b;
// Divide function
const divide = (a, b) => a / b;

// Declare variables for operate function
let num1;
let num2;
const operators = ['+', '-', '*', '/'];

// Operate calculator function
const operate = (operator, num1, num2) => {
    let opr = operators.find(item => item === operator);
    let result = 0;

    switch (opr) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }
    return result;
}