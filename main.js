let buttonsOperands = Array.from(document.querySelector('.buttons-numbers').children);
let display = document.querySelector('#display');
let clear = document.querySelector('#clear');
let equals = document.querySelector('#equals');
let buttonsOperators = Array.from(document.querySelector('.buttons-operators').children);

let operator = '';
let operand = '';
let operators = [];
let result;

buttonsOperands.forEach((btn) => {
	btn.addEventListener('click', function () {
		display.innerText += btn.value;
		operator += btn.value;
	})
})

buttonsOperators.forEach((btn) => {
	btn.addEventListener('click', function () {
		display.innerText += btn.value;
		operand += btn.value;
		operators.push(Number(operator));
		operator = '';
	})
})

equals.addEventListener('click', function () {
	getResult(operators, operand);
	operators = [];
	operator = result;
	operand = '';
})

clear.addEventListener('click', clearCalculator);

function clearCalculator() {
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
	display.innerText = result;
	return result;
}