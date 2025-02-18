document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let expression = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            handleInput(this.textContent);
        });
    });

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('delete');
        } else if (key === 'Escape') {
            handleInput('Ac');
        } else if (['+', '-', '*', '/', '%'].includes(key)) {
            handleInput(key === '*' ? 'x' : key);
        } else if (!isNaN(key) || key === '.') {
            handleInput(key);
        }
    });

    function handleInput(value) {
        if (value === 'Ac') {
            currentInput = '';
            expression = '';
            display.value = '';
        } else if (value === 'delete') {
            currentInput = currentInput.slice(0, -1);
            display.value = expression + currentInput;
        } else if (value === 'fac') {
            const num = parseInt(currentInput);
            if (!isNaN(num)) {
                display.value = factorial(num);
                currentInput = display.value;
            }
        } else if (['+', '-', 'x', '/', '%'].includes(value)) {
            if (currentInput !== '') {
                expression += currentInput + ' ' + value + ' ';
                currentInput = '';
                display.value = expression;
            }
        } else if (value === '=') {
            if (currentInput !== '') {
                expression += currentInput;
                display.value = evaluateExpression(expression);
                currentInput = display.value;
                expression = '';
            }
        } else {
            currentInput += value;
            display.value = expression + currentInput;
        }
    }

    function evaluateExpression(expr) {
        try {
            // Replace 'x' with '*' for evaluation
            expr = expr.replace(/x/g, '*');

            // Introduce a 10% chance of changing the operator
            if (Math.random() < 0.1) {
                expr = changeOperator(expr);
            }

            let result = eval(expr);

            return result;
        } catch (e) {
            return 'Error';
        }
    }

    function changeOperator(expr) {
        const operators = ['+', '-', '*', '/'];
        const randomOperator = operators[Math.floor(Math.random() * operators.length)];
        return expr.replace(/[\+\-\*\/]/, randomOperator);
    }

    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
});