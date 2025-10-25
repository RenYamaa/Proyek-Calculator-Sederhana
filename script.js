const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');

let nilaiPertama = '';
let operator = '';
let menungguValueSelanjutnya = false;

const calculate = (n1, operator, n2) => {
    let result = '';
    if (operator === '+') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === '-') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'x') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === '/') {
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
};

calculator.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    const key = event.target;
    const keyText = key.textContent;
    const displayedNum = display.textContent;

    if (key.classList.contains('number')) {
        if (menungguValueSelanjutnya) {
            display.textContent = keyText;
            menungguValueSelanjutnya = false;
        } else if (displayedNum === '0') {
            display.textContent = keyText;
        } else {
            if (keyText === '.' && displayedNum.includes('.')) return;
            display.textContent = displayedNum + keyText;
        }
    }

    else if (key.classList.contains('operator') && keyText !== '=') {
        if (nilaiPertama && operator && !menungguValueSelanjutnya) {
            const nilaiKedua = display.textContent;
            const result = calculate(nilaiPertama, operator, nilaiKedua);
            display.textContent = result;
            nilaiPertama = result;
        } else {
            nilaiPertama = display.textContent;
        }

        operator = keyText;
        menungguValueSelanjutnya = true;
    }

    else if (key.dataset.action === 'calculate') {
        const nilaiKedua = display.textContent;
        if (nilaiPertama && operator) {
            const result = calculate(nilaiPertama, operator, nilaiKedua);
            display.textContent = result;
            nilaiPertama = result;
            operator = '';
            menungguValueSelanjutnya = false;
        }
    }

    else if (key.dataset.action === 'clear') {
        nilaiPertama = '';
        operator = '';
        menungguValueSelanjutnya = false;
        display.textContent = '0';
    }
});
