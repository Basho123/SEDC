//script.js
/* Using recursive function do the function that will calculate Fibonacci sequence for any number.
 fibonacciSequence(n) (where n is positve real number) and print the result. e.g:
  fibonacciSequence(8) -> should return array of following numbers 0, 1, 1, 2, 3, 5, 8, 13, 21
  */

let input = document.getElementById('input');
let button = document.getElementById('button');
let anvil = document.getElementsByTagName('p')[0];


let fibonacciArray = [];

let fibonacciSequence = (number) => {
  //debugger;
  if (number === 1) {
    fibonacciArray.push(number - 1, number);
    return 0
  }
  else {
    fibonacciSequence(number - 1);
    fibonacciArray.push(fibonacciArray[fibonacciArray.length - 1] + fibonacciArray[fibonacciArray.length - 2]); //0, 1, 1, 2, 3, 5, 8, 13, 21    
  }
  return fibonacciArray;
}

button.addEventListener(`click`, () => {
  anvil.innerHTML = ``
  anvil.innerHTML = `The fibonacci sequence for '${input.value}'  is '${fibonacciSequence(input.value)}'`
  input.value = ``;
  fibonacciArray = []
})


