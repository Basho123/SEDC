//script.js // exercise 1
/* 1. Create a javascript function which accept a number san input and isert dashes 
- between each two even numbers, for exammple 025468 is 0-254-6-8 */


let startingNumbers = 1234567890
console.log(`starting numbers`, startingNumbers);
let numbers = startingNumbers + ``;
console.log(`numbers in string`, numbers);

let outputNumbers = ``;

for(let i = 0; i<numbers.length; i++){
    if (numbers[i] % 2 ===0 && numbers[i-1] % 2 === 0){
        outputNumbers +=  '-'+numbers[i]                
    }
    else outputNumbers += numbers[i];  
 }

console.log(`outputNumbers`,outputNumbers);