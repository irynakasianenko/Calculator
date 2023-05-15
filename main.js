let buttonsNumbers = document.querySelector('.buttons-numbers').children;
let operands = Array.from(buttonsNumbers);
let display = document.querySelector('#display');
let clear = document.querySelector('#clear');
let equals = document.querySelector('#equals');
let buttonsOperators = document.querySelector('.buttons-operators').children;
let operators = Array.from(buttonsOperators);

operands.forEach((btn) => {
	btn.addEventListener('click', function () {
		display.innerText += btn.value;
	})
})

operators.forEach((btn) => {
	btn.addEventListener('click', function () {
		display.innerText += btn.value;
	})
})

clear.addEventListener('click', function () {
	display.innerText = '';
})

equals.addEventListener('click', function () {
	let result = getExpression(display.innerText);
	display.innerText = result;
})

function getExpression(expression) {
	let func = new Function("return " + expression);
	return func();
}