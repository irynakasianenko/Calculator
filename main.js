let buttons = document.querySelector('.buttons');
let display = document.querySelector('#display');

let operator = '';
let operand = '';
let operators = [];
let result;

buttons.addEventListener('click', calculate);

function calculate(e) {
	if (e.target.parentElement.classList.contains('buttons-numbers')) {
		display.innerText += e.target.value;
		operator += e.target.value;
	}
	if (e.target.parentElement.classList.contains('buttons-operators')) {
		display.innerText += e.target.value;
		operand += e.target.value;
		operators.push(Number(operator));
		operator = '';
	}
	if (e.target.classList.contains('equals')) {
		getResult(operators, operand);
		operators = [];
		operator = result;
		operand = '';
	}
	if (e.target.classList.contains('clear')) {
		display.innerText = '';
		operators = [];
		operand = '';
		result = '';
		operator = '';
	}
	if (e.target.classList.contains('delete')) {
		deleteLast();
	}
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
	display.innerText = result;
	return result;
}

document.addEventListener('keydown', function (e) {
	if (!isNaN(Number(e.key))) {
		display.innerText += e.key;
		operator += e.key;
	}
	if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
		display.innerText += e.key;
		operand += e.key;
		operators.push(Number(operator));
		operator = '';
	}
	if (e.key == '=') {
		operators.push(Number(operator));
		getResult(operators, operand);
		operators = [];
		operator = result;
		operand = '';
	}
	if (e.key == 'Backspace') {
		deleteLast();
	}
})

function deleteLast() {
	display.innerText = display.innerText.slice(0, -1);
	operator = operator.slice(0, -1);
}
