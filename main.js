let buttons = document.querySelector('.buttons');
let display = document.querySelector('#display');

let operator = '';
let operand = '';
let operators = [];
let result;

buttons.addEventListener('click', calculate);

function calculate(e) {
	if (e.target.parentElement.classList.contains('buttons-numbers')) {
		getOperator(e);
	}
	if (e.target.parentElement.classList.contains('buttons-operators')) {
		getOperand(e);
	}
	if (e.target.classList.contains('equals')) {
		getEquality();
	}
	if (e.target.classList.contains('clear')) {
		clear();
	}
	if (e.target.classList.contains('delete')) {
		deleteLast();
	}
}

function getOperator(e) {
	display.innerText += e.target.value;
	operator += e.target.value;
}

function getOperand(e) {
	if (display.innerText.indexOf('+') > 0 || display.innerText.indexOf('-') > 0 || display.innerText.indexOf('*') > 0 || display.innerText.indexOf('/') > 0) {
		operators.push(Number(operator));
		getResult(operators, operand);
		operators = [];
		operators.push(result);
		operator = '';
		operand = e.target.value;
		display.innerText += operand;
	} else {
		display.innerText += e.target.value;
		operand += e.target.value;
		operators.push(Number(operator));
		operator = '';
	}
}

function getEquality() {
	operators.push(Number(operator));
	getResult(operators, operand);
	operators = [];
	operator = result;
	operand = '';
}

function clear() {
	display.innerText = '';
	operators = [];
	operand = '';
	result = '';
	operator = '';
}

function getResult(operators, operand) {
	switch (operand) {
		case '+':
			result = operators[0] + operators[1];
			break;
		case '-':
			result = operators[0] - operators[1];
			break;
		case '*':
			result = operators[0] * operators[1];
			break;
		case '/':
			result = operators[0] / operators[1];
			break;
	}
	if (!Number.isInteger(result)) {
		result = result.toFixed(4);
	}
	display.innerText = result;
	return result;
}

function deleteLast() {
	display.innerText = display.innerText.slice(0, -1);
	operator = display.innerText;
}

document.addEventListener('keydown', function (e) {
	e.preventDefault();
	if (!isNaN(Number(e.key)) || e.key == '.') {
		e.target.value = e.key;
		getOperator(e);
	}
	if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
		e.target.value = e.key;
		getOperand(e)
	}
	if (e.key == '=' || e.key == 'Enter') {
		getEquality();
	}
	if (e.key == 'Backspace') {
		deleteLast();
	}
})

