document.addEventListener('DOMContentLoaded', () => {
    const output = document.querySelector('.count');
    const clearButton = document.querySelector('.header-clear--button');
    const buttons = document.querySelectorAll('.input-panel--button');

    let currInput = '';
    let prevInput = '';
    let operation = null;
    let resetScreen = false;

    const updateDisplay = () => {
        output.textContent = currInput || '0';
    }

    const clearBtn = () => {
        currInput = '';
        prevInput = '';
        operation = null;
        resetScreen = false;
        updateDisplay();
    }

    const appNum = (num) => {
        if (num === '.' && currInput.includes('.')) return;
        if (resetScreen) {
            currInput = '';
            resetScreen = false;
        }
        currInput += num;
        updateDisplay();
    }

    const compute = () => {
        try {
            const prev = parseFloat(prevInput);
            const current = parseFloat(currInput);
            if (isNaN(prev) || isNaN(current)) return;

            let result;

            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '÷':
                    result = current === 0 ? 'Ошибка' : prev / current;
                    break;
                case 'х':
                    result = prev * current;
                    break;
                default:
                    return;
            }

            if (result === 'Ошибка') {
                output.textContent = result;
                currInput = '';
                prevInput = '';
                operation = null;
                resetScreen = true;
                return;
            }

            currInput = result.toString();
            operation = null;
            prevInput = '';
        } catch(e) {
            resetScreen = true;
            updateDisplay(); 
        }
        updateDisplay();
    }

    const chooseOperation = (op) => {
        if (currInput === '') return;
        if (prevInput !== '') {
            compute();
        }
        prevInput = currInput;
        operation = op;
        resetScreen = true;
    }

    const handleEquals = () => {
        if (operation === null || currInput === '' || prevInput === '') return;
        compute();
        resetScreen = true;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.trim();

            if (!isNaN(value) || value === '.') {
                appNum(value);
            } else if (value === '+' || value === '-' || value === '÷' || value === 'х') {
                chooseOperation(value);
            } else if (value === '=') {
                handleEquals();
            } else if (value.toLowerCase() === 'clear') {
                clearBtn();
            }
        });
    });

    clearButton.addEventListener('click', clearBtn);

    updateDisplay();
});