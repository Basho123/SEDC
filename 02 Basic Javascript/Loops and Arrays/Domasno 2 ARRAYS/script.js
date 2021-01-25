//script.js
alert("This excercise sums all the numbers in a given array");

numberPrompt = [
    parseFloat(prompt("Enter number 1")),
    parseFloat(prompt("Enter number 2")),
    parseFloat(prompt("Enter number 3")),
    parseFloat(prompt("Enter number 4")),
    parseFloat(prompt("Enter number 5")),
]

function validateNumber(numbersArray){
    for(let i = 0; i < numbersArray.length; i++)
    {
       if (isNaN(numbersArray[i])){
           console.log(`The number on the index position of ${i} is not valid, please enter valid number.`);
           break;
       } 
       
    }
}


function sumOfNumbers(number1, number2, number3, number4, number5) {
    let result = number1 + number2 + number3 + number4 + number5;
    let numbersArray = [number1, number2, number3, number4, number5]

    validateNumber(numbersArray);

    if (!isNaN(result)) {
        console.log(`The result is ${result}`);
    }

  
}


sumOfNumbers(numberPrompt[0], numberPrompt[1], numberPrompt[2], numberPrompt[3], numberPrompt[4],)