// Extra Homework/01/script.js

//----------- Task 01 --------------
// Write a JS function that will decide if a number entered by user is even or odd
// Example: isOddOrEven(3)
// Output 'Number 3 is odd number.'

let userInput = parseInt(prompt("Enter a number to be checked if it is even or odd."));

function evenOrOdd(number) {
    let result = number % 2;
    switch (result) {
        default:
            console.log("Please enter valid number");            
        case 0:
            console.log(`Number ${number} is even number`);
            break;
        case 1:
            console.log(`Number ${number} is odd number`);
            break;       
    }
}

evenOrOdd(userInput);