let buttons = document.querySelector('.buttons');
let display = document.querySelector('#display');

let operator = '';
let operand = '';
let operators = [];
let result;
let history = [];
let historyOutput = document.querySelector('#history-output');

buttons.addEventListener('click', calculate);

function calculate(e) {
	if (e.target.parentElement.classList.contains('buttons-numbers')) {
		getOperator(e);
	}
	if (e.target.parentElement.classList.contains('buttons-operators')) {
		getOperand(e);
		if (operand == '√') {
			getResult(operators, operand);
			operators = [];
			operator = result;
			operand = '';
		}
	}
	if (e.target.classList.contains('equals')) {
		getEquality();
		writeHistory();
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
		operand = e.target.value;
		if (operator) {
			operators.push(Number(operator));
			operator = '';
		}
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
			getHistory();
			break;
		case '-':
			result = operators[0] - operators[1];
			getHistory();
			break;
		case '*':
			result = operators[0] * operators[1];
			getHistory();
			break;
		case '/':
			result = operators[0] / operators[1];
			getHistory();
			break;
		case '√':
			result = Math.sqrt(operators[0]);
			getHistory();
			break;
	}

	display.innerText = result;
	return result;
}

function getHistory() {
	if (!Number.isInteger(result)) {
		result = Number(result).toFixed(4);
	}
	let historyItem = display.innerText;
	historyItem = `${historyItem}=${result}`;
	history.push(historyItem);

}

function deleteLast() {
	display.innerText = display.innerText.slice(0, -1);
	if (operators.length == 0) {
		operator = display.innerText;
	} else {
		operator = operator.slice(0, -1);
	}
}

function writeHistory() {
	historyOutput.textContent = '';
	for (let elem of history) {
		let p = document.createElement('p');
		p.textContent = elem;
		historyOutput.append(p);
	}
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

document.querySelector('#history').addEventListener('click', function () {
	historyOutput.classList.toggle('visible')
})



