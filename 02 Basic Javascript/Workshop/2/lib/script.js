//script.js // exercise 2
/* 2. Create a javascript function that will find all numbers divisible by 7 and 3 in a array from 1 to 100; */

number1 = parseInt(prompt(`Please enter first number.`))
number2 = parseInt(prompt(`Please enter secondNumber number.`))
numbersToFind = [];

function divisibleByAnyTwoNumbersTogether(num1, num2) {
    for (let i = 1; i <= 100; i++) {
        if (
            Math.floor(i / num1) === i / num1 &&
            Math.floor(i / num2) === i / num2
        ) {
            numbersToFind.push(i)
        }
        else continue
    }
}

divisibleByAnyTwoNumbersTogether(number1, number2);
//IN CONSOLE LOG
console.log(numbersToFind);