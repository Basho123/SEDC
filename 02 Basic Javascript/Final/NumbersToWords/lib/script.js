//script.js // word
/*
Number to Words
Create a web page that can convert a number entered in an input in digits
to the same number in words. The result should be printed on the page.
 The converter should convert to at least a trillion. 
Ex:	Input: 0		Result: zero
Input: 13		Result: thirteen 	
Input: 345		Result: three hundred forty-five
	Input: 20056	Result: twenty thousand fifty-six
*/

// By Ivan Jamandilovski

let value = document.getElementById('value');
let post = document.getElementById('post');
let numberDigitPrint = document.getElementById('numberDigitPrint');
let numberWordPrint = document.getElementById('numberWordPrint');
let textContainer = document.getElementById('textContainer');

let inputNumber = 0;

//WE TAKE THE TEXT FROM THESE ARRAYS, AND USE EMPTY SPACES TO ACCOMODATE THE FOR LOOP
let arrayWithNumbers = [``, `one `, `two `, `three `, `four `, `five `, `six `, `seven `, `eight `, `nine `]
let arrWithTeens = [`ten `, `eleven `, `twelve `, `thirteen `, `fourteen `, `fifteen `, `sixteen `, `seventeen `, `eighteen `, `nineteen `,]
let arrWithDecades = [``, ``, `twenty `, `thirty `, `fourty `, `fifty `, `sixty `, `seveny `, `eighty `, `ninety `,]


//THE WORDS ARE IMBUED HERE
let stringAnvil = ``;
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////// FUNCTIONS OF NUMBERS ////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
function ones(i, g) {
	if (inputNumber[i] == g && inputNumber[i - 1] != 1) {
		stringAnvil += arrayWithNumbers[g];
	}
}

function tens(i, q) {
	//TEENS		
	if (inputNumber[i] == 1 && inputNumber[i + 1] == q) {
		stringAnvil += arrWithTeens[q];
	}
	//ADULTS
	else if (inputNumber[i] == q) {
		stringAnvil += arrWithDecades[q];
	}
}

function hundreds(i, t) {
	// ones(i, t);
	if (inputNumber[i] == g) {
		stringAnvil += arrayWithNumbers[g];
	}
	if (t == inputNumber[i] && inputNumber[i] > 0) {
		stringAnvil += `hundred `;
	}

}

function thousands(i, g) {
	let toContinue = true;
	let someCounter = 0;

	if (inputNumber[i - 1] != 1) {
		ones(i, g);
	}
	for (let k = 0; k < inputNumber.length; k++) {
		inputNumber.length === 7 + k ? someCounter += k
			: false
	}
	//VALIDATION WHEN THERE ARE ZEROS IN THE MIDDLE
	if (inputNumber.length === 7 + someCounter &&
		g == inputNumber[i] && inputNumber[1 + someCounter] == 0 &&
		g == inputNumber[i] && inputNumber[2 + someCounter] == 0 &&
		g == inputNumber[i] && inputNumber[3 + someCounter] == 0) {
		stringAnvil += ``;
		toContinue = false;		
	}

	if (g == inputNumber[i] && toContinue === true) {
		stringAnvil += `thousand `;
	}
}

function millions(i, g) {
	let toContinue = true;
	let someCounter = 0;

	if (inputNumber[i - 1] != 1) {
		ones(i, g);
	}
	for (let k = 0; k < inputNumber.length; k++) {
		inputNumber.length === 10 + k ? someCounter += k
			: false
	}
	//VALIDATION WHEN THERE ARE ZEROS IN THE MIDDLE
	if (inputNumber.length === 10 + someCounter &&
		g == inputNumber[i] && inputNumber[1 + someCounter] == 0 &&
		g == inputNumber[i] && inputNumber[2 + someCounter] == 0 &&
		g == inputNumber[i] && inputNumber[3 + someCounter] == 0) {
		stringAnvil += ``;
		toContinue = false;		
	}

	if (g == inputNumber[i] && toContinue === true) {
		stringAnvil += `million `;
	}
}
function trillions(i, g) {
	let toContinue = true;
	let someCounter = 0;

	if (inputNumber[i - 1] != 1) {
		ones(i, g);
	}
	for (let k = 0; k < inputNumber.length; k++) {
		inputNumber.length === 13 + k ? someCounter += k
			: false
	}
	//VALIDATION WHEN THERE ARE ZEROS IN THE MIDDLE
	if (inputNumber.length === 13 + someCounter &&
		g == inputNumber[i] && inputNumber[1 + someCounter] == 0 &&
		g == inputNumber[i] && inputNumber[2 + someCounter] == 0 &&
		g == inputNumber[i] && inputNumber[3 + someCounter] == 0) {
		stringAnvil += ``;
		toContinue = false;		
	}

	if (g == inputNumber[i] && toContinue === true) {
		stringAnvil += `trillion `;
	}
}

function billions(i, g) {
	let toContinue = true;
	let someCounter = 0;

	if (inputNumber[i - 1] != 1) {
		ones(i, g);
	}
	for (let k = 0; k < inputNumber.length; k++) {
		inputNumber.length === 16 + k ? someCounter += k
			: false
	}
	//VALIDATION WHEN THERE ARE ZEROS IN THE MIDDLE
	if (inputNumber.length === 16 + someCounter &&
		g == inputNumber[i] && inputNumber[1 + someCounter] == 0 &&
		g == inputNumber[i] && inputNumber[2 + someCounter] == 0 &&
		g == inputNumber[i] && inputNumber[3 + someCounter] == 0) {
		stringAnvil += ``;
		toContinue = false;		
	}

	if (g == inputNumber[i] && toContinue === true) {
		stringAnvil += `billion `;
	}
}

//FUNCTIONS ARE STORED IN ARRAYS TO BE USED IN FOR LOOPS
let arrWithFunctions = [trillions, millions, thousands, hundreds, tens, ones]
let arrWithFunctionsHigher = [trillions, hundreds, tens, millions]

/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////// BUTTON CLICK //////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


post.addEventListener('click', function () {
	inputNumber = value.value;
	textContainer.innerHTML = ``
	stringAnvil = ``;

	//ITERATE THE LENGTH OF THE NUMBER
	for (let i = 0; i < inputNumber.length; i++) {
		//1 DIGIT
		//ONES
		if (inputNumber.length === 1) {
			for (g = 0; g <= 9; g++) {
				ones(i, g);
			}
		}

		//2 DIGIT	
		//THIS TAKES 2 FUNCTIONS AND PUTS THEM IN 1 LOOP	
		if (inputNumber.length === 2) {
			for (let k = 0; k < 2; k++) {
				if (i == k) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 4](i, g);
					}
				}
			}
		}
		//3 DIGIT		
		//THIS TAKES 3 FUNCTIONS AND PUTS THEM IN 1 LOOP		
		if (inputNumber.length === 3) {
			for (let k = 0; k < 3; k++) {
				if (i == k) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
		}
		//4 DIGIT
		//THIS TAKES 4 FUNCTIONS AND PUTS THEM IN 1 LOOP	
		if (inputNumber.length === 4) {
			for (let k = 0; k < 4; k++) {
				if (i == k) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 2](i, g);
					}
				}
			}
		}
		//5 DIGIT
		//THIS TAKES 4 FUNCTIONS IN LOOP AND ADDS A FUNCTION BEFORE	
		if (inputNumber.length === 5) {
			if (i == 0) {
				for (g = 0; g <= 9; g++) {
					//TEN THOUSANDS
					tens(i, g);
				}
			}
			for (let k = 1; k < 5; k++) {
				if (i == k) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 1](i, g);
					}
				}
			}
		}
		//6 DIGIT
		// THERE ARE 2 LOOPS WITH LOOPING FUNCTIONS
		if (inputNumber.length === 6) {
			for (let k = 0; k < 2; k++) {
				if (i == k) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
		//7 DIGIT
		//MILLIONS
		if (inputNumber.length === 7) {
			if (i == 0) {
				for (g = 0; g <= 9; g++) {
					millions(i, g);
				}
			}
			for (let k = 0; k < 2; k++) {
				if (i == k + 1) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 1) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
		//8 DIGIT
		//THREE LOOPS WITH LOOPING FUNCTIONS
		if (inputNumber.length === 8) {
			for (let k = 2; k < 4; k++) {
				if (i == k - 2) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctionsHigher[k](i, g);
					}
				}
			}
			for (let k = 0; k < 2; k++) {
				if (i == k + 2) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 2) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
		//9 DIGIT
		if (inputNumber.length === 9) {
			for (let k = 1; k < 4; k++) {
				if (i == k - 1) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctionsHigher[k](i, g);
					}
				}
			}
			for (let k = 0; k < 2; k++) {
				if (i == k + 3) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 3) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
		//10 DIGIT
		//TRILLIONS
		if (inputNumber.length === 10) {
			for (let k = 0; k < 4; k++) {
				if (i == k) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctionsHigher[k](i, g);
					}
				}
			}
			for (let k = 0; k < 2; k++) {
				if (i == k + 4) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 4) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}

		}
		//11 DIGIT	
		if (inputNumber.length === 11) {
			if (i == 0) {
				for (g = 0; g <= 9; g++) {
					tens(i, g);
				}
			}
			for (let k = 0; k < 4; k++) {
				if (i == k + 1) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctionsHigher[k](i, g);
					}
				}
			}

			for (let k = 0; k < 2; k++) {
				if (i == k + 5) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 5) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
		//12 DIGIT
		if (inputNumber.length === 12) {
			if (i == 0) {
				for (g = 0; g <= 9; g++) {
					hundreds(i, g);
				}
			}
			if (i == 1) {
				for (g = 0; g <= 9; g++) {
					tens(i, g);
				}
			}
			for (let k = 0; k < 4; k++) {
				if (i == k + 2) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctionsHigher[k](i, g);
					}
				}
			}

			for (let k = 0; k < 2; k++) {
				if (i == k + 6) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 6) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
		//13 DIGIT
		//BILLIONS
		if (inputNumber.length === 13) {
			if (i == 0) {
				for (g = 0; g <= 9; g++) {
					billions(i, g);
				}
			}
			if (i == 1) {
				for (g = 0; g <= 9; g++) {
					hundreds(i, g);
				}
			}
			if (i == 2) {
				for (g = 0; g <= 9; g++) {
					tens(i, g);
				}
			}
			for (let k = 0; k < 4; k++) {
				if (i == k + 3) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctionsHigher[k](i, g);
					}
				}
			}
			for (let k = 0; k < 2; k++) {
				if (i == k + 7) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 7) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
		//14 DIGIT
		if (inputNumber.length === 14) {
			if (i == 0) {
				for (g = 0; g <= 9; g++) {
					tens(i, g);
				}
			}
			if (i == 1) {
				for (g = 0; g <= 9; g++) {
					billions(i, g);
				}
			}
			if (i == 2) {
				for (g = 0; g <= 9; g++) {
					hundreds(i, g);
				}
			}
			if (i == 3) {
				for (g = 0; g <= 9; g++) {
					tens(i, g);
				}
			}
			for (let k = 0; k < 4; k++) {
				if (i == k + 4) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctionsHigher[k](i, g);
					}
				}
			}
			for (let k = 0; k < 2; k++) {
				if (i == k + 8) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 8) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
		//15 DIGIT
		if (inputNumber.length === 15) {
			if (i == 0) {
				for (g = 0; g <= 9; g++) {
					hundreds(i, g);
				}
			}
			if (i == 1) {
				for (g = 0; g <= 9; g++) {
					tens(i, g);
				}
			}
			if (i == 2) {
				for (g = 0; g <= 9; g++) {
					billions(i, g);
				}
			}
			if (i == 3) {
				for (g = 0; g <= 9; g++) {
					hundreds(i, g);
				}
			}
			if (i == 4) {
				for (g = 0; g <= 9; g++) {
					tens(i, g);
				}
			}
			for (let k = 0; k < 4; k++) {
				if (i == k + 5) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctionsHigher[k](i, g);
					}
				}
			}
			for (let k = 0; k < 2; k++) {
				if (i == k + 9) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k + 3](i, g);
					}
				}
			}
			for (let k = 2; k < 6; k++) {
				if (i == k + 9) {
					for (g = 0; g <= 9; g++) {
						arrWithFunctions[k](i, g);
					}
				}
			}
		}
	}

	//TEXT PRINT, COULD'VE LIMIT WITH jQuery, BUT, FUCK IT :)
	if (inputNumber.length > 15) {
		textContainer.innerHTML = `<h2 id="numberWordPrint">Please enter smaller number, max 1000 quadrillion-1</h2>`
	}
	else
		textContainer.innerHTML =
			`<h2 id="numberWordPrint">${stringAnvil}</h2>`
})




