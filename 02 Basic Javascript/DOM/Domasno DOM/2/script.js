//script.js

let list = document.getElementById('list-to-change');
let equation = document.getElementById('equation');

let arrayOfNumbers = [];

for (let i = 0; i < 10; i++) {
    arrayOfNumbers.push(Math.floor(Math.random() * 20))
}



let result = 0;

for (let i = 0; i < arrayOfNumbers.length; i++) {
    result += arrayOfNumbers[i];
    list.innerHTML += `<li>number ${i+1} is: ${arrayOfNumbers[i]}</li>`

    
    if (i === 0){
        equation.textContent += `The full equation of the sum of the numbers is:  `  
    }

    equation.textContent += arrayOfNumbers[i];


    if (i < arrayOfNumbers.length - 1) {
        equation.textContent += ` + `
    
    }else if (i === arrayOfNumbers.length - 1) {
        equation.textContent += ` = ${result}`
    }

}
